import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";

export interface IDeactivateGuard {

    canDeactivate():boolean
}
 @Injectable({
    providedIn: 'root'})

export class DeactivateGuard implements CanDeactivate<IDeactivateGuard>{

    canDeactivate(component: IDeactivateGuard, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean {
        return component.canDeactivate()
    }

} 