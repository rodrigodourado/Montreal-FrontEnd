import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get('./assets/config.json')
      .toPromise()
      .then((data) => {
        this.config = data;
      });
  }

  get urlApi() {
    if (!this.config) {
      throw Error('API não configurada.');
    }
    return this.config.urlApi;
  }

  get urlSharedApi() {
    if (!this.config) {
      throw Error('API não configurada.');
    }
    return this.config.urlSharedApi;
  }
}
