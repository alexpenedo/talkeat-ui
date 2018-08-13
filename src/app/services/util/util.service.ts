import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class UtilService {

  private _activeMenu: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  activeMenuEmitter: Observable<string> = this._activeMenu.asObservable();

  private _disableMenus: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  disableMenusEmitter: Observable<string> = this._disableMenus.asObservable();

  constructor() {
  }

  public disableMenus() {
    this._disableMenus.next(null);
  }

  public activeMenu(menuId: string) {
    this._activeMenu.next(menuId);
  }

}
