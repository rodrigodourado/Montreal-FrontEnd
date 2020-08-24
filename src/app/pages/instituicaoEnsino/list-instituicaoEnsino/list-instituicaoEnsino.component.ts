import { Component, OnInit } from '@angular/core';
import { InstituicaoEnsinoService } from 'src/app/services/instituicaoEnsino.service';
import { InstituicaoEnsino } from 'src/app/services/models/instituicaoEnsino';
import { Return } from 'src/app/services/models/return';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-instituicaoEnsino',
  templateUrl: './list-instituicaoEnsino.component.html',
  styleUrls: ['./list-instituicaoEnsino.component.css'],
})
export class ListInstituicaoEnsinoComponent implements OnInit {
  public instituicaoEnsinos: any = null;
  public msg: string;
  constructor(
    private instituicaoEnsinoService: InstituicaoEnsinoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.instituicaoEnsinoService.getAll().subscribe(
      (data: InstituicaoEnsino) => (this.instituicaoEnsinos = data),
      (error) => Swal.fire('Oops...', 'Erro ao conectar a API', 'error')
    );
  }

  confirmInactive(id: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, inative!',
      cancelButtonText: 'Não!',
    }).then((result) => {
      if (result.value) {
        this.Inactive(id);
      }
    });
  }

  Inactive(id: string): void {
    this.instituicaoEnsinoService.inactive(id).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.instituicaoEnsinoService.getAll().subscribe(
            (data: InstituicaoEnsino) => (this.instituicaoEnsinos = data),
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
