import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Log4aService } from './api/log4a.service';
import { AppenderImplService } from 'src/app/api/appender-impl.service';
import { LogTestComponent } from './log-test/log-test.component';
import { HttpClientModule } from '@angular/common/http';
import { LogConfigComponent } from './log-config/log-config.component';

@NgModule({
  declarations: [
    AppComponent,
    LogTestComponent,
    LogConfigComponent,
    LogConfigComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Log4aService, AppenderImplService],
  bootstrap: [AppComponent]
})
export class Log4aModule { }
