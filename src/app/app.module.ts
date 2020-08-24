import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './services/config.service';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PanelComponent } from './components/panel/panel.component';
import { ListEmprestimoComponent } from './pages/emprestimo/list-emprestimo/list-emprestimo.component';
import { FormEmprestimoComponent } from './pages/emprestimo/form-emprestimo/form-emprestimo.component';
import { ListLivroComponent } from './pages/livro/list-livro/list-livro.component';
import { FormLivroComponent } from './pages/livro/form-livro/form-livro.component';
import { ListInstituicaoEnsinoComponent } from './pages/instituicaoEnsino/list-instituicaoEnsino/list-instituicaoEnsino.component';
import { FormInstituicaoEnsinoComponent } from './pages/instituicaoEnsino/form-instituicaoEnsino/form-instituicaoEnsino.component';
import { ListUsuarioComponent } from './pages/usuario/list-usuario/list-usuario.component';
import { FormUsuarioComponent } from './pages/usuario/form-usuario/form-usuario.component';
import { ListAlertaComponent } from './pages/alerta/list-alerta/list-alerta.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';
import { UploadComponent } from './components/upload/upload.component';
import { ListReservaComponent } from './pages/reserva/list-reserva/list-reserva.component';
import { FormReservaComponent } from './pages/reserva/form-reserva/form-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PanelComponent,
    ListEmprestimoComponent,
    FormEmprestimoComponent,
    ListLivroComponent,
    FormLivroComponent,
    ListInstituicaoEnsinoComponent,
    FormInstituicaoEnsinoComponent,
    ListUsuarioComponent,
    FormUsuarioComponent,
    ListReservaComponent,
    FormReservaComponent,
    ListAlertaComponent,
    PanelHeaderComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          return configService.loadConfig();
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
