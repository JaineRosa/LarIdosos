import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
// 1. Importar o Model (Assumindo que você o criou em /core/models)
import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { MedicamentoService } from '../../../../core/service/medicamento.service';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './medicamento.html',
  styleUrls: ['./medicamento.scss'],
})
export class Medicamento implements OnInit {
  // Lista tipada (não mais apenas por IDoso)
  listaMedicamentos: MedicamentoModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  // 2. CAMPOS: Apenas dados mestres, sem dados de prescrição (idosoId, medicoId, dataPrescricao)
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
      nome: 'viaAdministracao',
      label: 'Via de Administração',
      tipo: 'select',
      opcoes: [
        { value: 'ORAL', label: 'Oral' },
        { value: 'INJETAVEL', label: 'Injetável' },
        { value: 'TOPICA', label: 'Tópica' },
        { value: 'INALATORIA', label: 'Inalatória' },
        { value: 'RETAL', label: 'Retal' },
        { value: 'VAGINAL', label: 'Vaginal' },
        { value: 'OUTRA', label: 'Outra' },
      ],
      validacao: [Validators.required],
    },
    {
      nome: 'observacoes',
      label: 'Observações (Gerais)',
      tipo: 'textarea',
      placeholder: 'Informações importantes sobre o uso ou armazenamento',
    },
  ];

  // 3. CARREGAMENTO: Método atualizado para listar TODOS os medicamentos
  carregarMedicamentos() {
    // 💡 Assumindo que você criou o método listarTodos no seu MedicamentoService
    this.medicamentoService.listarTodos().subscribe({
      next: (data) => {
        this.listaMedicamentos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar medicamentos:', err);
      },
    });
  }

  // **********************************
  // MÉTODOS CRUD E ESTADO
  // **********************************

  novoCadastro() {
    this.initialValue = null; // Zera o formulário para novo cadastro
    this.modoEdicao = true;
  }

  abrirFormEdicao(item: any) {
    // Não precisamos formatar a data, pois o campo 'dataPrescricao' foi removido
    this.initialValue = item;
    this.modoEdicao = true;
  }

  onSubmitMedicamento(payload: any): void {
    // O payload agora só contém dados mestres (nome, dosagem, via, observacoes)
    const medicamentoData: MedicamentoModel = { ...payload };

    // Remove campos irrelevantes para o cadastro mestre que podem estar no Model
    medicamentoData.agendamentosId = undefined;
    medicamentoData.dataPrescricao = undefined;
    medicamentoData.medicoId = undefined;
    medicamentoData.idosoId = undefined;
    medicamentoData.frequenciaDiaria = undefined;
    medicamentoData.duracaoTratamento = undefined;

    let operacao: Observable<MedicamentoModel>;

    if (this.initialValue && this.initialValue.id) {
      // ATUALIZAÇÃO (PUT)
      operacao = this.medicamentoService.atualizar(this.initialValue.id, medicamentoData);
    } else {
      // CRIAÇÃO (POST)
      operacao = this.medicamentoService.criar(medicamentoData);
    }

    operacao.subscribe({
      next: () => {
        alert('Medicamento salvo com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarMedicamentos(); // Recarrega a lista
      },
      error: (err) => {
        console.error('Erro ao salvar medicamento:', err.error || err);
        alert(`Erro ao salvar medicamento: ${err.error?.message || 'Verifique o console.'}`);
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) {
      alert('Medicamento sem ID para exclusão.');
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o medicamento ${item.nome}?`)) {
      this.medicamentoService.excluir(item.id).subscribe({
        next: () => {
          alert('Medicamento excluído com sucesso!');
          this.carregarMedicamentos();
        },
        error: (err) => {
          console.error('Erro ao excluir medicamento:', err);
          alert(`Erro ao excluir medicamento: ${err.error?.message || 'Verifique o console.'}`);
        },
      });
    }
  }
}
