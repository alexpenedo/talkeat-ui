import { Menu } from '../menu/menu';
import { User } from '../user/user';
import { Rate } from '../rate/rate';
export class Booking {
    public _id: string;
    public guest: User;
    public menu: Menu;
    public menuDate: Date;
    public host: User;
    public rate: Rate;
}
