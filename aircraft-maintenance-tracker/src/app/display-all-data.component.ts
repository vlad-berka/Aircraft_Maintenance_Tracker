import { Component } from '@angular/core';
import * as aircraft from './files/aircraft.json';
import { displayJsonFile, processData, updateObject } from './files/utils';

@Component({
  selector: 'display-data',
  templateUrl: './display-all-data.component.html',
  styleUrls: ['./app.component.css'],
})

export class DisplayAllData {
  title = 'aircraft-maintenance-tracker';
  aircraftList: any = (aircraft as any).default;

  ngOnInit(){
    processData(1);
    displayJsonFile(this.aircraftList);
    updateObject(this.aircraftList);
  }
}
