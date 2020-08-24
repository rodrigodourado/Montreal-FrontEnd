import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getAll(concluido: string) {
    return this.http.get(
      `${this.configService.urlApi}/v1/emprestimo?concluido=${concluido}`
    );
  }

  public getAlerta() {
    return this.http.get(`${this.configService.urlApi}/v1/emprestimo/alerta`);
  }

  public getById(id: string) {
    return this.http.get(`${this.configService.urlApi}/v1/emprestimo/${id}`);
  }

  public post(data) {
    return this.http.post(`${this.configService.urlApi}/v1/emprestimo`, data);
  }

  public put(data) {
    return this.http.put(`${this.configService.urlApi}/v1/emprestimo`, data);
  }
}
