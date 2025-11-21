import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class IdosoService {

  constructor(private userRepo: UserRepository) {}

  listar(): Observable<UserModel[]> {
    return this.userRepo.getByType('IDOSO');
  }

  buscar(id: string): Observable<UserModel> {
    return this.userRepo.getById(id);
  }

  criar(idoso: UserModel): Observable<UserModel> {
    idoso.tipoUsuario = 'IDOSO';
    return this.userRepo.post(idoso);
  }

  atualizar(id: string, idoso: UserModel): Observable<UserModel> {
    idoso.tipoUsuario = 'IDOSO';
    return this.userRepo.put(id, idoso);
  }

  excluir(id: string): Observable<void> {
    return this.userRepo.delete(id);
  }
}
