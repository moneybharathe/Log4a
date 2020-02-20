import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppenderService, LogAppenderConfig} from './appender-impl.service';
import {AbstractLogger} from './core-appender.service';
const PUBLISHERS_FILE = 'assets/logging-config.json';

@Injectable()
export class Log4a {
  abstractAppenders: AbstractLogger[];
  // tslint:disable-next-line: no-use-before-declare
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  constructor(
    public tiaaAppenderService: AppenderService,
    public http: HttpClient
  ) {
    this.abstractAppenders = tiaaAppenderService.appenders;
  }

  async loadConfigs() {
    const loggerOption = this.tiaaAppenderService.getQueryParams(
      'logger-option'
    );
    if (loggerOption !== '') {
      this.tiaaAppenderService.loadRuntimeConfig();
    } else {
      const file = await this.http
        .get<LogAppenderConfig[]>(PUBLISHERS_FILE)
        .toPromise()
        .then(res => {
          this.tiaaAppenderService.loadConfig(res);
        });
    }
  }

  debug(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    // tslint:disable-next-line: no-use-before-declare
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  clear(): void {
    for (const logger of this.abstractAppenders) {
      logger.clear().subscribe(response => console.log(response));
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (
      // tslint:disable-next-line: no-use-before-declare
      (level >= this.level && level !== LogLevel.Off) ||
      // tslint:disable-next-line: no-use-before-declare
      this.level === LogLevel.All
    ) {
      ret = true;
    }

    return ret;
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      // Declare variables
      // tslint:disable-next-line: no-use-before-declare
      const entry: LogEntry = new LogEntry();

      // Build Log Entry
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      for (const logger of this.abstractAppenders) {
        logger.log(entry);
        // .subscribe(response => console.log(response));
      }
    }
  }
}

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry {
  // Public Properties
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.Debug;
  extraInfo: any[] = [];
  logWithDate = true;

  // **************
  // Public Methods
  // **************
  buildLogString(): void {
    let value = '';

    if (this.logWithDate) {
      value = new Date() + '';
    }
    // value += "Type: " + LogLevel[this.level];
    value += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      value += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    switch (LogLevel[this.level]) {
      case 'Debug':
        // tslint:disable-next-line: no-console
        console.debug(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: blue; background: blue; color: white; display: block; font-weight: bold;',
          'background: white;border-bottom: 1px solid blue; font-weight: 900;color:blue'
        );
        break;
      case 'Info':
        // tslint:disable-next-line: no-console
        console.info(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: blue; background: blue; color: white; display: block; font-weight: bold;',
          'background: white;border-bottom:1px solid blue; font-weight: 900;color:blue'
        );
        break;
      case 'Warn':
        console.warn(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: black; background: orange; color: white; display: block; font-weight: bold;',
          'background: white;border-bottom: 1px solid orange; font-weight: 900; '
        );
        break;
      case 'Error':
        console.error(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: white; background: red; color: white; display: block; font-weight: bold;',
          'background:  ;border-bottom: 1px solid red; font-weight: 900; color:red'
        );
        break;
      case 'Fatal':
        console.error(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: white; background: red; color: white; display: block; font-weight: bold;',
          'background:  ;border-bottom: 1px solid red; font-weight: 900; color:red'
        );
        break;
      case 'All':
        // tslint:disable-next-line: no-console
        console.info(
          '%c Type: [' + LogLevel[this.level] + ']%c' + value,
          '  border-bottom-color: blue; background: blue; color: white; display: block; font-weight: bold;',
          'background: white;border-bottom: 1px solid blue; font-weight: 900;color:blue'
        );
        break;
    }

    // return value;
  }

  // ***************
  // Private Methods
  // ***************
  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
