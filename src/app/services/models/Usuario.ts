import { InstituicaoEnsino } from './InstituicaoEnsino';

export interface Usuario {
  id?: number;
  nome: string;
  endereco: string;
  cpf: string;
  telefone: string;
  email: string;
  idInstituicaoEnsino: number;
  instituicaoEnsino?: InstituicaoEnsino;
}
