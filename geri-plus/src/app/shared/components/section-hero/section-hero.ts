import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-hero',
  imports: [CommonModule],
  templateUrl: './section-hero.html',
  styleUrls: ['./section-hero.scss']
})
export class SectionHero {
  @Input() titulo: string = '';
  @Input() subtitulo?: string;
  @Input() botaoTexto?: string;
  @Input() botaoLink?: string;
  @Input() tamanho?: 'small' | 'medium' | 'large' = 'medium'; // controla altura e fonte
}
