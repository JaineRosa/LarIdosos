import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-cards.html',
  styleUrl: './lista-cards.scss',
})
export class ListaCards {
  @Input() dados: any[] = []; // recebe a lista (ex: idosos, responsáveis, cuidadores, registros etc.)
  /** Título opcional da lista */
  @Input() titulo?: string;

  /** Lista de objetos (idosos, responsáveis, cuidadores, registros etc.) */
  @Input() itens: any[] = [];

  /** Campos que devem aparecer no resumo do card */
  @Input() camposResumo: string[] = [];

  /** Se deve mostrar foto/avatar */
  @Input() exibirFoto: boolean = false;

  /** Evento disparado ao clicar em editar */
  @Output() editar = new EventEmitter<any>();

  /** Evento disparado ao clicar em excluir (opcional) */
  @Output() excluir = new EventEmitter<any>();

  /** Evento disparado ao clicar em detalhes (se quiser usar depois) */
  @Output() detalhes = new EventEmitter<any>();

  /** Método para acionar edição */
  onEditar(item: any) {
    this.editar.emit(item);
  }

  /** Método para acionar exclusão */
  onExcluir(item: any) {
    this.excluir.emit(item);
  }

  /** Método para acionar detalhes */
  onDetalhes(item: any) {
    this.detalhes.emit(item);
  }
}


