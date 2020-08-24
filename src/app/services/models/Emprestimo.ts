import { Usuario } from './Usuario';
import { Livro } from './Livro';

export class Emprestimo {
  id?: number;
  idUsuario: number;
  idLivro: number;
  dataInicio?: Date;
  dataFim?: Date;
  Reserva?: boolean;
  usuario?: Usuario;
  livro?: Livro;
}
