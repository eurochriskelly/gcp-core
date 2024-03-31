/**
 * This class takes care of organizing a Tournament
 * It's duties include:
 * - Adding fixtures for the group stage
 * - Swapping teams around to even up groups
 * - Swapping teams around to better fit travel schedule for teams
 * - Calculating fixtures for the knockout stage for each cup in tournament
 * - Scheduling the tournament
 */
const { assignTeamsToGroups } = require('./util')

class TournamentOrganize {
  constructor(T) {
    this.tournament = T
  }
  
  assignTeamsToGroups(category) {
    const T = this.tournament
    T.assertCategory(category);
    const { teams } = T.categories[category];
    T.categories[category].groups = assignTeamsToGroups(teams)
  }
  // Who plays who in the group stage
  calculateGroupStageFixtures() {

  }
  // Figure out who can play who and when
  scheduleGroupStageFixtures() {

  }
  calculateKnockoutFixtures(cup) {

  }
}

module.exports = TournamentOrganize;
