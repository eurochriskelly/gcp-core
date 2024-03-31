class Tournament {
  constructor(tdata) {
    this.tournamentId = 0;
    this.description = "New tournament";
    this.startDate = new Date();
    this.pitches = new Set();
    this.categories = [];
    this.schedule = [];
    if (tdata) {
      this.load(tdata)
    }
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
    this.categories[category].teams.push(teamName)
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
  clearFixtures() {
    this.schedule = []
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
    const names = this.categoryNames;
    if (!names.includes(cat)) {
      throw new Error(`Bad category [${cat}]. Possible categories include [${names.join(',')}]`);
    }
  }
  assertTeamExists(teamName, category) {
    if (!this.categories[category].teams.includes(teamName)) {
      throw new Error(
        `Team [${teamName}] dows not exist in category [${category}]`,
      );
    }
  }
  assertTeamIsNew(teamName, category) {
    if (this.categories[category].teams.includes(teamName)) {
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
