class Tournament {
  constructor(tdata) {
    this.tournamentId = 0;
    this.description = "New tournament";
    this.startDate = new Date();
    this.pitches = new Set();
    this.categories = [];
    this.fixtures = [];
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
  get bracketNames() {
    // get bracket names for each category
    return this.categoryNames
      .map(cat => [cat, Object.keys(this.categories[cat].rules.elimination.brackets)])
      .reduce((acc, [cat, brackets]) => {
        acc[cat] = brackets;
        return acc;
      }, {});
  }
  get groupSizes() {
    // get group sizes for each category
    return this.categoryNames
      .map(cat => [cat, this.categories[cat].groups.map(g => g.length)])
      .reduce((acc, [cat, sizes]) => {
        acc[cat] = sizes;
        return acc;
      }, {})
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
    this.fixtures = []
  }
  addFixture(
    time,
    pitch,
    bracket,
    stage,
    category,
    group,
    letter1 = '',
    team1,
    letter2 = '',
    team2,
    umpireTeam,
    duration,
  ) {
    this.fixtures.push([
      time,
      pitch,
      bracket,
      stage,
      category,
      group,
      letter1,
      team1,
      letter2,
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
      fixtures,
    } = tdata;
    this.tournamentId = tournamentId;
    this.description = description;
    this.startDate = startDate;
    this.pitches = new Set(pitches);
    this.categories = categories;
    this.fixtures = fixtures;
  }
  updateLetters() {
    // Update the letters for each fixture
    this.fixtures.forEach((f, i) => {
      const { team1, team2, category } = f;
      const index1 = this.categories[category].teams.indexOf(team1);
      const index2 = this.categories[category].teams.indexOf(team2);
      let l = String.fromCharCode(65 + index1);
      if (l !== '@') f.letter1 = l
      l = String.fromCharCode(65 + index2);
      if (l !== '@') f.letter2 = l
    });
  }
  // OUTPUT
  prettyPrintFixtures(filter = () => true) {
    console.table(this.fixtures
      .filter(filter)
      .map(m => {
        const strteam = t => {
          const { type, stage, group, position } = t;
          if (type === 'calculated') {
            return `~${stage}:${group}/p:${position}`
          } else {
            return t
          }
        }
        return {
          ...m,
          team1: strteam(m.team1),
          team2: strteam(m.team2),
        }
      }))
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
