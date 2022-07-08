import { min } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import * as aircraft from './aircraft_data.json';


export function bulk_calc_NextDueDate(DB: any): any {
    console.log("Starting bulk create on next due date");
    console.log("DB is: ", DB);

    //for each aircraft, i = aircraft ID. DB[i] is all data tied to 1 aircraft
    for (let i=0; i < DB.length; i++) {
        //for each task in an aircraft
        for (let j=0; j< DB[i].Task.length; j++) {
            // calculate_NextDueDate()
            DB[i].Task[j].NextDueDate = formatDate(calculate_NextDueDate(DB[i].Task[j], DB[i]));
            // console.log(DB[i].Task[j].NextDueDate);
        }
    }
    // console.log("DB post processing is: ", DB);
    localStorage.setItem("db", JSON.stringify(DB));
}

export function calculate_NextDueDate(TaskArray_in: any, Utilizations: any):any {
    console.log("TaskArray", TaskArray_in, "Utilizations", Utilizations);
    var TaskArray = TaskArray_in;
    var today = new Date(2018, 5, 19);
    var IntervalMonthsNextDueDate;
    var DaysRemainingByHoursInterval;
    var IntervalHoursNextDueDate = null;

    if(TaskArray.LogDate == null || TaskArray.IntervalMonths == null) {
        // console.log("One of the variables is null, so IntervalMonthsNextDueDate is Null");
        IntervalMonthsNextDueDate = null;
    }
    else {
        let newLogDate = new Date(TaskArray.LogDate);
        IntervalMonthsNextDueDate = new Date(newLogDate.setMonth(newLogDate.getMonth() + TaskArray.IntervalMonths));
        // console.log(`IntervalMonthsNextDueDate = ${TaskArray.LogDate} + ${TaskArray.IntervalMonths}`);
        // console.log(`IntervalMonthsNextDueDate is: ${IntervalMonthsNextDueDate}`);
    }

    DaysRemainingByHoursInterval = ((TaskArray.LogHours + TaskArray.IntervalHours) - Utilizations.CurrentHours)/Utilizations.DailyHours;
    // console.log(`DaysRemainingByHoursInterval = ((${TaskArray.LogHours} + ${TaskArray.IntervalHours}) - ${Utilizations.CurrentHours})/${Utilizations.DailyHours}`);
    // console.log(`DaysRemainingByHoursInterval is: ${DaysRemainingByHoursInterval}`);
    if(DaysRemainingByHoursInterval<0){
        // console.log("DaysRemainingByHoursInterval is less than 0, so set to null");
        DaysRemainingByHoursInterval=null;
    }

    if (DaysRemainingByHoursInterval == null) {
        // IntervalHoursNextDueDate = 500000;
    }
    else {
        IntervalHoursNextDueDate = new Date(today.setHours(today.getHours() + DaysRemainingByHoursInterval*24));
    }
    // IntervalHoursNextDueDate = new Date(today.setHours(today.getHours() + DaysRemainingByHoursInterval));
    // console.log(`IntervalHoursNextDueDate = new Date(today.setHours(${today.getHours()} +${DaysRemainingByHoursInterval}*24))`);
    // console.log(`IntervalHoursNextDueDate is: ${IntervalHoursNextDueDate}`);

    //Conditional Statements to determine next due date
    if (IntervalHoursNextDueDate == null) {
        if (IntervalMonthsNextDueDate == null) {
            return null;
        }
        else {
            return IntervalMonthsNextDueDate;
        }
    }
    else if (IntervalMonthsNextDueDate == null) {
        if (IntervalHoursNextDueDate == null) {
            return null;
        }
        else {
            return IntervalHoursNextDueDate;
        }
    }
    else {
        if (IntervalMonthsNextDueDate > IntervalHoursNextDueDate) {
            // console.log(`IntervalMonthsNextDueDate (${IntervalMonthsNextDueDate}) is greater than IntervalHoursNextDueDate (${IntervalHoursNextDueDate})`);
            return IntervalHoursNextDueDate;
        }
        else {
            // console.log(`IntervalHoursNextDueDate (${IntervalHoursNextDueDate}) is greater than IntervalMonthsNextDueDate (${IntervalMonthsNextDueDate})`);
            return IntervalMonthsNextDueDate;
        }
    }

}

