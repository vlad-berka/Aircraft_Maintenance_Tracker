import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DisplayAllData } from './display-all-data.component';
import { DisplayArray } from './display-array.component';
import { DisplayDropdown } from './display-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    // DisplayAllData,
    DisplayDropdown,
    // DisplayArray
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
