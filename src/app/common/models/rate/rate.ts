import {Booking} from '../booking/booking';
import {RateType} from '../../enums/rate-type.enum';

export class Rate {
  public comment: string;
  public rate: number;
  public booking: Booking;
  public date: Date;
  public type: RateType;

  constructor(comment: string, rate: number, booking: Booking, type: RateType) {
    this.comment = comment;
    this.rate = rate;
    this.booking = booking;
    this.type = type;
  }
}
