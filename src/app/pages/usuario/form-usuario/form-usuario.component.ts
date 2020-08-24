import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InstituicaoEnsinoService } from 'src/app/services/instituicaoEnsino.service';
import { Router } from '@angular/router';
import { InstituicaoEnsino } from 'src/app/services/models/instituicaoEnsino';
import { Usuario } from 'src/app/services/models/usuario';
import { Return } from 'src/app/services/models/return';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit {
  public id: string;
  public cadastro: FormGroup;
  public msg: string;
  public retorno: any;
  public usuario: Usuario;
  public instituicaoEnsinos: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private instituicaoEnsinoService: InstituicaoEnsinoService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.usuarioService
        .getById(this.id)
        .subscribe((usuario: Usuario) => this.createForm(usuario));
    } else {
      this.createForm(this.emptyForm());
    }
    this.instituicaoEnsinoService
      .getAll()
      .subscribe((data: InstituicaoEnsino) => (this.instituicaoEnsinos = data));
  }

  private createForm(usuario: Usuario): void {
    this.cadastro = this.fb.group({
      nome: [
        usuario.nome,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      cpf: [usuario.cpf, [Validators.required]],
      email: [usuario.email],
      idInstituicaoEnsino: [usuario.idInstituicaoEnsino, [Validators.required]],
      telefone: [usuario.telefone],
      endereco: [
        usuario.endereco,
        [Validators.required, Validators.minLength(2)],
      ],
    });
  }

  private emptyForm(): Usuario {
    return {
      id: null,
      nome: null,
      endereco: null,
      cpf: null,
      telefone: null,
      email: null,
      idInstituicaoEnsino: null,
    };
  }

  submit(): void {
    if (this.cadastro.invalid) {
      this.msg = 'Os Seguintes campos devem ser preenchidos:<br />';
      this.msg += this.cadastro.controls.nome.invalid ? ' - Nome<br/>' : '';
      this.msg += this.cadastro.controls.cpf.invalid ? ' - CPF<br/>' : '';
      this.msg += this.cadastro.controls.telefone.invalid
        ? ' - Telefone<br/>'
        : '';
      this.msg += this.cadastro.controls.idInstituicaoEnsino.invalid
        ? ' - Instituição de Ensino<br/>'
        : '';
      this.msg += this.cadastro.controls.endereco.invalid
        ? ' - Endereço<br/>'
        : '';

      Swal.fire('Oops...', this.msg, 'error');
    } else {
      this.usuario = this.cadastro.getRawValue();
      this.usuario.idInstituicaoEnsino = parseInt(
        this.cadastro.controls.idInstituicaoEnsino.value
      );
      if (this.id) {
        this.usuario.id = parseInt(this.id);
        this.update(this.usuario);
      } else {
        this.save(this.usuario);
      }
    }
  }

  private save(usuario: Usuario): void {
    this.usuarioService.post(usuario).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.router.navigateByUrl('/UsuarioList');
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

  private update(usuario: Usuario): void {
    this.usuarioService.put(usuario).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.router.navigateByUrl('/UsuarioList');
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
