import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { Log4aModule } from './app/Log4a.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Log4aModule)
  .catch(err => console.error(err));
