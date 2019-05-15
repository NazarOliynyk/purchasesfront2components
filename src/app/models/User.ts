import {Purchase} from './Purchase';

export class User {
  // constructor(
  //   public id: number = 0,
  //   public username: string = '',
  //   public password: string = '',
  //   public purchases: Purchase [] = []
  // ) {}
  public id = 0;
  public username = '';
  public password = '';
  public purchases: Purchase [] = [];
}
