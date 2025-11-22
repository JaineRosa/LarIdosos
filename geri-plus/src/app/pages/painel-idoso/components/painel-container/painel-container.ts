import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosGerais } from '../../dados-gerais/dados-gerais';
import { Medicamentos } from '../../medicamentos/medicamentos';
import { Cuidadores } from '../../cuidadores/cuidadores';
import { RecomendacoesMedicas } from '../../recomendacoes-medicas/recomendacoes-medicas';
import { Notificacoes } from '../../notificacoes/notificacoes';
import { PainelHeader } from '../painel-header/painel-header';

@Component({
  selector: 'app-painel-container',
  standalone: true,
  imports: [
    CommonModule,
    DadosGerais,
    Medicamentos,
    Cuidadores,
    RecomendacoesMedicas,
    Notificacoes,
    PainelHeader,
  ],
  templateUrl: './painel-container.html',
  styleUrls: ['./painel-container.scss'],
})
export class PainelContainer {
  // 🔹 Recebe os dados do PainelIdoso
  @Input() nomeFamiliar!: string;
  @Input() nomeHospede!: string;
  @Input() cpfHospede!: string;

  abaSelecionada: string = 'dados-gerais';

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }
}
