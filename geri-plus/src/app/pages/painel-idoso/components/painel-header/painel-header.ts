import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './painel-header.html',
  styleUrls: ['./painel-header.scss'],
})
export class PainelHeader {
  @Input() nomeFamiliar!: string;
  @Input() nomeHospede!: string;
  @Input() cpfHospede!: string;

}
