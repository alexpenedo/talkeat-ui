import { User } from "../user/user";
import { Booking } from "../booking/booking";
import { Chat } from "../chat/chat";
export class Message {
    chat: Chat;
    message: string;
    from: User;
}
