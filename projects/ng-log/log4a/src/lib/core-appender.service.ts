
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {LogEntry} from './log4a.service';




export abstract class AbstractLogger {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}



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

      values = JSON.parse(localStorage.getItem(this.location)) || [];
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
    const options = new HttpHeaders().set ( 'Content-Type', 'application/json' );
    this.http.post<boolean>(this.location, entry, { headers: options }).subscribe(res => {
    }, error => {
      console.log(error);
    });
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
