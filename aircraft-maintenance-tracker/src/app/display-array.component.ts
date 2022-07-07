import { Component, ElementRef, ViewChild } from '@angular/core';
import * as aircraft from './files/aircraft_data.json';
import { API_GET_TaskArray_by_AircraftID, calculate_NextDueDate, get_Current_Aircraft_id} from './files/utils';

// let current_aircraft_id = localStorage.getItem("current_aircraft_id", || "1");

@Component({
  selector: 'display-array',
  templateUrl: './display-array.component.html',
  styleUrls: ['./app.component.css'],
})

export class DisplayArray {
  title = 'aircraft-maintenance-tracker';
  aircraftList: any = (aircraft as any).default;
  aircraft_Basic = API_GET_TaskArray_by_AircraftID(get_Current_Aircraft_id());
  // aircraft_Basic = API_GET_TaskArray_by_AircraftID(localStorage.getItem("current_aircraft_id",||"1"));

  ngOnInit(){
    // console.log(this.aircraftList);
    // console.log("");
    // console.log("aircraft basic is: ", this.aircraft_Basic);
  }

}