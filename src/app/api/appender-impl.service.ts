import {Injectable} from '@angular/core';

import {
  AbstractLogger,
  ConsoleAppender,
  WebApiAppender
} from 'src/app/api/core-appender.service';
import {LocalStorageAppender} from './core-appender.service';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const PUBLISHERS_FILE = 'assets/logging-config.json';
@Injectable({
  providedIn: 'root'
})
export class AppenderImplService {
  constructor(private http: HttpClient) {
    this.getLogginConfig();
  }
  appenders: AbstractLogger[] = [];
  buildAppender(): void {
    let appender: AbstractLogger;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.enable)) {
        switch (pub.appenderName.toLowerCase()) {
          case 'console':
            appender = new ConsoleAppender();
            break;
          case 'localstorage':
            appender = new LocalStorageAppender();
            break;
          case 'serverapi':
            appender = new WebApiAppender(this.http);
            break;
        }
        // Set location of logging
        appender.location = pub.location;
        // Add publisher to array
        this.appenders.push(appender);
      }
    });
  }

  getLogginConfig(): void {
    let appender: AbstractLogger;
    console.log('Setting appender as ' + this.getQueryParams('logger-option'));
    const loggerOption = this.getQueryParams('logger-option');
    if (loggerOption !== '') {
      console.log(this.getQueryParams('logger-option'));
      switch (this.getQueryParams('logger-option')) {
        case 'console':
          appender = new ConsoleAppender();
          break;
        case 'localstorage':
          appender = new LocalStorageAppender();
          break;
        case 'serverapi':
          appender = new WebApiAppender(this.http);
          break;
      }
      this.appenders.push(appender);
    } else {
      this.buildAppender();
    }
  }

  private getQueryParams(param): string {
    const href = location.href;
    const reg = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? string[1] : '';
  }

  getLoggers(): Observable<LogAppenderConfig[]> {
    return this.http.get<LogAppenderConfig[]>(PUBLISHERS_FILE);
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

class LogAppenderConfig {
  appenderName: string;
  location: string;
  enable: boolean;
}
