import {Booking} from '../booking/booking';
import {Message} from '../message/message';

export class Chat {
    public _id: string;
    public booking: Booking;
    public messages: Message[];
    public notRead: number;
    public hostLastConnection: Date;
    public guestLastConnection: Date;
}
