import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { platformBrowser } from '@angular/platform-browser';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

platformBrowser().bootstrapModule(AppComponent)
  .catch(err => console.error(err));

