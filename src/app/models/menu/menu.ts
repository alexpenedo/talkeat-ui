import { User } from './../user/user';
import { Time } from '@angular/common/src/i18n/locale_data_api';
export class Menu {
    public _id: string;
    public name: string;
    public description: string;
    public guests: number;
    public available: number;
    public price: number;
    public host: User;
    public starters: any[];
    public mains: any[];
    public desserts: any[];
    public date: Date;
    public postalCode: string;
    public country: string;
    public address: string;
}
