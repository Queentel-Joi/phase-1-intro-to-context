function createEmployeeRecord(recordArray) {
  return {
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create multiple employee records
function createEmployeeRecords(dataArrays) {
  return dataArrays.map(createEmployeeRecord);
}

// Add a TimeIn event
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
  return employee;
}

// Add a TimeOut event
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Calculate total wages for all dates
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}

// Calculate payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}

// Export functions for testing in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
}

