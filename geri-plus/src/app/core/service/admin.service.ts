import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model'; // Assumindo que este é o caminho correto

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = '/api/usuarios'; 

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/tipo/ADMIN`);
  }

  criar(admin: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, admin);
  }

  atualizar(id: string, admin: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, admin);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}