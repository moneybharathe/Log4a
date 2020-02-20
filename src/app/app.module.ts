import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {ChildComponent} from './child/child.component';
import {Log4aModule, AppenderService, Log4a} from '@ng-log/log4a';

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [HttpClientModule, Log4aModule, BrowserModule],
  providers: [
    AppenderService,
    Log4a,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: Log4a) => () => config.loadConfigs(),
      deps: [Log4a],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
