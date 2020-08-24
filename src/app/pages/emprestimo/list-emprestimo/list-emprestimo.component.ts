import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { Emprestimo } from 'src/app/services/models/emprestimo';
import { Return } from 'src/app/services/models/return';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-emprestimo',
  templateUrl: './list-emprestimo.component.html',
  styleUrls: ['./list-emprestimo.component.css'],
})
export class ListEmprestimoComponent implements OnInit {
  public emprestimos: any = null;
  public msg: string;
  public filtro: FormGroup;
  public emprestimo: Emprestimo;
  public filtroValor: any;
  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filtro = this.fb.group({
      emprestimoFiltro: [''],
    });
    this.emprestimoService
      .getAll('')
      .subscribe((data: Emprestimo) => (this.emprestimos = data));
  }

  submit(): void {
    console.log(this.filtro.getRawValue());
    this.filtroValor = this.filtro.getRawValue();
    this.emprestimoService.getAll(this.filtroValor.emprestimoFiltro).subscribe(
      (data: Emprestimo) => (this.emprestimos = data),
      (error) => Swal.fire('Oops...', 'Erro ao conectar a API', 'error')
    );
  }

  calculateDiff(data) {
    let date = new Date(data);
    let currentDate = new Date();
    let days = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24
    );
    return days;
  }

  confirmDevolucao(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, devolvido!',
      cancelButtonText: 'Não!',
    }).then((result) => {
      if (result.value) {
        this.Devolucao(id);
      }
    });
  }

  Devolucao(id: number): void {
    let emprestimo = new Emprestimo();
    emprestimo.id = id;
    this.emprestimoService.put(emprestimo).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.emprestimoService.getAll('').subscribe(
            (data: Emprestimo) => (this.emprestimos = data),
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
