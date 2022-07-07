import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as aircraft from './app/files/aircraft_data.json';
import { bulk_calc_NextDueDate } from './app/files/utils';

if (localStorage.getItem('db')===null){
  console.log("Localstorage does not have DB, creating DB");
  bulk_calc_NextDueDate(aircraft);
  localStorage.setItem('db', JSON.stringify(aircraft));
}
if (localStorage.getItem('current_aircraft_id')===null){
  console.log("Localstorage does not have current_aircraft_id, current_aircraft_id");
  localStorage.setItem('current_aircraft_id', "1");
}
if (localStorage.getItem('current_display')===null){
  console.log("Localstorage does not have current_display, creating current_display");
  localStorage.setItem('current_display', "1");
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
