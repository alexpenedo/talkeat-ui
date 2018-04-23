import { User } from "../user/user";
import { Booking } from "../booking/booking";

export class Rate {
    public guest: User;
    public host: User;
    public comment: string;
    public rate: number;
    public booking: Booking;
    public date: Date;

    constructor(guest: User, host: User, comment: string, rate: number, booking: Booking) {
        this.guest = guest;
        this.host = host;
        this.comment = comment;
        this.rate = rate;
        this.booking = booking;
    }
}
