let createEmployeeRecord = function(row){
   return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
   }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map((row) => createEmployeeRecord(row))
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find((e) => e.date === soughtDate);

    let outEvent = employee.timeOutEvents.find((e) => e.date === soughtDate);

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map((e) => e.date)

    let payable = eligibleDates.reduce((memo, d) => (memo + wagesEarnedOnDate(employee, d)), 0)

    return payable
} 

let findEmployeeByFirstName = ((srcArray, firstName) => 
    (srcArray.find((rec) => rec.firstName === firstName))
)

let calculatePayroll = ((arrayOfEmployeeRecords) =>
    (arrayOfEmployeeRecords.reduce(((memo, rec) => memo + allWagesFor(rec)), 0))
)