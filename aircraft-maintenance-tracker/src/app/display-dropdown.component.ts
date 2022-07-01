import { Component } from '@angular/core';
import * as aircraft from './files/aircraft.json';
import { displayJsonFile, processData, updateObject } from './files/utils';

@Component({
  selector: 'display-dropdown',
  templateUrl: './display-dropdown.component.html',
  styleUrls: ['./app.component.css'],
})

export class DisplayDropdown {
  title = 'aircraft-maintenance-tracker';
  aircraftList: any = (aircraft as any).default;

  ngOnInit(){
    processData(1);
    displayJsonFile(this.aircraftList);
    updateObject(this.aircraftList);
  }

  clickEventMethod(){
    console.log("button was clicked on ", event);
  }
}
