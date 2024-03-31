import { Injectable } from '@angular/core';
import { LocalStorageAppender, ConsoleAppender, WebApiAppender } from './core-appender.service';
import { HttpClient } from '@angular/common/http';
import { AbstractLogger, LogAppenderConfig } from './log4a.model';

@Injectable()
export class AppenderService {

  appenders: AbstractLogger[] = [];

  constructor(private http: HttpClient) {
    console.log('AppenderService Initiated');
  }

  loadConfig(logConfig: LogAppenderConfig[]) {
    let appender = {} as AbstractLogger;
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
    let appender = {} as AbstractLogger;
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

  public getQueryParams(param: string): string {
    const href = location.href;
    const reg = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? string[1] : '';
  }

}
