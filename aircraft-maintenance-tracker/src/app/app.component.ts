import { Component } from '@angular/core';
import * as aircraft from './files/aircraft.json';
import { displayJsonFile, processData, updateObject } from './files/utils';

// var aircraft_in_memory = [...aircraft];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'aircraft-maintenance-tracker';
  aircraftList: any = (aircraft as any).default;

  ngOnInit(){
    processData(1);
    displayJsonFile(this.aircraftList);
    updateObject(this.aircraftList);
  }
}
