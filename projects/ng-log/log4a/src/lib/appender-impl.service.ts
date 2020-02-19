import { Injectable } from '@angular/core';
import { LocalStorageAppender, AbstractLogger, ConsoleAppender, WebApiAppender } from './core-appender.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppenderService {
  constructor(private http: HttpClient) {
    console.log('AppenderService Initiated');
  }

  logConfig: LogAppenderConfig[];



  appenders: AbstractLogger[] = [];


  loadConfig(logConfig: LogAppenderConfig[]) {
    let appender: AbstractLogger;
    for (const pub of logConfig.filter(p => p.enable)) {
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
  }



  loadRuntimeConfig(): void {
    let appender: AbstractLogger;
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
  }

  public getQueryParams(param): string {
    const href = location.href;
    const reg = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? string[1] : '';
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

export class LogAppenderConfig {
  appenderName: string;
  location: string;
  enable: boolean;
}
