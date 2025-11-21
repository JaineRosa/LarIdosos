import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  constructor(private userRepo: UserRepository) {}

  listar(): Observable<UserModel[]> {
    return this.userRepo.getByType('RESPONSAVEL');
  }

  buscar(id: string): Observable<UserModel> {
    return this.userRepo.getById(id);
  }

  criar(responsavel: UserModel): Observable<UserModel> {
    responsavel.tipoUsuario = 'RESPONSAVEL'; 
    return this.userRepo.post(responsavel);
  }

  atualizar(id: string, responsavel: UserModel): Observable<UserModel> {
    responsavel.tipoUsuario = 'RESPONSAVEL';
    return this.userRepo.put(id, responsavel);
  }

  excluir(id: string): Observable<void> {
    return this.userRepo.delete(id);
  }
}