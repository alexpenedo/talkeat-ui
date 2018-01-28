import { Menu } from './../menu/menu';
import { User } from '../user/user';
export class Booking {
    public _id: string;
    public guest: User;
    public menu: Menu;
}
