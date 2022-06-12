//Import necessário
import { Points } from "./points";

//Estrutura de um objeto utilizador (user)
export class User {
  //ID do utilizador (user)
  public _id!: string;

  //Nome (name) de um utilizador (user)
  public name!: string;

  //Email de um utilizador (user)
  public email!: string;

  //Palavra passe (password) de um utilizador (user)
  public password!: string;
  //public points!: Points[];

  //Morada (address) de um utilizador (user)
  public address!: string;

  //Cargo (role) de um utilizador (user)
  public role!: string;
}
