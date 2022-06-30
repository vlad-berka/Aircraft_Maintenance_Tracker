export function processData(num: number): void {
    console.log("Data processed", num);
}

export function displayJsonFile(aircraft: any): void {
    console.log(aircraft[0].Task[0]);
    aircraft[0].Task[0].new_Task = "jingle";
    processData(2);
}

export function updateObject(aircraft: any): void {
    aircraft[0].Task[0].new_Task = "jingle BUT NEW";
    console.log(aircraft[0].Task[0]);
    processData(3);
    // return aircraft;
}

export function NextDueDate(LogDate: Date, IntervalMonths: number) {
    if(LogDate == null || IntervalMonths == null) {
        console.log("One of the variables is null");
        return null;
    }
    else {
        return null;
    }
}