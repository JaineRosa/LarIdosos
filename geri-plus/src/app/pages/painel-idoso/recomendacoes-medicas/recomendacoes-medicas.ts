import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';

@Component({
  selector: 'app-recomendacoes-medicas',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './recomendacoes-medicas.html',
  styleUrls: ['./recomendacoes-medicas.scss'],
})
export class RecomendacoesMedicas {
  @Input() cpfHospede!: string;

  prescricoesDoIdoso: any[] = [];

  ngOnInit() {
    const todasPrescricoes = [
      { nome: 'Fisioterapia', descricao: '3x por semana', idosoId: '909.443.059-20' },
      { nome: 'Exame de sangue', descricao: 'Agendado para 25/11', idosoId: '909.443.059-20' },
      {
        nome: 'Consulta cardiologista',
        descricao: 'Agendada para 30/11',
        idosoId: '123.456.789-00',
      },
    ];
    this.prescricoesDoIdoso = todasPrescricoes.filter((p) => p.idosoId === this.cpfHospede);
  }
}
