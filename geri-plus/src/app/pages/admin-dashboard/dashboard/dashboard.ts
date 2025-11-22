import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdosoService } from '../../../core/service/idoso.service';
import { CuidadorService } from '../../../core/service/cuidador.service';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

totalIdosos: number = 0;
  totalCuidadores: number = 0;
  notificacoesPendentes: number = 7; 

  // Injeção de dependências no construtor
  constructor(
    private idosoService: IdosoService,
    private cuidadorService: CuidadorService
  ) { }

  ngOnInit(): void {
    this.carregarMetricas();
  }

  carregarMetricas(): void {
    // 1. Obter Total de Idosos
    this.idosoService.listar().subscribe({
      next: (idosos: UserModel[]) => {
        this.totalIdosos = idosos.length;
      },
      error: (err) => {
        console.error('Erro ao buscar idosos', err);
      }
    });

    this.cuidadorService.listar().subscribe({
      next: (cuidadores: UserModel[]) => {
        this.totalCuidadores = cuidadores.length;
      },
      error: (err) => {
        console.error('Erro ao buscar cuidadores', err);
      }
    });
  }
}