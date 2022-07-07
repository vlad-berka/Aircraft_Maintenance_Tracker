import { Component, ElementRef, ViewChild } from '@angular/core';
import { API_GET_TaskArray_by_AircraftID, sort_by_NextDueDate, calculate_NextDueDate, bulk_calc_NextDueDate, get_Current_Aircraft_id, get_Current_Display} from './files/utils';

@Component({
  selector: 'display-dropdown',
  templateUrl: './display-dropdown.component.html',
  styleUrls: ['./app.component.css'],
})

export class DisplayDropdown {
  title = 'aircraft-maintenance-tracker';
  // aircraftList: any = (aircraft as any).default;
  aircraftList = JSON.parse(localStorage.getItem('db') || "").default;

  curr_id = get_Current_Aircraft_id();

  aircraft_Basic = API_GET_TaskArray_by_AircraftID(get_Current_Aircraft_id());

  sorted_Tasks = sort_by_NextDueDate(this.aircraft_Basic.Task);
  
  isShown_Util = get_Current_Display("1");
  isShown_Array = get_Current_Display("2");
  isShown_SortedTasks = get_Current_Display("3");
  isShown_ALL = get_Current_Display("4");

  ngOnInit(){

  }

  @ViewChild('dropdown') dropdown!: ElementRef;
  selectedChoice='';
  dropdown_string = '';

  onSelected():void {
    this.selectedChoice = this.dropdown.nativeElement.value;
    // this.dropdown_string = this.selectedChoice;
    if(this.selectedChoice == null){
      this.selectedChoice = "0";
    }
    localStorage.setItem("current_aircraft_id", this.selectedChoice);
  }

  btn_handler(event: any){
    console.log("button was clicked on ", event.target.id);

    if(this.selectedChoice == ""){
      this.selectedChoice = "1";
    }
    console.log("Current dropdown is: _", this.selectedChoice, "_");

    localStorage.setItem("current_aircraft_id", this.selectedChoice);
    localStorage.setItem("current_display", event.target.id);

      // window.location.reload();
    
    this.isShown_Array = false;
    this.isShown_Util = false;
    this.isShown_SortedTasks = false;

    switch (event.target.id) {
      case "1": {this.isShown_Util = true; break;}
      case "2": {this.isShown_Array = true; break;}
      case "3": {this.isShown_SortedTasks = true; break;}
      default: {this.isShown_SortedTasks = true; break;}
    }
    window.location.reload();
  }

}
