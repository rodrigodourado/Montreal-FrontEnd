import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InstituicaoEnsinoService } from 'src/app/services/instituicaoEnsino.service';
import { Router } from '@angular/router';
import { InstituicaoEnsino } from 'src/app/services/models/instituicaoEnsino';
import { Return } from 'src/app/services/models/return';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-instituicaoEnsino',
  templateUrl: './form-instituicaoEnsino.component.html',
  styleUrls: ['./form-instituicaoEnsino.component.css'],
})
export class FormInstituicaoEnsinoComponent implements OnInit {
  public id: string;
  public cadastro: FormGroup;
  public msg: string;
  public retorno: any;
  public instituicaoEnsino: InstituicaoEnsino;

  constructor(
    private instituicaoEnsinoService: InstituicaoEnsinoService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.instituicaoEnsinoService
        .getById(this.id)
        .subscribe((instituicaoEnsino: InstituicaoEnsino) =>
          this.createForm(instituicaoEnsino)
        );
    } else {
      this.createForm(this.emptyForm());
    }
  }

  private createForm(instituicaoEnsino: InstituicaoEnsino): void {
    this.cadastro = this.fb.group({
      nome: [
        instituicaoEnsino.nome,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      cnpj: [instituicaoEnsino.cnpj, [Validators.required]],
      telefone: [
        instituicaoEnsino.telefone,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      endereco: [
        instituicaoEnsino.endereco,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }

  private emptyForm(): InstituicaoEnsino {
    return {
      id: null,
      nome: null,
      endereco: null,
      cnpj: null,
      telefone: null,
    };
  }

  submit(): void {
    if (this.cadastro.invalid) {
      this.msg = 'Os Seguintes campos devem ser preenchidos:<br />';
      this.msg += this.cadastro.controls.nome.invalid ? ' - Nome<br/>' : '';
      this.msg += this.cadastro.controls.cnpj.invalid ? ' - CNPJ<br/>' : '';
      this.msg += this.cadastro.controls.telefone.invalid
        ? ' - Telefone<br/>'
        : '';
      this.msg += this.cadastro.controls.endereco.invalid
        ? ' - Endereço<br/>'
        : '';

      Swal.fire('Oops...', this.msg, 'error');
    } else {
      this.instituicaoEnsino = this.cadastro.getRawValue();
      if (this.id) {
        this.instituicaoEnsino.id = parseInt(this.id);
        this.update(this.instituicaoEnsino);
      } else {
        this.save(this.instituicaoEnsino);
      }
    }
  }

  private save(instituicaoEnsino: InstituicaoEnsino): void {
    this.instituicaoEnsinoService
      .post(instituicaoEnsino)
      .subscribe((data: Return) => {
        if (data.success)
          Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
            this.router.navigateByUrl('/InstituicaoEnsinoList');
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

  private update(instituicaoEnsino: InstituicaoEnsino): void {
    this.instituicaoEnsinoService
      .put(instituicaoEnsino)
      .subscribe((data: Return) => {
        if (data.success)
          Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
            this.router.navigateByUrl('/InstituicaoEnsinoList');
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
