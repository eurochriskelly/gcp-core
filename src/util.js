const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const assignTeamsToGroups = (teams, shuffle = false) => {
  const distributeEntries = (list, numArrays) => {
    const arrays = Array.from({ length: numArrays }, () => []);
    list.forEach((entry, index) => {
      const arrayIndex = index % numArrays;
      arrays[arrayIndex].push(entry);
    });
    return arrays;
  };

  let numTeams = teams.length;
  let numGroups = 1;
  if (numTeams >= 24) {
    numGroups = 8;
  } else {
    if (numTeams >= 11) {
      numGroups = 4;
    } else {
      if (numTeams >= 6) {
        numGroups = 2;
      }
    }
  }
  // Now deal the teams into groups.
  return distributeEntries(
    shuffle ? shuffleArray(teams) : teams,
    numGroups
  );
};

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

const addMinutes = (time, minsToAdd) => {
  const [hours, minutes] = time.split(":").map(Number);
  let newMinutes = minutes + minsToAdd;
  let newHours = hours + Math.floor(newMinutes / 60);
  newMinutes %= 60;
  newHours %= 24; // Reset to 0 if it goes to 24

  // Zero padding
  const formattedHours = newHours.toString().padStart(2, "0");
  const formattedMinutes = newMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

module.exports = {
  calculateNextGameStartTime,
  addMinutes,
  assignTeamsToGroups,
};
