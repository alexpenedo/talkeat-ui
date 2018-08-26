import {Menu} from '../menu/menu';
import {User} from '../user/user';
import {Rate} from '../rate/rate';

export class Booking {
  public _id: string;
  public guest: User;
  public menu: Menu;
  public menuDate: Date;
  public host: User;
  public persons: number;
  public comment: string;
  public confirmed: boolean;
  public canceled: boolean;
  public hostRate: Rate;
  public guestRate: Rate;

  constructor(guest: User, menu: Menu, menuDate: Date, host: User, persons: number, comment: string) {
    this.guest = guest;
    this.menu = menu;
    this.menuDate = menuDate;
    this.host = host;
    this.persons = persons;
    this.comment = comment;
  }
}
