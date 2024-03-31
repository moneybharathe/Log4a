import {Component} from '@angular/core';

import {Product} from './product';
import { Log4a, LogEntry, LogLevel } from 'projects/ng-log/log4a/src/public_api';
// Add this

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'log-test',
  templateUrl: './log-test.component.html'
})
export class LogTestComponent {
  constructor(private logger: Log4a) {
    // Inject providers
  }

  // Public Properties
  logEntries!: LogEntry[];

  toggleLogging(): void {
    this.logger.level = LogLevel.All ? LogLevel.Off : LogLevel.All;
  }

  toggleDate(): void {
    this.logger.logWithDate = !this.logger.logWithDate;
  }

  clearLog(): void {
    this.logger.clear();
  }

  logTest(): void {
    this.logger.log('Test log() method');
  }

  debugTest(): void {
    this.logger.debug('Test debug() method');
  }

  infoTest(): void {
    this.logger.info('Test info() method');
  }

  warnTest(): void {
    this.logger.warn('Test warn() method');
  }

  errorTest(): void {
    this.logger.error('Test error() method');
  }

  fatalTest(): void {
    this.logger.fatal('Test fatal() method');
  }

  stringTest(): void {
    this.logger.log('Message and string test', 'Paul', 'Smith');
  }

  boolTest(): void {
    this.logger.log('Message and boolean test', true, false);
  }

  numberTest(): void {
    this.logger.log('Message and number test', 1, 2, 3, 4, 5);
  }

  objectTest(): void {
    const product = {} as Product;
    product.productId = 10;
    product.productName = 'A New Product';
    product.introductionDate = new Date();
    product.price = 20;
    product.url = 'http://www.fairwaytech.com';

    this.logger.log('Message and object test', product, 'a string', 1, true);
  }

  arrayTest(): void {
    const values = ['1', 'Paul', 'Smith'];

    this.logger.log('Message and array test', 'another string', values);
  }

  allTypesTest(): void {
    const values = ['1', 'Paul', 'Smith'];
    const product = {} as Product;
    product.productId = 10;
    product.productName = 'A New Product';
    product.introductionDate = new Date();
    product.price = 20;
    product.url = 'http://www.fairwaytech.com';

    this.logger.log(
      'Message and All Types test',
      'another string',
      1,
      2,
      true,
      false,
      values,
      product
    );
  }

  setOptionsTest(): void {
    // Get current logging level
    const oldLevel = this.logger.level;

    // Set level to error and above
    this.logger.level = LogLevel.Error;

    // Attempt some logging
    this.logger.log('This one should not show up');
    this.logger.warn('This one should not show up either');

    this.logger.error('This is an ERROR');
    this.logger.fatal('This is a FATAL ERROR');

    // Reset level back to old value
    this.logger.level = oldLevel;
  }
}
