import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

;
import { JwtHelperService } from '../service/jwt-helper.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private jwtHelper: JwtHelperService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        if (token ) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
