import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { Emprestimo } from 'src/app/services/models/emprestimo';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-alerta',
  templateUrl: './list-alerta.component.html',
  styleUrls: ['./list-alerta.component.css'],
})
export class ListAlertaComponent implements OnInit {
  public emprestimos: any = null;
  public msg: string;

  constructor(private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.emprestimoService.getAlerta().subscribe(
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
}
