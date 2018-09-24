import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { getBaseServiceUrl } from './baseUrl';
import { Authorization} from './authorization';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient) { }
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    login(user, password): Observable<Authorization> {
        const baseUrl = getBaseServiceUrl();
        return this.http.post<Authorization>(`${baseUrl}login/`,
            {'username': user, 'password': password}, httpOptions).pipe(
                tap(resp => {
                    if (resp.success === true) {
                        this.isLoggedIn = true;
                    }
                }), catchError(this.handleError<Authorization>('try to log in'))
        );
        /*return of(true).pipe(
            delay(1000),
            tap(val => this.isLoggedIn = true)
        );*/
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}