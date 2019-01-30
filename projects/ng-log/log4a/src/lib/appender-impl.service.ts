import { Injectable } from '@angular/core';
import { LocalStorageAppender, AbstractLogger, ConsoleAppender, WebApiAppender } from './core-appender.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppenderService {

  logConfig: LogAppenderConfig[];
  constructor(private http: HttpClient) {
    console.log('AppenderService Initiated');
  }


  loadConfig(logConfig: LogAppenderConfig[]) {
    let appender: AbstractLogger;
    for (let pub of logConfig.filter(p => p.enable)) {
      switch (pub.appenderName.toLowerCase()) {
        case "console":
          appender = new ConsoleAppender();
          break;
        case "localstorage":
          appender = new LocalStorageAppender();
          break;
        case "serverapi":
          appender = new WebApiAppender(this.http);
          break;

      }
      // Set location of logging
      appender.location = pub.location;
      // Add publisher to array
      this.appenders.push(appender);

    }
  }



  appenders: AbstractLogger[] = [];



  loadRuntimeConfig(): void {
    let appender: AbstractLogger;
      console.log(this.getQueryParams('logger-option'));
      switch (this.getQueryParams('logger-option')) {
        case "console":
          appender = new ConsoleAppender();
          break;
        case "localstorage":
          appender = new LocalStorageAppender();
          break;
        case "serverapi":
          appender = new WebApiAppender(this.http);
          break;
      }
      this.appenders.push(appender);
  }

  public getQueryParams(param): string {
    var href = location.href;
    var reg = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : "";
  }

  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }

}

export class LogAppenderConfig {
  appenderName: string;
  location: string;
  enable: boolean;
}
