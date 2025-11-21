import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CuidadorService {
  constructor(private userRepo: UserRepository) {}

  listar(): Observable<UserModel[]> {
    // Busca todos os usuários do tipo CUIDADOR_PROFISSIONAL
    return this.userRepo.getByType('CUIDADOR');
  }

  buscar(id: string): Observable<UserModel> {
    return this.userRepo.getById(id);
  }

  criar(cuidador: UserModel): Observable<UserModel> {
    cuidador.tipoUsuario = 'CUIDADOR'; // Garante o tipo correto
    return this.userRepo.post(cuidador);
  }

  atualizar(id: string, cuidador: UserModel): Observable<UserModel> {
    cuidador.tipoUsuario = 'CUIDADOR';
    return this.userRepo.put(id, cuidador);
  }

  excluir(id: string): Observable<void> {
    return this.userRepo.delete(id);
  }
}
