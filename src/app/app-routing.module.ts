import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListEmprestimoComponent } from './pages/emprestimo/list-emprestimo/list-emprestimo.component';
import { FormEmprestimoComponent } from './pages/emprestimo/form-emprestimo/form-emprestimo.component';
import { ListLivroComponent } from './pages/livro/list-livro/list-livro.component';
import { FormLivroComponent } from './pages/livro/form-livro/form-livro.component';
import { ListInstituicaoEnsinoComponent } from './pages/instituicaoEnsino/list-instituicaoEnsino/list-instituicaoEnsino.component';
import { FormInstituicaoEnsinoComponent } from './pages/instituicaoEnsino/form-instituicaoEnsino/form-instituicaoEnsino.component';
import { ListUsuarioComponent } from './pages/usuario/list-usuario/list-usuario.component';
import { FormUsuarioComponent } from './pages/usuario/form-usuario/form-usuario.component';
import { ListAlertaComponent } from './pages/alerta/list-alerta/list-alerta.component';
import { ListReservaComponent } from './pages/reserva/list-reserva/list-reserva.component';
import { FormReservaComponent } from './pages/reserva/form-reserva/form-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ListAlertaComponent },
      { path: 'AlertaList', component: ListAlertaComponent },
      { path: 'ReservaList', component: ListReservaComponent },
      { path: 'ReservaForm', component: FormReservaComponent },
      { path: 'EmprestimoList', component: ListEmprestimoComponent },
      { path: 'EmprestimoForm', component: FormEmprestimoComponent },
      { path: 'LivroList', component: ListLivroComponent },
      { path: 'LivroForm', component: FormLivroComponent },
      { path: 'LivroForm/:id', component: FormLivroComponent },
      { path: 'UsuarioList', component: ListUsuarioComponent },
      { path: 'UsuarioForm', component: FormUsuarioComponent },
      { path: 'UsuarioForm/:id', component: FormUsuarioComponent },
      {
        path: 'InstituicaoEnsinoList',
        component: ListInstituicaoEnsinoComponent,
      },
      {
        path: 'InstituicaoEnsinoForm',
        component: FormInstituicaoEnsinoComponent,
      },
      {
        path: 'InstituicaoEnsinoForm/:id',
        component: FormInstituicaoEnsinoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
