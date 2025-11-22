import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-prescricoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-prescricoes.html',
  styleUrls: ['./tabela-prescricoes.scss'],
})
export class TabelaPrescricoes {
   // 🔹 Recebe lista de prescrições (reaproveitando listaMedicamentos)
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
  @Input() prescricoes: any[] = [];
}
