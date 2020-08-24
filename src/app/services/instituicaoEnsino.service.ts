import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class InstituicaoEnsinoService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getAll() {
    return this.http.get(`${this.configService.urlApi}/v1/instituicaoEnsino/`);
  }

  public getById(id: string) {
    return this.http.get(
      `${this.configService.urlApi}/v1/instituicaoEnsino/${id}`
    );
  }

  public post(data) {
    return this.http.post(
      `${this.configService.urlApi}/v1/instituicaoEnsino`,
      data
    );
  }

  public put(data) {
    return this.http.put(
      `${this.configService.urlApi}/v1/instituicaoEnsino`,
      data
    );
  }

  public inactive(id: string) {
    return this.http.delete(
      `${this.configService.urlApi}/v1/instituicaoEnsino/${id}`
    );
  }
}
