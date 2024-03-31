import {Component, OnInit} from '@angular/core';
import { Log4a } from 'projects/ng-log/log4a/src/public_api';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  constructor(public logger: Log4a) {
    console.log('child component ');
    this.logger.log('constructor called');
  }

  ngOnInit() {
    console.log('child component oniint');
    this.logger.log('on init called');
  }
}
