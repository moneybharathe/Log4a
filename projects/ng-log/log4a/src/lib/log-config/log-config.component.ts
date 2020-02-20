import {Component, OnInit} from '@angular/core';
import {Log4a, LogLevel} from '../log4a.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'log-config',
  templateUrl: './log-config.component.html',
  styleUrls: ['./log-config.component.css']
})
export class LogConfigComponent implements OnInit {
  isChecked = true;

  constructor(private logger: Log4a) {}

  ngOnInit() {}

  enableLog(): void {
    this.isChecked = !this.isChecked;
    this.isChecked
      ? (this.logger.level = LogLevel.All)
      : (this.logger.level = LogLevel.Off);
  }

  enableDate(): void {
    this.logger.logWithDate = !this.logger.logWithDate;
  }

  setLogLevel(level): void {
    switch (level) {
      case 'Debug':
        // this.logger.level = LogLevel.Debug;
        this.logger.level = LogLevel.Off ? LogLevel.Off : LogLevel.Debug;
        break;
      case 'Info':
        // this.logger.level = LogLevel.Info;
        this.logger.level = LogLevel.Off ? LogLevel.Off : LogLevel.Info;
        break;
      case 'Warn':
        // this.logger.level = LogLevel.Warn;
        this.logger.level = LogLevel.Off ? LogLevel.Off : LogLevel.Warn;
        break;
      case 'Error':
        // this.logger.level = LogLevel.Error;
        this.logger.level = LogLevel.Off ? LogLevel.Off : LogLevel.Error;
        break;
      default:
        // this.logger.level = LogLevel.All;
        this.logger.level = LogLevel.Off ? LogLevel.Off : LogLevel.All;
        break;
    }
  }
}
