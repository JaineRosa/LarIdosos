import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './notificacoes.html',
  styleUrls: ['./notificacoes.scss'],
})
export class Notificacoes {
  @Input() cpfHospede!: string;

  notificacoes = [
    {
      titulo: 'Nova consulta marcada',
      descricao: 'Consulta com Dr. Silva em 25/11 às 14h',
      icone: 'user-doctor',
      tipo: 'info',
      idosoId: '909.443.059-20',
    },
    {
      titulo: 'Vacina aplicada',
      descricao: 'Idoso recebeu dose de reforço contra influenza',
      icone: 'syringe',
      tipo: 'success',
      idosoId: '909.443.059-20',
    },
    {
      titulo: 'Alerta de medicamento',
      descricao: 'Paracetamol em falta no estoque',
      icone: 'warning',
      tipo: 'warning',
      idosoId: '123.456.789-00',
    },
  ];

  notificacoesDoIdoso: any[] = [];

  ngOnInit() {
    // 🔹 Filtra só as notificações do idoso logado
    this.notificacoesDoIdoso = this.notificacoes.filter((n) => n.idosoId === this.cpfHospede);
  }
}
