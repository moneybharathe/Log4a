import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { LogEntry } from './log4a.service';
import { AbstractLogger } from './log4a.model';

export class ConsoleAppender extends AbstractLogger {
  log(entry: LogEntry): Observable<boolean> {
    entry.buildLogString();
    return of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}

export class LocalStorageAppender extends AbstractLogger {
  constructor() {
    super();
    this.location = 'logging';
  }

  log(entry: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];

    try {
      const location = localStorage.getItem(this.location) ?? '';
      values = JSON.parse(location) || [];
      values.push(entry);
      localStorage.setItem(this.location, JSON.stringify(values));
      ret = true;
    } catch (e) {
      console.error(e);
    }
    return of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class WebApiAppender extends AbstractLogger {
  constructor(private http: HttpClient) {
    super();
    this.location = 'api/logging';
  }

  log(entry: LogEntry): Observable<boolean> {
    // let headers = new Headers({ 'Content-Type': 'Content-Type' });
    const options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http
      .post<boolean>(this.location, entry, { headers: options }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        console.error('There was an error!', error);
        // after handling error, return a new observable 
        // that doesn't emit any values and completes
        return of();
    }));
    return of(true);
  }

  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return throwError(errors);
  }
}
