import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { VisitanteService } from '../../../../core/service/visitante.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visitante',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './visitante.html',
  styleUrls: ['./visitante.scss'],
})
export class Visitante implements OnInit {
  // Injeta o serviço e o DomSanitizer
  constructor(private visitanteService: VisitanteService, private sanitizer: DomSanitizer) {}

  visitanteCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Visitante',
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
    { nome: 'email', label: 'Email', tipo: 'email', placeholder: 'email@exemplo.com' },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    
  ];

  listaVisitantes: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  ngOnInit(): void {
    this.carregarVisitantes();
  } // --- Lógica de Foto e Sanitização ---

  private converterBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  carregarVisitantes() {
    this.visitanteService.listar().subscribe({
      next: (data) => {
        // Sanitiza a URL da foto para exibição na lista
        this.listaVisitantes = data.map((visitante) => {
          if (visitante.fotoUrl) {
            (visitante as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(
              visitante.fotoUrl
            );
          }
          return visitante;
        });
      },
      error: () => alert('Erro ao carregar visitantes!'),
    });
  } // --- Lógica de Formulário e CRUD ---

  novoCadastro() {
    this.initialValue = null;
    this.modoEdicao = true;
  }

  abrirFormEdicao(item: any) {
    this.initialValue = item;
    this.modoEdicao = true;
  }

  async onSubmitVisitante(payload: any): Promise<void> {
    let fotoString = null;

    // Converte a foto se for um objeto File
    if (payload.foto && payload.foto instanceof File) {
      fotoString = await this.converterBase64(payload.foto);
    }
    // Mantém a foto se for uma string (caso de edição)
    else if (typeof payload.foto === 'string') {
      fotoString = payload.foto;
    }

    const cpfLimpo = payload.cpf ? payload.cpf.replace(/\D/g, '') : ''; // Construção explícita do payload (apenas campos necessários)

    const data: UserModel = {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      telefone: payload.telefone,
      cpf: cpfLimpo,
      senha: payload.senha || cpfLimpo,
      fotoUrl: fotoString,
      tipoUsuario: 'VISITANTE',
    };

    // Remove o campo 'foto' original do formulário antes de enviar
    delete (data as any).foto; // EDITAR

    if (this.initialValue && this.initialValue.id) {
      this.visitanteService.atualizar(this.initialValue.id, data).subscribe({
        next: () => {
          alert('Visitante atualizado com sucesso!');
          this.modoEdicao = false;
          this.initialValue = null;
          this.carregarVisitantes();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar visitante!');
        },
      });
      return;
    } // CRIAR

    this.visitanteService.criar(data).subscribe({
      next: () => {
        alert('Visitante criado com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarVisitantes();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar visitante!');
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) return;

    if (confirm(`Tem certeza que deseja excluir o visitante ${item.nome}?`)) {
      this.visitanteService.excluir(item.id).subscribe({
        next: () => {
          this.listaVisitantes = this.listaVisitantes.filter((i) => i.id !== item.id);
          alert('Visitante excluído com sucesso!');
        },
        error: () => alert('Erro ao excluir visitante!'),
      });
    }
  }
}
