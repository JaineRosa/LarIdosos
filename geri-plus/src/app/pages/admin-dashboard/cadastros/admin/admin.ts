import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/service/admin.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class Admin implements OnInit {
  listaAdmins: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.carregarAdmins();
  }

  adminCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Administrador',
      tipo: 'text',
      placeholder: 'Digite o nome completo',
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
    {
      nome: 'senha',
      label: 'Senha',
      tipo: 'password',
      placeholder: 'Crie uma senha segura',
      validacao: [Validators.required],
    },
  ];
  private converterBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

  carregarAdmins() {
        this.adminService.listarTodos().subscribe({
            next: (data) => {
                this.listaAdmins = data.map((admin) => {
                    if (admin.fotoUrl) {
                        (admin as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(
                            admin.fotoUrl
                        );
                    }
                    return admin;
                });
            },
            error: (err) => {
                console.error('Erro ao carregar administradores:', err);
            }
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

  async onSubmitAdmin(payload: any): Promise<void> { 
        let fotoString = null;


        if (payload.foto && payload.foto instanceof File) {
            fotoString = await this.converterBase64(payload.foto);
        } 
        else if (typeof payload.foto === 'string') {
            fotoString = payload.foto;
        }

        const cpfLimpo = payload.cpf ? payload.cpf.replace(/\D/g, '') : ''; 

        const data: UserModel = {
            id: payload.id,
            nome: payload.nome,
            email: payload.email,
            telefone: payload.telefone,
            cpf: cpfLimpo,
            senha: payload.senha || payload.senha === '' ? payload.senha : payload.cpf, 
            fotoUrl: fotoString,
            tipoUsuario: 'ADMIN',
        };

        delete (data as any).foto;

        let operacao: Observable<UserModel>;

        if (this.initialValue && this.initialValue.id) {
            operacao = this.adminService.atualizar(this.initialValue.id, data);
        } else {
            operacao = this.adminService.criar(data);
        }

        operacao.subscribe({
            next: () => {
                alert('Administrador salvo com sucesso!');
                this.modoEdicao = false;
                this.initialValue = null;
                this.carregarAdmins(); 
            },
            error: (err) => {
                console.error('Erro ao salvar administrador:', err.error || err);
                alert(`Erro ao salvar administrador: ${err.error?.message || 'Verifique o console.'}`);
            },
        });
    }
  onExcluir(item: any) {
    if (!item.id) {
      alert('Administrador sem ID para exclusão.');
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o administrador ${item.nome}?`)) {
      this.adminService.excluir(item.id).subscribe({
        next: () => {
          alert('Administrador excluído com sucesso!');
          this.carregarAdmins();
        },
        error: (err) => {
          console.error('Erro ao excluir administrador:', err);
          alert(`Erro ao excluir administrador: ${err.error?.message || 'Verifique o console.'}`);
        },
      });
    }
  }
}
