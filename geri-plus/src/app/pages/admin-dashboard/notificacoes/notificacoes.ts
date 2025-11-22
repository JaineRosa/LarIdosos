import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';

@Component({
  selector: 'app-notificacoes',
  imports: [CommonModule, CardGenerico],
  templateUrl: './notificacoes.html',
  styleUrls: ['./notificacoes.scss'],
})
export class Notificacoes {
  notificacoes = [
    {
      titulo: 'Nova consulta marcada',
      descricao: 'Consulta com Dr. Silva em 25/11 às 14h',
      icone: 'user-doctor',
      tipo: 'info',
    },
    {
      titulo: 'Vacina aplicada',
      descricao: 'Idoso recebeu dose de reforço contra influenza',
      icone: 'syringe',
      tipo: 'success',
    },
    {
      titulo: 'Alerta de medicamento',
      descricao: 'Paracetamol em falta no estoque',
      icone: 'warning',
      tipo: 'warning',
    },
  ];
}
