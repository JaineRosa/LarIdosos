import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { UserModel } from '../../../../core/models/user.model';
import { IdosoService } from '../../../../core/service/idoso.service';
import { UserRepository } from '../../../../core/repository/user.repository';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-idoso',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './idoso.html',
  styleUrls: ['./idoso.scss'],
})
export class Idoso implements OnInit {
  constructor(
    private idosoService: IdosoService,
    private userRepo: UserRepository,
    private sanitizer: DomSanitizer
  ) {}

  // Configuração inicial dos campos
  idosoCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Idoso',
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
      nome: 'dataNascimento',
      label: 'Data de Nascimento',
      tipo: 'date',
      validacao: [Validators.required],
    },
    {
      nome: 'responsavelId',
      label: 'Responsável',
      tipo: 'select',
      placeholder: 'Selecione o responsável',
      opcoes: [],
      validacao: [Validators.required],
    },

    {
      nome: 'quarto',
      label: 'Quarto',
      tipo: 'text',
      placeholder: 'Número ou identificação do quarto',
    },
    {
      nome: 'statusResidencia',
      label: 'Status',
      tipo: 'select',
      opcoes: [
        { value: 'ATIVO', label: 'Ativo' },
        { value: 'INATIVO', label: 'Inativo' },
        { value: 'INTERNADO', label: 'Internado' },
        { value: 'FALECIDO', label: 'Falecido' },
      ],
    },
    {
      nome: 'medicamentos',
      label: 'Medicamentos',
      tipo: 'array',
      arrayItemPlaceholder: 'Nome do medicamento',
    },
    {
      nome: 'recomendacoesMedicas',
      label: 'Recomendações Médicas',
      tipo: 'array',
      arrayItemPlaceholder: 'Digite uma recomendação',
    },
  ];

  listaIdosos: UserModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  ngOnInit(): void {
    this.carregarDados();
  }

  private converterBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  carregarDados() {
    this.idosoService.listar().subscribe({
      next: (data) => {
        this.listaIdosos = data.map((idoso) => {
          if (idoso.fotoUrl) {
            (idoso as any).fotoUrlSegura = this.sanitizer.bypassSecurityTrustUrl(idoso.fotoUrl);
          }
          return idoso;
        });
      },
      error: () => alert('Erro ao carregar idosos!'),
    });
    this.userRepo.getByType('RESPONSAVEL').subscribe({
      next: (responsaveis) => {
        const opcoesResponsaveis = responsaveis.map((user) => ({
          value: user.id,
          label: `${user.nome} (CPF: ${user.cpf})`,
        }));
        const campoResponsavel = this.idosoCampos.find((c) => c.nome === 'responsavelId');
        if (campoResponsavel) {
          campoResponsavel.opcoes = opcoesResponsaveis;
        }
      },
      error: () => console.error('Erro ao carregar lista de responsáveis'),
    });
  }

  abrirFormEdicao(item: any) {
    this.initialValue = item;
    this.modoEdicao = true;
  }

  novoCadastro() {
    this.initialValue = null;
    this.modoEdicao = true;
  }

  async onSubmitIdoso(payload: any): Promise<void> {
    const cpfLimpo = payload.cpf ? payload.cpf.replace(/\D/g, '') : '';

    let fotoString = null;

    const dataNasc = payload.dataNascimento ? payload.dataNascimento : null;
    const status = payload.statusResidencia ? payload.statusResidencia : null;

    let responsavelObjeto = null;
    if (payload.foto && payload.foto instanceof File) {
      fotoString = await this.converterBase64(payload.foto);
    } else if (typeof payload.foto === 'string') {
      fotoString = payload.foto;
    }
    if (payload.responsavelId) {
      responsavelObjeto = { id: payload.responsavelId };
    }

    const emailFinal =
      payload.email && payload.email.trim() !== ''
        ? payload.email.trim()
        : `idoso-${Date.now()}@temp.com`;

    const data: any = {
      nome: payload.nome,
      cpf: cpfLimpo,
      email: emailFinal,
      telefone: payload.telefone || null, // Envia null se estiver vazio/undefined
      quarto: payload.quarto,
      senha: cpfLimpo,
      dataNascimento: dataNasc,
      statusResidencia: status,
      fotoUrl: fotoString,

      // IMPORTANTE: Envia o ID direto como String, igual ao Java espera
      responsavelId: payload.responsavelId,

      medicamentos: payload.medicamentos || [],
      recomendacoesMedicas: payload.recomendacoesMedicas || [],

      tipoUsuario: 'IDOSO',
    };

    console.log('Payload enviado ao Java:', data); // <--- Olhe no console o que está indo!

    // --- ENVIO (Igual ao anterior) ---
    if (this.initialValue && this.initialValue.id) {
      this.idosoService.atualizar(this.initialValue.id, data).subscribe({
        next: () => {
          alert('Atualizado com sucesso!');
          this.modoEdicao = false;
          this.carregarDados();
        },
        error: (err) => this.tratarErro(err),
      });
    } else {
      this.idosoService.criar(data).subscribe({
        next: (resp) => {
          alert('Idoso criado com sucesso!');
          this.listaIdosos.push(resp);
          this.modoEdicao = false;
          this.initialValue = null;
        },
        error: (err) => this.tratarErro(err),
      });
    }
    this.carregarDados();
  }

  // Função auxiliar para te ajudar a ver o erro real
  tratarErro(err: any) {
    console.error('Erro detalhado:', err);
    // Tenta pegar a mensagem que o backend mandou
    if (err.error) {
      alert(`Erro do Servidor: ${JSON.stringify(err.error)}`);
    } else {
      alert('Erro ao salvar. Verifique o console (F12).');
    }
  }

  onExcluir(item: any) {
    if (!item.id) return;

    if (confirm(`Tem certeza que deseja excluir o idoso ${item.nome}?`)) {
      this.idosoService.excluir(item.id).subscribe({
        next: () => {
          this.listaIdosos = this.listaIdosos.filter((i) => i.id !== item.id);
          alert('Idoso excluído com sucesso!');
        },
        error: () => alert('Erro ao excluir idoso!'),
      });
    }
  }
}
