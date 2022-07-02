//method to get the string formatted into time
function getTimeFromString(timeString) {
  let date = new Date(timeString);
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

function checkIfBetweenPeak(
  current,
  peekStart = "9:00:00",
  peekEnd = "22:59:59"
) {
  let current_time = current.toTimeString().split(" ")[0];
  let current_hour = current_time.split(":")[0];
  let result = false;

  if (
    parseInt(current_hour) >= parseInt(peekStart.split(":")[0]) &&
    parseInt(current_hour) <= parseInt(peekEnd.split(":")[0])
  )
    result = true;
  return result;
}

//method to calculate the bill
function calculateMobileBill(StartTime, EndTime) {
  let Date_startTime = new Date(StartTime);
  let total_duration = (new Date(EndTime) - new Date(StartTime)) / 1000;
  let total_bill = 0;

  while (true) {
    if (total_duration < 20) {
      total_duration = total_duration + 1;
      console.log(
        `${formatDate(Date_startTime)} + ${total_duration} second (${formatDate(
          new Date(Date_startTime.setSeconds(Date_startTime.getSeconds() + 20))
        )}) = ${checkIfBetweenPeak(Date_startTime) ? "30" : "20"} paisa`
      );
      total_bill = total_bill + (checkIfBetweenPeak(Date_startTime) ? 30 : 20);
      break;
    }

    console.log(
      `${formatDate(Date_startTime)} + 20 second (${formatDate(
        new Date(Date_startTime.setSeconds(Date_startTime.getSeconds() + 20))
      )}) = ${checkIfBetweenPeak(Date_startTime) ? "30" : "20"} paisa`
    );
    total_bill = total_bill + (checkIfBetweenPeak(Date_startTime) ? 30 : 20);
    Date_startTime.setSeconds(Date_startTime.getSeconds() + 1);
    total_duration = total_duration - 21;
  }
  return total_bill;
}

function main() {
  //To run it in a browser window, please uncomment the next two lines and comment out the hardcoded values

  //   let StartTime = prompt("Start Time: ");
  //   let EndTime = prompt("End Time: ");

  let StartTime = "2019-08-31 08:59:13 am";
  let EndTime = "2019-08-31 09:00:39 am";

  console.log(`${calculateMobileBill(StartTime, EndTime) / 100} taka`);
}

main();
