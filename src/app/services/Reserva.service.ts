import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getAll() {
    return this.http.get(`${this.configService.urlApi}/v1/reserva`);
  }

  public getById(id: string) {
    return this.http.get(`${this.configService.urlApi}/v1/reserva/${id}`);
  }

  public post(data) {
    return this.http.post(`${this.configService.urlApi}/v1/reserva`, data);
  }

  public inactive(id: string) {
    return this.http.delete(`${this.configService.urlApi}/v1/reserva/${id}`);
  }
}
