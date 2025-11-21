import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  private readonly API_URL = '/api/usuarios';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.API_URL, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  getByType(tipo: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.API_URL}/tipo/${tipo}`, {
      headers: this.getHeaders(),
    });
  }

  post(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.API_URL, user, { headers: this.getHeaders() });
  }

  put(id: string, user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.API_URL}/${id}`, user, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
