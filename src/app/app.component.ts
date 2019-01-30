import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Log4a } from '@ng-log/log4a';

const PUBLISHERS_FILE = "assets/logging-config.json";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';
  constructor(public logger: Log4a){
    this.logger.log('asfasdfsaf');
  }

  ngOnInit() {

    this.logger.log('hello');

  }

  click(){
    this.logger.log('log clicks');
    this.logger.debug('debug clicks');
    this.logger.info('inco clicks');
    this.logger.warn('warn clicks');
    this.logger.error('error clicks');
  }


}
