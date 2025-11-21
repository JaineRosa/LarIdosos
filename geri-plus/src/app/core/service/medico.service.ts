import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private userRepo: UserRepository) {}

  listar(): Observable<UserModel[]> {
    // Busca todos os usuários do tipo MEDICO
    return this.userRepo.getByType('MEDICO');
  }

  buscar(id: string): Observable<UserModel> {
    return this.userRepo.getById(id);
  }

  criar(medico: UserModel): Observable<UserModel> {
    medico.tipoUsuario = 'MEDICO'; // Garante o tipo correto
    return this.userRepo.post(medico);
  }

  atualizar(id: string, medico: UserModel): Observable<UserModel> {
    medico.tipoUsuario = 'MEDICO';
    return this.userRepo.put(id, medico);
  }

  excluir(id: string): Observable<void> {
    return this.userRepo.delete(id);
  }
}
