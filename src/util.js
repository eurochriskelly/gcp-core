const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Given N teams, create M groups of teams.
 * Teams should be distributed as evenly as possible favouring
 * power of 2 numbers of groups.
 */
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


/**
 * Generate matches for each group by a applying a Berger Table
 * @returns
 */
const calculateGroupStageFixtures = (
  category, 
  groups,
  slack = [10, 10, 10, 10, 10, 10, 10],
  shuffle = false
) => {
  let matches = [];
  groups.forEach((teams, groupIndex) => {
    if (shuffle) {
      teams = shuffleArray(teams);
    }
    if (teams.length % 2 !== 0) {
      teams.push(null); // Add a dummy team to make team count even
    }
    const totalRounds = teams.length - 1;
    const matchesPerRound = teams.length / 2;
    let roundTeams = [...teams]; // Copy teams to rotate for rounds

    let groupMatches = []; // Initialize an array to hold matches for the current group

    for (let round = 0; round < totalRounds; round++) {
      for (let match = 0; match < matchesPerRound; match++) {
        const team1 = roundTeams[match];
        const team2 = roundTeams[roundTeams.length - match - 1];
        if (team1 !== null && team2 !== null) { // Skip the dummy team's "match"
          groupMatches.push({
            matchId: matches.length + 1, // Assuming unique IDs are desired
            category,
            offset: slack[teams.length - 2] * (round * matchesPerRound + match), // Example offset calculation
            group: groupIndex,
            stage: 'group',
            team1: team1,
            team2: team2,
            allottedTime: slack[teams.length - 2],
          });
        }
      }
      // Rotate teams for the next round, keeping the first team fixed
      roundTeams = [roundTeams[0], ...roundTeams.slice(-1), ...roundTeams.slice(1, -1)];
    }

    // :DBG: console.table(groupMatches); // Add this line to check the generated matches for each group
    matches = [...matches, ...groupMatches];
  });

  return matches;
}

module.exports = {
  calculateNextGameStartTime,
  calculateGroupStageFixtures,
  addMinutes,
  shuffleArray,
  assignTeamsToGroups,
};
