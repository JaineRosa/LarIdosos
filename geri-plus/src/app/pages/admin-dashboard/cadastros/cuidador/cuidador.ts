import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { CuidadorService } from '../../../../core/service/cuidador.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IdosoService } from '../../../../core/service/idoso.service';
import { forkJoin, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-cuidador',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './cuidador.html',
  styleUrls: ['./cuidador.scss'],
})
export class Cuidador implements OnInit {
  constructor(
    private cuidadorService: CuidadorService,
    private sanitizer: DomSanitizer,
    private idosoService: IdosoService
  ) {}
  idososOpcoes: { value: string; label: string }[] = [];
  listaCuidadores: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  get cuidadorCampos(): CampoConfig[] {
    return [
      {
        nome: 'nome',
        label: 'Nome do Cuidador',
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
      {
        nome: 'senha',
        label: 'Senha',
        tipo: 'password',
        placeholder: this.modoEdicao
          ? 'Deixe vazio para manter a senha atual'
          : 'Crie uma senha segura',
        validacao: this.modoEdicao ? [] : [Validators.required],
      },
      {
        nome: 'statusResidencia',
        label: 'Status',
        tipo: 'select',
        opcoes: [
          { value: 'ATIVO', label: 'Ativo' },
          { value: 'INATIVO', label: 'Inativo' },
        ],
      },
      {
        nome: 'idososId',
        label: 'Idosos Vinculados',
        tipo: 'multi-select',
        opcoes: this.idososOpcoes,
      },
    ];
  }
  ngOnInit(): void {
    this.carregarIdosos().subscribe({
      next: () => this.carregarCuidadores(),
      error: (err) => console.error('Erro ao carregar lista de idosos!', err),
    });
  }

  private carregarIdosos(): Observable<UserModel[]> {
    return this.idosoService.listar().pipe(
      tap((data: UserModel[]) => {
        this.idososOpcoes = data.map((idoso) => ({
          value: idoso.id!,
          label: idoso.nome,
        }));
      })
    );
  }

  private converterBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  carregarCuidadores() {
    this.cuidadorService.listar().subscribe({
      next: (data) => {
        this.listaCuidadores = data.map((cuidador) => {
          if (cuidador.fotoUrl) {
            (cuidador as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(
              cuidador.fotoUrl
            );
            (cuidador as any).idososVinculadosNomes = this.mapIdsToNames(cuidador.idososId);
          }
          return cuidador;
        });
      },
      error: () => console.error('Erro ao carregar cuidadores!'),
    });
  }

  private mapIdsToNames(ids: string[] | undefined): string {
        if (!ids || ids.length === 0) {
            return 'Nenhum idoso vinculado';
        }
        const nomes = ids.map((id) => {
            // Busca o nome do Idoso na lista de opções carregada (this.idososOpcoes)
            const opcao = this.idososOpcoes.find((o) => o.value === id);
            return opcao ? opcao.label : `ID ${id} (Não Encontrado)`;
        });

        return nomes.join(', ');
    }


  novoCadastro() {
    this.initialValue = null;
    this.modoEdicao = true;
  }

  abrirFormEdicao(item: any) {
    this.initialValue = item;
    this.modoEdicao = true;
  }

  async onSubmitCuidador(payload: any): Promise<void> {
    let fotoString = null;

    if (payload.foto && payload.foto instanceof File) {
      fotoString = await this.converterBase64(payload.foto);
    } else if (typeof payload.foto === 'string') {
      fotoString = payload.foto;
    }

    const cpfLimpo = payload.cpf ? payload.cpf.replace(/\D/g, '') : '';
    const status = payload.statusResidencia ? payload.statusResidencia : null;

    // O payload.idososId virá como um array de IDs do multi-select
    const idososIdArray = Array.isArray(payload.idososId) ? payload.idososId : [];

    const data: UserModel = {
      id: payload.id,
      nome: payload.nome,
      email: payload.email,
      telefone: payload.telefone,
      cpf: cpfLimpo,
      senha: payload.senha || cpfLimpo,
      responsavelId: payload.responsavelId || null,
      idososId: idososIdArray,
      fotoUrl: fotoString,
      statusResidencia: status,
      tipoUsuario: 'CUIDADOR',
    };

    delete (data as any).foto;

    if (this.initialValue && this.initialValue.id) {
      this.cuidadorService.atualizar(this.initialValue.id, data).subscribe({
        next: () => {
          console.log('Cuidador atualizado com sucesso!');
          this.modoEdicao = false;
          this.initialValue = null;
          this.carregarCuidadores();
        },
        error: (err) => {
          console.error('Erro ao atualizar cuidador!', err);
        },
      });
      return;
    }

    this.cuidadorService.criar(data).subscribe({
      next: () => {
        console.log('Cuidador criado com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarCuidadores();
      },
      error: (err) => {
        console.error('Erro ao criar cuidador!', err);
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) return;

    const confirmacao = true;

    if (confirmacao) {
      this.cuidadorService.excluir(item.id).subscribe({
        next: () => {
          this.listaCuidadores = this.listaCuidadores.filter((i) => i.id !== item.id);
          console.log('Cuidador excluído com sucesso!');
        },
        error: () => console.error('Erro ao excluir cuidador!'),
      });
    }
  }
}