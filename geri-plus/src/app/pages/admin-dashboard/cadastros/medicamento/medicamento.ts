import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './medicamento.html',
  styleUrls: ['./medicamento.scss'],
})
export class Medicamento {
  medicamentoCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Medicamento',
      tipo: 'text',
      placeholder: 'Digite o nome do medicamento',
      validacao: [Validators.required],
    },
    {
      nome: 'dosagem',
      label: 'Dosagem',
      tipo: 'text',
      placeholder: 'Ex: 500mg',
      validacao: [Validators.required],
    },
    {
      nome: 'frequenciaDiaria',
      label: 'Frequência Diária',
      tipo: 'text',
      placeholder: 'Ex: 2 vezes ao dia',
      validacao: [Validators.required],
    },
    {
      nome: 'duracaoTratamento',
      label: 'Duração do Tratamento',
      tipo: 'text',
      placeholder: 'Ex: 10 dias',
    },
    {
      nome: 'viaAdministracao',
      label: 'Via de Administração',
      tipo: 'select',
      opcoes: [
        { value: 'ORAL', label: 'Oral' },
        { value: 'INJETAVEL', label: 'Injetável' },
        { value: 'TOPICA', label: 'Tópica' },
        { value: 'OUTRA', label: 'Outra' },
      ],
    },
    {
      nome: 'observacoes',
      label: 'Observações',
      tipo: 'textarea',
      placeholder: 'Observações adicionais',
    },
    {
      nome: 'dataPrescricao',
      label: 'Data da Prescrição',
      tipo: 'date',
      validacao: [Validators.required],
    },
    {
      nome: 'medicoId',
      label: 'ID do Médico',
      tipo: 'text',
      placeholder: 'Identificador do médico',
      validacao: [Validators.required],
    },
    {
      nome: 'idosoId',
      label: 'ID do Idoso',
      tipo: 'text',
      placeholder: 'Identificador do idoso',
      validacao: [Validators.required],
    },
    {
      nome: 'agendamentosId',
      label: 'Agendamentos',
      tipo: 'array',
      arrayItemPlaceholder: 'ID do agendamento',
    },
  ];

  // 🔹 Lista de medicamentos cadastrados
  listaMedicamentos: any[] = [
    {
      nome: 'Paracetamol',
      dosagem: '500mg',
      frequenciaDiaria: '2 vezes ao dia',
      duracaoTratamento: '7 dias',
      viaAdministracao: 'ORAL',
      dataPrescricao: '2025-11-20',
      medicoId: 'MED-001',
      idosoId: 'ID-001',
      observacoes: 'Tomar após as refeições',
    },
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

  // Salvar medicamento
  onSubmitMedicamento(payload: any): void {
    const data = { ...payload };

    if (this.initialValue) {
      const index = this.listaMedicamentos.findIndex((m) => m.nome === this.initialValue.nome);
      if (index !== -1) {
        this.listaMedicamentos[index] = data;
      }
    } else {
      this.listaMedicamentos.push(data);
    }

    console.log('Lista atualizada:', this.listaMedicamentos);

    this.modoEdicao = false;
    this.initialValue = null;
  }

  // Excluir medicamento
  onExcluir(item: any) {
    if (confirm(`Tem certeza que deseja excluir o medicamento ${item.nome}?`)) {
      this.listaMedicamentos = this.listaMedicamentos.filter((m) => m.nome !== item.nome);
      alert('Medicamento excluído com sucesso!');
    }
  }
}
