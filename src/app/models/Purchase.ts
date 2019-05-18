import {User} from './User';

export class Purchase {

    public id = 0;
    public name = '';
    public price = 0;
    public date: Date ;
    public currency: CurrencyType = null;
    public user: User;

}
