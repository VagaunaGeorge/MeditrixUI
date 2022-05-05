import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { AdminGuard } from './admin-guard.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

    constructor(private adminGuard: AdminGuard) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.checkIfDoctor();
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    checkIfDoctor(): boolean {
        if (this.adminGuard.checkIfAdmin()) { return true; } // admins have doctor rights
        if (localStorage.getItem('user') !== null) {
            var isDoctor = JSON.parse(localStorage.getItem('user'))['doctor'];
            return isDoctor;
        }
        return false;
    }
}
