const calculateNextGameStartTime = (
  start = "10:00",
  halfDuration = 12,
  breakDuration = 5,
) => {
  // Parse the start time into hours and minutes
  let [hours, minutes] = start.split(":").map((num) => parseInt(num, 10));

  // Add the break twice (for the referree!)
  const totalDuration = 2 * (halfDuration + breakDuration);

  // Add the total game duration to the start time
  minutes += totalDuration;

  // Round up to the next 5 minute interval if necessary
  if (minutes % 5 !== 0) {
    minutes += 5 - (minutes % 5);
  }

  // Convert minutes back into hours and minutes
  hours += Math.floor(minutes / 60);
  minutes %= 60;

  // Format hours and minutes to "HH:MM"
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Return the new time
  return `${formattedHours}:${formattedMinutes}`;
};

module.exports = {
  calculateNextGameStartTime,
};
