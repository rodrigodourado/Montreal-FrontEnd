import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva.service';
import { Emprestimo } from 'src/app/services/models/emprestimo';
import { Return } from 'src/app/services/models/return';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-reserva',
  templateUrl: './list-reserva.component.html',
  styleUrls: ['./list-reserva.component.css'],
})
export class ListReservaComponent implements OnInit {
  public reservas: any = null;
  public msg: string;
  public filtro: FormGroup;
  public emprestimo: Emprestimo;
  public filtroValor: any;
  constructor(
    private emprestimoService: ReservaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emprestimoService.getAll().subscribe(
      (data: Emprestimo) => (this.reservas = data),
      (error) => Swal.fire('Oops...', 'Erro ao conectar a API', 'error')
    );
  }

  confirmCancelamento(id: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, cancele!',
      cancelButtonText: 'Não!',
    }).then((result) => {
      if (result.value) {
        this.Cancelamento(id);
      }
    });
  }

  Cancelamento(id: string): void {
    this.emprestimoService.inactive(id).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.emprestimoService.getAll().subscribe(
            (data: Emprestimo) => (this.reservas = data),
            (error) => Swal.fire('Oops...', 'Erro ao conectar a API', 'error')
          );
        });
      else {
        this.msg = data.message + '<br />';
        data.data.forEach((element) => {
          this.msg += element.message + '<br />';
        });
        Swal.fire('Oops...', this.msg, 'error');
      }
    });
  }
}