export function sort_by_NextDueDate(TaskList: any) {
    var taskArrayDate = [];
    var taskArrayNum = [];

    // console.log(TaskList);

    //Extract the useful data, ItemNumber and the associated Date
    for (let i=0; i< TaskList.length; i++) {
        // console.log(TaskList[i].NextDueDate);
        taskArrayDate.push(TaskList[i].NextDueDate);
        taskArrayNum.push(TaskList[i].ItemNumber);
    }

    var sorted_taskArrayDate = [...taskArrayDate];
    var sorted_taskArrayNum = [...taskArrayNum];
    var temp = "";

    var sorted: boolean = false;
    //Bubble sort the date
    while (sorted!=true) {
        sorted = true;
        for (let j=0; j < sorted_taskArrayDate.length-1; j++) {
            if(new Date(sorted_taskArrayDate[j]) < new Date(sorted_taskArrayDate[j+1])) {
                // console.log(sorted_taskArrayDate[j], "<", sorted_taskArrayDate[j+1])
                sorted = false;
                temp = sorted_taskArrayDate[j];
                sorted_taskArrayDate[j] = sorted_taskArrayDate[j+1];
                sorted_taskArrayDate[j+1] = temp;
            }
        }
    }
    sorted_taskArrayDate.reverse();

    // console.log("sorted_taskArrayDate", sorted_taskArrayDate);

    // Sends all null values to the end of the array
    let checkCounter=0;
    for (let n=0; n< sorted_taskArrayDate.length; n++) {
        if(sorted_taskArrayDate[n]==null) {
            sorted_taskArrayDate.push(sorted_taskArrayDate.shift());
            n--;          
        }
        else {
            break;
        }
        if(checkCounter>sorted_taskArrayDate.length){
            break;
        }
        checkCounter++;
    }

    //Sort the ItemDateber based on the now sorted Date array, using indices of from the original array
    for(let k=0; k < sorted_taskArrayDate.length; k++) {
        let index_s:number = taskArrayDate.indexOf(sorted_taskArrayDate[k]);
        sorted_taskArrayNum[k] = taskArrayNum[index_s];
        // clears the value from the original array to eliminate the possibility of a repeat
        taskArrayDate[index_s] = "sorted";
    }

    //Prints in the console the sorted task array
    for (let m = 0; m < sorted_taskArrayDate.length; m ++) {
        console.log("Item Number: ", sorted_taskArrayNum[m], "NextDueDate:", sorted_taskArrayDate[m]);
    }

    var final_Object = [];

    //Converts the sorted values into an object
    for (let p=0; p < sorted_taskArrayDate.length; p++) {
        if(sorted_taskArrayDate[p]===null){
            final_Object.push({IN: sorted_taskArrayNum[p], NDD: `Null`});
        }
        else {
            final_Object.push({IN: sorted_taskArrayNum[p], NDD: sorted_taskArrayDate[p]});
        }
    }

    return final_Object;
}

export function formatDate(inDate: any) {
    // let formattedDate = (moment(inDate)).format('DD-MM-YYYY');
    // console.log("Formatted date is ", formattedDate);
    // return formattedDate;

    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(inDate, 'MM/dd/YYYY');
    // console.log("Formatted date is ", formattedDate);
    return formattedDate;
}

export function API_GET_TaskArray_by_AircraftID(i: number): any {
    i--;
    let wholeDB = JSON.parse(localStorage.getItem('db') || "")
    // var aircraftList:any = (aircraft as any).default;
    // console.log("API GET Request to return the array of objects: ", aircraftList[i].Task);
    // console.log("wholeDB[i]", wholeDB[i]);

    let util_array = [];
    util_array.push(wholeDB[i].DailyHours);
    util_array.push(wholeDB[i].CurrentHours);

    // Note, NextDueDate bulk created at main
    // calculate_NextDueDate(wholeDB[i].Task, wholeDB[i]);
    console.log("API called to GET Utilizations with Aircraft id: ", i+1);
    console.log("Utilization Array is: ", util_array);
    console.log("");
    console.log("API called to GET Tasks Array with Aircraft id: ", i+1);
    console.log("Tasks Array is: ", wholeDB[i].Task);
    console.log("");
    return wholeDB[i];
}

export function API_POST_Update_DB(db: any):void {
    var newDB: {[k: string]: any} = {};
    let keyString = "0";
    for (let i=0; i<db.length; i++) {
        console.log("db[i]: ", db[i]);
        keyString = i.toString();
        // newDB.assign(db[i]);
    }
    console.log("newDB: ", newDB);
    localStorage.setItem('db', JSON.stringify(newDB));
}

export function get_Current_Aircraft_id(): any {
    // console.log("Getting current_aircraft_id out of local storage: ", JSON.parse(localStorage.getItem('current_aircraft_id') || "id_not_found"));
    return JSON.parse(localStorage.getItem('current_aircraft_id') || "");
}

export function get_Current_Display(i: string): any {
    
    if (i == JSON.parse(localStorage.getItem('current_display') || "")) {
        return true
    }else {
        return false;
    }
}

export function API_GET_ALL():any {
    let object = JSON.parse(localStorage.getItem('db') || "");
    let newArray = [];
    for (let y=0; y<object.length; y++){
        newArray.push(object[y]);
    }
    return newArray;
}