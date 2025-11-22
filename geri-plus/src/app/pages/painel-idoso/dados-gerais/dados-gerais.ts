import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';

interface Notificacao {
  titulo: string;
  data: string;
  mensagem: string;
  tipo?: string; // pode ser 'default', 'info', 'success', 'warning', 'error'
}

@Component({
  selector: 'app-dados-gerais',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './dados-gerais.html',
  styleUrls: ['./dados-gerais.scss'],
})
export class DadosGerais implements OnInit {
  dadosIdoso: any;
  @Input() nomeFamiliar!: string;
  @Input() nomeHospede!: string;
  @Input() cpfHospede!: string;


  ngOnInit() {
    // 🔹 MOCK: dados fixos para teste
    this.dadosIdoso = {
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      dataNascimento: '1940-05-10',
      responsavelId: 'RESP001',
      quarto: '12B',
      statusResidencia: 'ATIVO',
      medicamentos: ['Dipirona', 'Losartana'],
      recomendacoesMedicas: ['Evitar esforço físico'],
      foto: 'assets/images/idoso-avatar.png',
    };

    /*
    🔹 FUTURO COM SERVICE:
    constructor(private idosoService: IdosoService) {}

    ngOnInit() {
      const cpfIdoso = '123.456.789-00'; // virá do login ou rota
      this.dadosIdoso = this.idosoService.getIdosoPorCpf(cpfIdoso);
    }
    */
  }
  notificacoes: Notificacao[] = [
    {
      titulo: 'Pressão arterial monitorada',
      data: '21/11/2025 - 16:45',
      mensagem:
        'João da Silva apresentou leve alteração de pressão arterial. Monitoramento reforçado.',
      tipo: 'warning',
    },
    {
      titulo: 'Medicamento administrado',
      data: '21/11/2025 - 10:30',
      mensagem: 'Dipirona administrada conforme prescrição médica.',
      tipo: 'success',
    },
  ];
}
