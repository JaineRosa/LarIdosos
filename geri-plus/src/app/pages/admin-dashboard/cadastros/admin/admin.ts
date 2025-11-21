import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class Admin {
  adminCampos: CampoConfig[] = [
    { nome: 'nome', label: 'Nome do Administrador', tipo: 'text', placeholder: 'Digite o nome completo', validacao: [Validators.required] },
    { nome: 'email', label: 'Email', tipo: 'email', placeholder: 'email@exemplo.com', validacao: [Validators.required, Validators.email] },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    { nome: 'senha', label: 'Senha', tipo: 'password', placeholder: 'Crie uma senha segura', validacao: [Validators.required] },
  ];

  // 🔹 Lista de administradores cadastrados
  listaAdmins: any[] = [
    {
      nome: 'Ruthe Admin',
      email: 'ruthe.admin@email.com',
      telefone: '(47) 99999-0000',
      foto: 'assets/images/admin-avatar.png'
    }
  ];

  initialValue: any = null;
  modoEdicao = false;

  // Abrir form para novo cadastro
  novoCadastro() {
    this.initialValue = null;
    this.modoEdicao = true;
  }

  // Abrir form para edição
  abrirFormEdicao(item: any) {
    this.initialValue = item;
    this.modoEdicao = true;
  }

  // Salvar administrador
  onSubmitAdmin(payload: any): void {
    const data: UserModel = { ...payload, tipoUsuario: 'ADMIN' };

    if (this.initialValue) {
      const index = this.listaAdmins.findIndex(a => a.email === this.initialValue.email);
      if (index !== -1) {
        this.listaAdmins[index] = data;
      }
    } else {
      this.listaAdmins.push(data);
    }

    console.log('Lista atualizada:', this.listaAdmins);

    this.modoEdicao = false;
    this.initialValue = null;
  }

  // Excluir administrador
  onExcluir(item: any) {
    if (confirm(`Tem certeza que deseja excluir o administrador ${item.nome}?`)) {
      this.listaAdmins = this.listaAdmins.filter(a => a.email !== item.email);
      alert('Administrador excluído com sucesso!');

      // 🔹 BACK-END: quando tiver API, substitua por algo assim:
      // this.adminService.excluir(item.id).subscribe(() => {
      //   this.listaAdmins = this.listaAdmins.filter(a => a.id !== item.id);
      // });
    }
  }
}
