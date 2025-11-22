import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';

@Component({
  selector: 'app-registro-diario',
  imports: [CommonModule, CardGenerico],
  templateUrl: './registro-diario.html',
  styleUrl: './registro-diario.scss',
})
export class RegistroDiario {
  registros = [
    {
      titulo: 'Registro de 20/11',
      descricao: 'Paciente participou da atividade de fisioterapia',
      icone: 'calendar-day',
      tipo: 'warning',
    },
    {
      titulo: 'Registro de 19/11',
      descricao: 'Paciente realizou caminhada leve no jardim',
      icone: 'calendar-day',
      tipo: 'success',
    },
    {
      titulo: 'Registro de 18/11',
      descricao: 'Paciente apresentou febre leve, monitorado pela equipe',
      icone: 'calendar-day',
      tipo: 'error',
    },
  ];
}
