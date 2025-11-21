import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { MedicoService } from '../../../../core/service/medico.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './medico.html',
  styleUrls: ['./medico.scss'],
})
export class Medico implements OnInit {
  constructor(
    private medicoService: MedicoService,
    private sanitizer: DomSanitizer
  ) {}

  medicoCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Médico',
      tipo: 'text',
      placeholder: 'Digite o nome completo',
      validacao: [Validators.required],
    },
    {
      nome: 'crm',
      label: 'CRM',
      tipo: 'text',
      placeholder: 'Digite o CRM',
      validacao: [Validators.required],
    },
    {
      nome: 'especialidadeMedica',
      label: 'Especialidade',
      tipo: 'text',
      placeholder: 'Ex: Cardiologista',
      validacao: [Validators.required],
    },
    {
      nome: 'email',
      label: 'Email',
      tipo: 'email',
      placeholder: 'email@exemplo.com',
      validacao: [Validators.required, Validators.email],
    },
    {
      nome: 'telefone',
      label: 'Telefone',
      tipo: 'text',
      placeholder: '(00) 00000-0000',
    },
    {
      nome: 'senha',
      label: 'Senha',
      tipo: 'password',
      placeholder: 'Crie uma senha segura',
    },
  ];

  listaMedicos: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  ngOnInit(): void {
    this.carregarMedicos();
  }

  carregarMedicos() {
    this.medicoService.listar().subscribe({
      next: (data) => {
        this.listaMedicos = data.map((medico) => {
          if (medico.fotoUrl) {
            (medico as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(
              medico.fotoUrl
            );
          }
          return medico;
        });
      },
      error: () => alert('Erro ao carregar médicos!'),
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

  async onSubmitMedico(payload: any): Promise<void> {
    let fotoString = null;

    // Converte foto → Base64
    if (payload.foto && payload.foto instanceof File) {
      fotoString = await this.converterBase64(payload.foto);
    }
    // Mantém foto atual
    else if (typeof payload.foto === 'string') {
      fotoString = payload.foto;
    }

    const data: UserModel = {
      ...payload,
      fotoUrl: fotoString,
      tipoUsuario: 'MEDICO',
    };

    delete (data as any).foto; // Remove campo original

    // Editar
    if (this.initialValue && this.initialValue.id) {
      this.medicoService.atualizar(this.initialValue.id, data).subscribe({
        next: (resp) => {
          const index = this.listaMedicos.findIndex((i) => i.id === resp.id);
          if (index !== -1) this.listaMedicos[index] = resp;
          alert('Médico atualizado com sucesso!');
          this.modoEdicao = false;
          this.initialValue = null;
          this.carregarMedicos();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar médico!');
        },
      });
      return;
    }

    // Criar
    this.medicoService.criar(data).subscribe({
      next: (resp) => {
        this.listaMedicos.push(resp);
        alert('Médico criado com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarMedicos();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar médico!');
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) return;

    if (confirm(`Tem certeza que deseja excluir ${item.nome}?`)) {
      this.medicoService.excluir(item.id).subscribe({
        next: () => {
          this.listaMedicos = this.listaMedicos.filter((i) => i.id !== item.id);
          alert('Médico excluído com sucesso!');
        },
        error: () => alert('Erro ao excluir médico!'),
      });
    }
  }
}