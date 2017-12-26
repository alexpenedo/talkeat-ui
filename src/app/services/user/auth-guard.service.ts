import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public userService: UserService, public router: Router) { }

    canActivate(): boolean {
        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
