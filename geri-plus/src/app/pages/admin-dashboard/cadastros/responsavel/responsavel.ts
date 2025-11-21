import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { ResponsavelService } from '../../../../core/service/resposavel.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-responsavel',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './responsavel.html',
  styleUrls: ['./responsavel.scss'],
})
export class Responsavel implements OnInit {
  constructor(private responsavelService: ResponsavelService, private sanitizer: DomSanitizer) {}

  responsavelCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Responsável',
      tipo: 'text',
      placeholder: 'Digite o nome completo',
      validacao: [Validators.required],
    },
    {
      nome: 'cpf',
      label: 'CPF',
      tipo: 'text',
      placeholder: '000.000.000-00',
      validacao: [Validators.required],
    },
    {
      nome: 'email',
      label: 'Email',
      tipo: 'email',
      placeholder: 'email@exemplo.com',
      validacao: [Validators.required, Validators.email],
    },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    { nome: 'senha', label: 'Senha', tipo: 'password', placeholder: 'Crie uma senha segura' },
    {
      nome: 'Status',
      label: 'Status',
      tipo: 'select',
      opcoes: [
        { value: 'ATIVO', label: 'Ativo' },
        { value: 'INATIVO', label: 'Inativo' },
      ],
    },
  ];

  listaResponsaveis: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  // Ao iniciar, busca do backend
  ngOnInit(): void {
    this.carregarResponsaveis();
  }

  carregarResponsaveis() {
    this.responsavelService.listar().subscribe({
      next: (data) => {
        this.listaResponsaveis = data.map((responsavel) => {
          if (responsavel.fotoUrl) {
            (responsavel as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(
              responsavel.fotoUrl
            );
          }
          return responsavel;
        });
      },
      error: () => alert('Erro ao carregar responsáveis!'),
    });
  }
  private converterBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  novoCadastro() {
    this.initialValue = null;
    this.modoEdicao = true;
  }

  abrirFormEdicao(item: any) {
    this.initialValue = item;
    this.modoEdicao = true;
  }

  async onSubmitResponsavel(payload: any): Promise<void> {
    let fotoString = null;

    // Converte a foto se for um objeto File
    if (payload.foto && payload.foto instanceof File) {
      fotoString = await this.converterBase64(payload.foto);
    }
    // Mantém a foto se for uma string (caso de edição)
    else if (typeof payload.foto === 'string') {
      fotoString = payload.foto;
    }

    const cpfLimpo = payload.cpf ? payload.cpf.replace(/\D/g, '') : '';
    const status = payload.statusResidencia ? payload.statusResidencia : null;

    const data: UserModel = {
      ...payload,
      cpf: cpfLimpo,
      fotoUrl: fotoString, // Envia a string Base64
      statusResidencia: status,
      tipoUsuario: 'RESPONSAVEL',
    }; // Remove o campo 'foto' original, pois o backend espera 'fotoUrl'

    delete (data as any).foto; // EDITAR

    if (this.initialValue && this.initialValue.id) {
      this.responsavelService.atualizar(this.initialValue.id, data).subscribe({
        next: (resp) => {
          const index = this.listaResponsaveis.findIndex((i) => i.id === resp.id);
          if (index !== -1) this.listaResponsaveis[index] = resp;
          alert('Responsável atualizado com sucesso!');
          this.modoEdicao = false;
          this.initialValue = null;
          this.carregarResponsaveis(); // Recarrega para atualizar a lista
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar responsável!');
        },
      });
      return;
    } // CRIAR

    this.responsavelService.criar(data).subscribe({
      next: (resp) => {
        this.listaResponsaveis.push(resp);
        alert('Responsável criado com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarResponsaveis(); // Recarrega para sanitizar e mostrar a foto
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar responsável!');
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) return;

    if (confirm(`Tem certeza que deseja excluir ${item.nome}?`)) {
      this.responsavelService.excluir(item.id).subscribe({
        next: () => {
          this.listaResponsaveis = this.listaResponsaveis.filter((i) => i.id !== item.id);
          alert('Responsável excluído com sucesso!');
        },
        error: () => alert('Erro ao excluir responsável!'),
      });
    }
  }
}
