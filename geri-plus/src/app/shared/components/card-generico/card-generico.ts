import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-generico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-generico.html',
  styleUrls: ['./card-generico.scss'],
  host: {
    '[class.sobre]': 'variante === "sobre"' // 🔄 aplica classe "sobre" dinamicamente
  }
})
export class CardGenerico {
  @Input() titulo: string = '';
  @Input() subtitulo?: string;
  @Input() descricao?: string;
  @Input() icone?: string; // opcional, para ícones diferentes
  @Input() cor?: string; // opcional, para destacar categorias
  @Input() tipo: string = 'default'; // 'default' ou 'destaque'
  @Input() variante: string = ''; // padrão vazio
}
