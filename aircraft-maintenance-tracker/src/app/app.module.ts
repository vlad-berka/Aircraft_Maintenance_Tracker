import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayAllData } from './display-all-data.component';
import { DisplayDropdown } from './display-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayAllData,
    DisplayDropdown
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
