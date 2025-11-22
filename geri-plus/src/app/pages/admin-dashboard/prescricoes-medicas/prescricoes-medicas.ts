import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabelaPrescricoes } from '../../../shared/components/tabela-prescricoes/tabela-prescricoes';

@Component({
  selector: 'app-prescricoes-medicas',
  standalone: true,
  imports: [CommonModule, TabelaPrescricoes],
  templateUrl: './prescricoes-medicas.html',
  styleUrls: ['./prescricoes-medicas.scss'],
})
export class PrescricoesMedicas {
  // 🔹 Mock de prescrições (pode ser a mesma listaMedicamentos que você já tem)
  listaPrescricoes = [
    {
      nome: 'Losartana',
      dosagem: '100mg',
      frequenciaDiaria: '2 vezes ao dia',
      duracaoTratamento: '30 dias',
      viaAdministracao: 'ORAL',
      dataPrescricao: '2025-11-20',
      medicoId: 'MED-001',
      idosoId: 'ID-001',
      observacoes: 'Tomar após refeição'
    },
    {
      nome: 'Paracetamol',
      dosagem: '500mg',
      frequenciaDiaria: '3 vezes ao dia',
      duracaoTratamento: '7 dias',
      viaAdministracao: 'ORAL',
      dataPrescricao: '2025-11-19',
      medicoId: 'MED-002',
      idosoId: 'ID-001',
      observacoes: 'Se houver dor ou febre'
    }
  ];

}
