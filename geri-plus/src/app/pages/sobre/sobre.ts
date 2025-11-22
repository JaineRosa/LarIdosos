import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { SectionHero } from '../../shared/components/section-hero/section-hero';
import { CardGenerico } from '../../shared/components/card-generico/card-generico';


@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, SectionHero, CardGenerico],
  templateUrl: './sobre.html',
  styleUrls: ['./sobre.scss'],
})
export class Sobre {

}
