/**
 * This class takes care of organizing a Tournament
 * It's duties include:
 * - Adding fixtures for the group stage
 * - Swapping teams around to even up groups
 * - Swapping teams around to better fit travel schedule for teams
 * - Calculating fixtures for the knockout stage for each cup in tournament
 * - Scheduling the tournament
 */
const { assignTeamsToGroups, calculateGroupStageFixtures, calculateKnockoutStageFixtures } = require("./util");

class TournamentOrganize {
  constructor(T) {
    this.tournament = T;
    this.nextFixture = 1;
  }

  /**
   * Generate fixtures for the tournament by apply the following steps:
   * 1. [x] Assign teams to groups
   * 2. [x] Generate group stage fixtures (external function)
   * 3. [x] Order group stage fixtures
   * 4. [x] Generate knockout stage fixtures
   * 5. [ ] Order knockout stage fixtures
   * 6. [ ] Assign upmires to fixtures
   * 
   */
  generate() {
    this.nextFixture = 1;
    // Assign teams to groups 
    const T = this.tournament;
    T.clearFixtures();
    Object.keys(T.categories).forEach(cat => {
      this.assignTeamsToGroups(cat, true);
      T.fixtures = [
        ...T.fixtures, 
        // 2. Generate group stage fixtures
        ...calculateGroupStageFixtures(
          cat,
          T.categories[cat].groups,
          [0, 0, 60, 40, 25, 20, 15]
        )
      ]
    });

    this.orderGroupStageFixtures();
    Object.keys(T.categories).forEach(cat => {
      T.fixtures = [
        ...T.fixtures,
        ...this.generateKnockoutFixtures(cat),
      ]
    });

    T.prettyPrintFixtures({ 
      // category: 'Mens' 
    });
    // for each category in categories generate group fixtures
  }

  // 1. Assign teams to groups
  assignTeamsToGroups(category, randomize = false) {
    const T = this.tournament;
    const { teams } = T.categories[category];
    T.categories[category].groups = assignTeamsToGroups(teams, randomize);
  }

  generateKnockoutFixtures(cat) {
    const T = this.tournament;
    let matches = [];
    const { brackets } = T.categories[cat].rules.elimination;
    const elimSlack = [ 30, 35, 40, 45 ];
    const bracketCursor = 0;
    const bracketNames = Object.keys(brackets);
    console.log(bracketNames)
    bracketNames.forEach(bracket => {
      let bracketMatches = [];
      // determine the number of teams in the bracket
      const numTeams = brackets[bracket];
      const range = [bracketCursor, bracketCursor + numTeams - 1]
      const groupSizes = [4, 3, 3, 3]; // FIXME: get the right sizes
      const enhance = match => {
        const [stage, group] = match.stage.split(':')
        return {
          matchId: this.nextFixture++,
          ...match,
          stage, 
          group: group ? parseInt(group) : null, 
          bracket,
          category: cat,
          numTeams
        }
      }
      bracketMatches = calculateKnockoutStageFixtures(range, groupSizes, elimSlack).map(enhance)
      matches = [ ...matches, ...bracketMatches ]
    })
    return matches;
  }


  // 3. Generate group stage fixtures
  orderGroupStageFixtures() {
    // order by idealized order (i.e. if each schedule )\
    const T = this.tournament;
    T.fixtures = T.fixtures.sort((a, b) => {
      return a.offset > b.offset ? 1 : b.offset > a.offset ? -1 : 0;
    });
    T.fixtures.forEach(fixture => {
      fixture.matchId = this.nextFixture++;
    })
  }

}

module.exports = TournamentOrganize;
