import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';
import { Router } from '@angular/router';
import { Livro } from 'src/app/services/models/livro';
import { Return } from 'src/app/services/models/return';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-livro',
  templateUrl: './form-livro.component.html',
  styleUrls: ['./form-livro.component.css'],
})
export class FormLivroComponent implements OnInit {
  public id: string;
  public cadastro: FormGroup;
  public msg: string;
  public retorno: any;
  public livro: Livro;
  public response: { dbPath: '' };

  constructor(
    private livroService: LivroService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.livroService.getById(this.id).subscribe(
        (livro: Livro) => this.createForm(livro),
        (error) => Swal.fire('Oops...', 'Erro ao conectar a API', 'error')
      );
    } else {
      this.createForm(this.emptyForm());
    }
  }

  private uploadFinished = (event) => {
    this.response = event;
  };

  private createForm(livro: Livro): void {
    this.cadastro = this.fb.group({
      titulo: [
        livro.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      genero: [
        livro.genero,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      autor: [
        livro.autor,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      sinopse: [livro.sinopse],
    });
  }

  private emptyForm(): Livro {
    return {
      id: null,
      titulo: null,
      genero: null,
      autor: null,
      sinopse: null,
      capa: null,
    };
  }

  submit(): void {
    if (this.cadastro.invalid || this.response == undefined) {
      this.msg = 'Os Seguintes campos devem ser preenchidos:<br />';
      this.msg += this.cadastro.controls.titulo.invalid ? ' - Título<br/>' : '';
      this.msg += this.cadastro.controls.genero.invalid ? ' - Genêro<br/>' : '';
      this.msg += this.cadastro.controls.autor.invalid ? ' - Autor<br/>' : '';
      this.msg += this.response == undefined ? '- Capa<br/>' : '';

      Swal.fire('Oops...', this.msg, 'error');
    } else {
      this.livro = this.cadastro.getRawValue();
      this.livro.capa = this.response.dbPath;
      if (this.id) {
        this.livro.id = parseInt(this.id);
        this.update(this.livro);
      } else {
        this.save(this.livro);
      }
    }
  }

  private save(livro: Livro): void {
    this.livroService.post(livro).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.router.navigateByUrl('/LivroList');
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

  private update(livro: Livro): void {
    this.livroService.put(livro).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.router.navigateByUrl('/LivroList');
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
