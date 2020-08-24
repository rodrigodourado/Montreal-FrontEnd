import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LivroService } from 'src/app/services/livro.service';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/services/models/emprestimo';
import { Livro } from 'src/app/services/models/livro';
import { Usuario } from 'src/app/services/models/usuario';
import { Return } from 'src/app/services/models/return';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-form-emprestimo',
  templateUrl: './form-emprestimo.component.html',
  styleUrls: ['./form-emprestimo.component.css'],
})
export class FormEmprestimoComponent implements OnInit {
  public id: string;
  public cadastro: FormGroup;
  public msg: string;
  public retorno: any;
  public emprestimo: Emprestimo;
  public usuarios: any = null;
  public livros: any = null;

  constructor(
    private emprestimoService: EmprestimoService,
    private usuarioService: UsuarioService,
    private livroService: LivroService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm(this.emptyForm());
    this.usuarioService
      .getAll()
      .subscribe((data: Usuario) => (this.usuarios = data));
    this.livroService
      .getAll('true')
      .subscribe((data: Livro) => (this.livros = data));
  }

  private createForm(emprestimo: Emprestimo): void {
    this.cadastro = this.fb.group({
      idUsuario: [emprestimo.idUsuario, [Validators.required]],
      idLivro: [emprestimo.idLivro, [Validators.required]],
    });
  }

  private emptyForm(): Emprestimo {
    return {
      id: null,
      idUsuario: null,
      idLivro: null,
      dataInicio: null,
      dataFim: null,
      Reserva: null,
    };
  }

  submit(): void {
    if (this.cadastro.invalid) {
      this.msg = 'Os Seguintes campos devem ser preenchidos:<br />';
      this.msg += this.cadastro.controls.idUsuario.invalid
        ? ' - Usário<br/>'
        : '';
      this.msg += this.cadastro.controls.idLivro.invalid ? ' - Livro<br/>' : '';

      Swal.fire('Oops...', this.msg, 'error');
    } else {
      this.emprestimo = this.cadastro.getRawValue();
      this.emprestimo.idLivro = parseInt(this.cadastro.controls.idLivro.value);
      this.emprestimo.idUsuario = parseInt(
        this.cadastro.controls.idUsuario.value
      );
      this.save(this.emprestimo);
    }
  }

  private save(emprestimo: Emprestimo): void {
    this.emprestimoService.post(emprestimo).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.router.navigateByUrl('/EmprestimoList');
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
