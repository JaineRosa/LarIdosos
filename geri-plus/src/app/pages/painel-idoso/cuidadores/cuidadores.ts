import { Component, Input } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './cuidadores.html',
  styleUrls: ['./cuidadores.scss'],
})
export class Cuidadores {
  @Input() cpfHospede!: string;

  listaCuidadores: any[] = [];
  cuidadoresHistorico: any[] = [];

  ngOnInit() {
    // 🔹 Mock de cuidadores ativos
    const todosCuidadores = [
      {
        nome: 'Carlos Mendes',
        cpf: '111.222.333-44',
        telefone: '(47) 98888-7777',
        email: 'carlos@email.com',
        statusResidencia: 'ATIVO',
        turno: 'Manhã',
        foto: 'assets/images/profissional-avatar.png',
        idosoId: '909.443.059-20',
      },
      {
        nome: 'Maria Silva',
        cpf: '222.333.444-55',
        telefone: '(47) 97777-8888',
        email: 'maria@email.com',
        statusResidencia: 'ATIVO',
        turno: 'Noite',
        foto: 'assets/images/profissional-avatar.png',
        idosoId: '909.443.059-20',
      },
    ];

    // 🔹 Mock de histórico de cuidadores
    const historico = [
      {
        nome: 'João Souza',
        periodo: 'Janeiro - Março 2025',
        turno: 'Tarde',
        idosoId: '909.443.059-20',
      },
      {
        nome: 'Ana Costa',
        periodo: 'Abril - Junho 2025',
        turno: 'Manhã',
        idosoId: '909.443.059-20',
      },
    ];

    // 🔹 Filtra só os cuidadores do hóspede atual
    this.listaCuidadores = todosCuidadores.filter(
      (c) => c.idosoId === this.cpfHospede
    );

    this.cuidadoresHistorico = historico.filter(
      (c) => c.idosoId === this.cpfHospede
    );
  }
}
