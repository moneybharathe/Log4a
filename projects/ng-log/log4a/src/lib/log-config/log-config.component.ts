import {Component, OnInit} from '@angular/core';
import { Log4a, LogLevel } from 'projects/ng-log/log4a/src/public_api';

@Component({
  selector: 'log-config',
  templateUrl: './log-config.component.html',
  styleUrls: ['./log-config.component.css']
})
export class LogConfigComponent implements OnInit {
  isChecked = true;

  constructor(public logger: Log4a) {}

  ngOnInit() {}

  enableLog(): void {
    this.isChecked = !this.isChecked;
    this.logger.level = this.isChecked ?  LogLevel.All : LogLevel.Off
  }

  enableDate(): void {
    this.logger.logWithDate = !this.logger.logWithDate;
  }

  setLogLevel(level: string): void {
    switch (level) {
      case 'Debug':
        this.logger.level = (this.logger.level === LogLevel.Off) ? LogLevel.Off : LogLevel.Debug;
        break;
      case 'Info':
        this.logger.level = (this.logger.level === LogLevel.Off) ? LogLevel.Off : LogLevel.Info;
        break;
      case 'Warn':
        this.logger.level = (this.logger.level === LogLevel.Off) ? LogLevel.Off : LogLevel.Warn;
        break;
      case 'Error':
        this.logger.level = (this.logger.level === LogLevel.Off) ? LogLevel.Off : LogLevel.Error;
        break;
      default:
        this.logger.level = (this.logger.level === LogLevel.Off) ? LogLevel.Off : LogLevel.All;
        break;
    }
  }

  logmsg(){
    this.logger.debug('test')
  }
}
