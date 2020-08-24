import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/services/models/livro';
import { Return } from 'src/app/services/models/return';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-livro',
  templateUrl: './list-livro.component.html',
  styleUrls: ['./list-livro.component.css'],
})
export class ListLivroComponent implements OnInit {
  public livros: any = null;
  public msg: string;
  constructor(
    private livroService: LivroService,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.livroService
      .getAll('')
      .subscribe((data: Livro) => (this.livros = data));
  }

  public createImgPath = (serverPath: string) => {
    return `${this.configService.urlApi}/${serverPath}`;
  };

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
    this.livroService.inactive(id).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.livroService
            .getAll('')
            .subscribe((data: Livro) => (this.livros = data));
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
