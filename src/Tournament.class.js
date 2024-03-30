/*
Sample tournament object (in yaml)

    tournamentId: 6
    description: "Benelux round A"
    startDate: "2024-04-01"
    pitches: ["Pitch 5", "Pitch 11", "Pitch 12", "Pitch 13"] 
    categories:
    Mens:
        g1: ["Amsterdam A", "Groningen", "Leuven A", "Hamburg/Bel'B'", "Eindhoven"]
        g2: ["Luxembourg A", "Nijmegen", "Hague A", "Dusseldorf/Cologne"]
        g3: ["Belgium A", "Leuven B", "Maastricht", "Frankfurt"]
    Ladies:
        g1: ["Leuven A", "A'dam'B'/Leuven'B'", "Belgium A", "Groningen", "Nijmegen"]
        g2: ["Luxembourg A", "Hague/Frankfurt","Hamb/Duss/Lux'B'","Amsterdam A"]
    schedule:
    headings: ["startTime", "pitch", "stage", "category", "group", "Team1", "Team2", "UmpireTeam", "Duration"]
    fixtures:
        - ["10:30", "Pitch 5", "group", "Mens", "g1", "Amsterdam A", "Leuven A", "Groningen", 15]
        - ["11:00", "Pitch 5", "group", "Mens", "g3", "Belgium B", "Leuven B", "Leuven A", 20]
        - ["11:30", "Pitch 5", "group", "Mens", "g1", "Leuven A", "Groningen", "Belgium A", 15]
*/

class Tournament {
  constructor() {
    this.tournamentId = 0;
    this.description = "New tournament";
    this.startDate = new Date();
    this.pitches = new Set();
    this.categories = [];
    this.schedule = [];
  }
  get data() {
    const data = {
      isValid: false,
      ...this,
      // TODO: validate
    };
    data.isValid = true; // TODO: validateFixtures(data)
    return data;
  }
  get categoryNames() {
    return Object.keys(this.categories);
  }
  get categoryTeams() {
    return this.categoryNames.reduce((teams, name) => {
      teams[name] = Object.values(this.categories[name]).reduce(
        (p, n) => [...p, ...n],
        [],
      );
      return teams;
    }, {});
  }
  addPitch(pitch) {
    this.pitches.add(pitch);
  }
  removePitch(pitch) {
    this.pitches.delete(pitch);
  }
  addCategory(category) {
    this.categories[category] = {};
  }
  addTeam(teamName, category, group = 0) {
    // groups must be positive integers
    this.assertCategory(category, this.categoryNames);
    this.assertTeamIsNew(teamName, category);
    // If there are already 5 in the previous group,
    // start on new group
    if (!group) {
      const categoryGroups = this.categories[category];
      const lastGroupKey = Object.keys(categoryGroups).pop();
      const lastGroup = this.categories[category][lastGroupKey];
      if (lastGroup.length >= 5) {
        const numGroups = Object.keys(categoryGroups).length;
        this.categories[category][`g${numGroups + 1}`] = [teamName];
      } else {
        const existingTeams = this.categories[category][lastGroupKey] || []
        this.categories[category][lastGroupKey] = [
          ...existingTeams,
          teamName,
        ];
      }
    } else {
      // if group number was provided, place the team in that group
      // if the team does not already exist in the category
      this.assertGroup(group, category);
      const groupName = `g${group}`;
      this.categories[category][groupName].push(teamName);
    }
  }
  swapTeams(team1, team2, category) {
    this.assertCategory(category);
    this.assertTeam(team1, category);
    this.assertTeam(team2, category);
    // Find which group team1 is in and replace with team2
    // Find which group team2 is in and replace with team1
    // Swap all instances of team1 with team2 in fixtures of this cateogry\
    // Swap all instances of team2 with team1 in fixtures of this category
  }
  addFixture(
    time,
    pitch,
    stage,
    category,
    group,
    team1,
    team2,
    umpireTeam,
    duration,
  ) {
    this.schedules.push([
      time,
      pitch,
      stage,
      category,
      group,
      team1,
      team2,
      umpireTeam,
      duration,
    ]);
  }
  load(tdata) {
    const {
      tournamentId,
      description,
      startDate,
      pitches,
      categories,
      schedule,
    } = tdata;
    this.tournamentId = tournamentId;
    this.description = description;
    this.startDate = startDate;
    this.pitches = new Set(pitches);
    this.categories = categories;
    this.schedule = schedule;
  }
  // ASSERTIONS
  assertCategory(cat) {
    if (!this.categoryNames.includes(cat)) {
      throw new Error(`Bad category [${cat}]`);
    }
  }
  assertTeamExists(teamName, category) {
    if (!this.categoryTeams[category].includes(teamName)) {
      throw new Error(
        `Team [${teamName}] dows not exist in category [${category}]`,
      );
    }
  }
  assertTeamIsNew(teamName, category) {
    if (this.categoryTeams[category].includes(teamName)) {
      throw new Error(
        `Team [${teamName}] already exists in category [${category}]`,
      );
    }
  }
  assertGroup(groupNumber, category) {
    const groupName = `g${groupNumber}`;
    const categoryGroups = this.categories[category];
    if (!(groupName in categoryGroups)) {
      throw new Error(
        `Group g${groupName} does not exist in category [${category}]`,
      );
    }
  }
}

module.exports = Tournament;
