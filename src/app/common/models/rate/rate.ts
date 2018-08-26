import {User} from '../user/user';
import {Booking} from '../booking/booking';
import {RateType} from '../../enums/rate-type.enum';

export class Rate {
  public guest: User;
  public host: User;
  public comment: string;
  public rate: number;
  public booking: Booking;
  public date: Date;
  public type: RateType;

  constructor(guest: User, host: User, comment: string, rate: number, booking: Booking, type: RateType) {
    this.guest = guest;
    this.host = host;
    this.comment = comment;
    this.rate = rate;
    this.booking = booking;
    this.type = type;
  }
}
