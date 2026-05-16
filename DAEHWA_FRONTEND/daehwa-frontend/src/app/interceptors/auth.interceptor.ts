import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthUserService } from "../services/authuser.service";

export const authInterceptor: HttpInterceptorFn = (peticion,next) => {
    const auth=inject(AuthUserService);
    const token=auth.getToken();
    if(!token){
        return next(peticion);
    }
    const peticionToken=peticion.clone({
        setHeaders:{
            Authorization:`Bearer ${token}`
        }
    });

    return next(peticionToken);
}