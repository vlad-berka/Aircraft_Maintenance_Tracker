import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { API_GET_TaskArray_by_AircraftID, sort_by_NextDueDate, calculate_NextDueDate, bulk_calc_NextDueDate, formatDate, get_Current_Aircraft_id, get_Current_Display, API_POST_Update_DB, API_GET_ALL} from './files/utils';

@Component({
  selector: 'display-dropdown',
  templateUrl: './display-dropdown.component.html',
  styleUrls: ['./app.component.css'],
})

export class DisplayDropdown {
  title = 'aircraft-maintenance-tracker';
  // aircraftList: any = (aircraft as any).default;
  
  // Used for rendering info in the Dom
  // aircraftList = JSON.parse(localStorage.getItem('db') || "").default;
  aircraftList = API_GET_ALL();
  // Used for updating info in the API POST request
  aircraftList_non_default = JSON.parse(localStorage.getItem('db') || "");

  curr_id = get_Current_Aircraft_id();

  aircraft_Basic = API_GET_TaskArray_by_AircraftID(get_Current_Aircraft_id());

  sorted_Tasks = sort_by_NextDueDate(this.aircraft_Basic.Task);
  
  isShown_Util = get_Current_Display("1");
  isShown_Array = get_Current_Display("2");
  isShown_SortedTasks = get_Current_Display("3");
  isShown_ALL = get_Current_Display("4");

  updateForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      new_DailyHours:[this.aircraft_Basic.DailyHours],
      new_CurrentHours:[this.aircraft_Basic.CurrentHours],
    });
  }

  onSubmit() {
    console.log(JSON.parse(localStorage.getItem('db') || ""));
    // console.log('Your form data : ', this.updateForm.value );
    // console.log(this.aircraftList[get_Current_Aircraft_id()-1]);
    // this.aircraftList.AircraftId;
    this.aircraftList_non_default[get_Current_Aircraft_id()-1].DailyHours = parseFloat(this.updateForm.value.new_DailyHours);
    this.aircraftList_non_default[get_Current_Aircraft_id()-1].CurrentHours = parseInt(this.updateForm.value.new_CurrentHours);
    // console.log("this.aircraftList: ", this.aircraftList);
    // API_POST_Update_DB(this.aircraftList);

    for (let p=0; p<this.aircraftList_non_default[get_Current_Aircraft_id()-1].Task.length; p++) {
      this.aircraftList_non_default[get_Current_Aircraft_id()-1].Task[p].NextDueDate = formatDate(calculate_NextDueDate(this.aircraftList_non_default[get_Current_Aircraft_id()-1].Task[p], this.aircraftList_non_default[get_Current_Aircraft_id()-1]));
    }
    
    // localStorage.setItem('db', JSON.stringify(aircraft));
    localStorage.setItem('db', JSON.stringify(this.aircraftList_non_default));
    window.location.reload();
  }

  @ViewChild('dropdown') dropdown!: ElementRef;
  selectedChoice='';
  dropdown_string = '';

  onSelected():void {
    this.selectedChoice = this.dropdown.nativeElement.value;
    // this.dropdown_string = this.selectedChoice;
    if(this.selectedChoice == null){
      console.log("null encountered")
      this.selectedChoice = get_Current_Aircraft_id();
    }
    localStorage.setItem("current_aircraft_id", this.selectedChoice);

    // this.isShown_Array = false;
    // this.isShown_Util = false;
    // this.isShown_SortedTasks = false;
    // this.isShown_ALL = false;

    // switch (localStorage.getItem("current_display")) {
    //   case "1": {this.isShown_Util = true; break;}
    //   case "2": {this.isShown_Array = true; break;}
    //   case "3": {this.isShown_SortedTasks = true; break;}
    //   case "4": {this.isShown_ALL = true; break;}
    //   default: {this.isShown_Util = true; break;}
    // }
    // window.location.reload();
  }

  btn_handler(event: any){
    // console.log("button was clicked on ", event.target.id);

    if(this.selectedChoice == ""){
      this.selectedChoice = "1";
    }
    // console.log("Current dropdown is: _", this.selectedChoice, "_");

    localStorage.setItem("current_aircraft_id", this.selectedChoice);
    localStorage.setItem("current_display", event.target.id);
    
    this.isShown_Array = false;
    this.isShown_Util = false;
    this.isShown_SortedTasks = false;
    this.isShown_ALL = false;

    switch (event.target.id) {
      case "1": {this.isShown_Util = true; break;}
      case "2": {this.isShown_Array = true; break;}
      case "3": {this.isShown_SortedTasks = true; break;}
      case "4": {this.isShown_ALL = true; break;}
      default: {this.isShown_Util = true; break;}
    }
    window.location.reload();
  }
}
