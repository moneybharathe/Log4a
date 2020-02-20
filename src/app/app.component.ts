import {Component, OnInit} from '@angular/core';
import {Log4a} from '@ng-log/log4a';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample';
  constructor(public logger: Log4a) {
    this.logger.log('asfasdfsaf');
  }

  ngOnInit() {
    this.logger.log('hello');
  }

  click() {
    this.logger.log('log clicks');
    this.logger.debug('debug clicks');
    this.logger.info('inco clicks');
    this.logger.warn('warn clicks');
    this.logger.error('error clicks');
  }
}
