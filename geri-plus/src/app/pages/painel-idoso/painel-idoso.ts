import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PainelContainer } from './components/painel-container/painel-container';



@Component({
  selector: 'app-painel-idoso',
  standalone: true,
  imports: [CommonModule, PainelContainer],
  templateUrl: './painel-idoso.html',
  styleUrls: ['./painel-idoso.scss'],
})
export class PainelIdoso {
  nomeFamiliar = localStorage.getItem('nomeFamiliar') || '';
  nomeHospede = localStorage.getItem('nomeHospede') || '';
  cpfHospede = localStorage.getItem('cpfHospede') || '';

  
}
/* para integrar com o back depois
@Injectable({ providedIn: 'root' })
export class IdosoService {
  listaIdosos: any[] = [
    {
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      dataNascimento: '1940-05-10',
      responsavelId: 'RESP001',
      quarto: '12B',
      statusResidencia: 'ATIVO',
      medicamentos: ['Dipirona', 'Losartana'],
      recomendacoesMedicas: ['Evitar esforço físico'],
      foto: 'assets/images/idoso-avatar.png',
    },
    // outros idosos...
  ];

  getIdosoPorCpf(cpf: string) {
    return this.listaIdosos.find(idoso => idoso.cpf === cpf);
  }
}


*/
