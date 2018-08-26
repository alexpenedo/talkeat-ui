import { Booking } from "../booking/booking";
import { User } from "../user/user";
import { Message } from "../message/message";

export class Chat {
    public _id: string;
    public booking: Booking;
    public menuDate: Date;
    public host: User;
    public guest: User;
    public messages: Message[];
    public notRead: number;
    public hostLastConnection: Date;
    public guestLastConnection: Date;
}
