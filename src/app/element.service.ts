import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { getBaseServiceUrl } from './baseUrl';

import {Element} from './element';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ElementService {

  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

          console.error(error); // log to console instead

          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
      };
  }

  getElements(count): Observable<Element[]> {
      const baseUrl = getBaseServiceUrl();
      return this.http.get<Element[]>(`${baseUrl}data?length=${count}`)
          .pipe(
              tap(items => console.log('fetched elements')),
              catchError(this.handleError('getElements', []))
      );
  }
}
