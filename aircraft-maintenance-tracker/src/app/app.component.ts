import { Component, OnInit } from '@angular/core';
import * as aircraft from './files/aircraft.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'aircraft-maintenance-tracker';
  aircraftList: any = (aircraft as any).default;

  ngOnInit(){
    console.log(aircraft);
  }
}
