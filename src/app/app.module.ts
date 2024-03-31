import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ChildComponent } from './child/child.component';
import { AppComponent } from './app.component';
import { AppenderService, Log4a } from 'projects/ng-log/log4a/src/public_api';
import { LogTestComponent } from './log-test/log-test.component';
import { LogConfigComponent } from './log-config/log-config.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ChildComponent, LogConfigComponent, LogTestComponent, LogConfigComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],

providers: [
    Log4a,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: Log4a) => () => config.loadConfigs(),
      deps: [Log4a],
      multi: true,
    },
    AppenderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
