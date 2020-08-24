import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getAll(emprestimo: string) {
    return this.http.get(
      `${this.configService.urlApi}/v1/livro?emprestimo=${emprestimo}`
    );
  }

  public getById(id: string) {
    return this.http.get(`${this.configService.urlApi}/v1/livro/${id}`);
  }

  public post(data) {
    return this.http.post(`${this.configService.urlApi}/v1/livro`, data);
  }

  public put(data) {
    return this.http.put(`${this.configService.urlApi}/v1/livro`, data);
  }

  public inactive(id: string) {
    return this.http.delete(`${this.configService.urlApi}/v1/livro/${id}`);
  }
}
