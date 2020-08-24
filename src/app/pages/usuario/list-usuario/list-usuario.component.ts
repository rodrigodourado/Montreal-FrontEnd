import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/services/models/usuario';
import { Return } from 'src/app/services/models/return';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css'],
})
export class ListUsuarioComponent implements OnInit {
  public usuarios: any = null;
  public msg: string;
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(
      (data: Usuario) => (this.usuarios = data),
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
    this.usuarioService.inactive(id).subscribe((data: Return) => {
      if (data.success)
        Swal.fire('Bom Trabalho!', data.message, 'success').then(() => {
          this.usuarioService.getAll().subscribe(
            (data: Usuario) => (this.usuarios = data),
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
