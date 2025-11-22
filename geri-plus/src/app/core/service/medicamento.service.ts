
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  
  // URL base para o seu controller Spring Boot
  private apiUrl = '/api/medicamentos'; 

  constructor(private http: HttpClient) {}

  listarPorIdoso(idosoId: string): Observable<MedicamentoModel[]> {
    return this.http.get<MedicamentoModel[]>(`${this.apiUrl}/idoso/${idosoId}`);
  }

  listarTodos(): Observable<MedicamentoModel[]> {
    return this.http.get<MedicamentoModel[]>(this.apiUrl);
  }
  
  criar(medicamento: MedicamentoModel): Observable<MedicamentoModel> {
    return this.http.post<MedicamentoModel>(this.apiUrl, medicamento);
  }

  atualizar(id: string, medicamento: MedicamentoModel): Observable<MedicamentoModel> {
    return this.http.put<MedicamentoModel>(`${this.apiUrl}/${id}`, medicamento);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorId(id: string): Observable<MedicamentoModel> {
    return this.http.get<MedicamentoModel>(`${this.apiUrl}/${id}`);
  }
}