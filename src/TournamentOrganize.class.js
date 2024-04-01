/**
 * This class takes care of organizing a Tournament
 * It's duties include:
 * - Adding fixtures for the group stage
 * - Swapping teams around to even up groups
 * - Swapping teams around to better fit travel schedule for teams
 * - Calculating fixtures for the knockout stage for each cup in tournament
 * - Scheduling the tournament
 */
const { assignTeamsToGroups } = require("./util");

class TournamentOrganize {
  constructor(T) {
    this.tournament = T;
    this.nextFixture = 1;
  }

  generate() {
    this.nextFixture = 1;
    // Assign teams to groups 
    // for each category in categories generate group fixtures
  }

  assignTeamsToGroups(category) {
    const T = this.tournament;
    const { teams } = T.categories[category];
    T.categories[category].groups = assignTeamsToGroups(teams);
  }

  /**
   * Generate matches for each group
   * @returns
   */
  calculateGroupStageFixtures(category) {
    const T = this.tournament;
    let matches = [];
    // Group teams by their group
    T.categories[category].groups.map((teams, i) => {
      const group = i;
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({
            matchId: this.nextFixture++,
            category,
            group,
            stage: 'group',
            team1: teams[i],
            team2: teams[j],
          });
        }
      }
    })
/*
    Object.keys(teamsByGroup).forEach((group) => {
      const groupTeams = teamsByGroup[group];
      let timeOffset = 0;
      let nextStart = "09:00";
      for (let i = 0; i < groupTeams.length; i++) {
        for (let j = i + 1; j < groupTeams.length; j++) {
          const d = this.stageParameters.find(
            (d) => d.groupSize === this.groupSizes[group],
          );
          const { duration = 0, break: breakDuration = 0, gap = 0 } = d || {};
          matches[group].push({
            offset: timeOffset,
            start: nextStart,
            team1: groupTeams[i],
            team2: groupTeams[j],
            time: {
              playing: duration * 2,
              gap: gap + breakDuration,
            },
          });
          const minWait =
            Math.round((duration * 2 + gap + breakDuration) / 5) * 5;
          timeOffset += minWait;
          nextStart = addMinutes(nextStart, minWait);
        }
      }
    });
*/
    return matches;
  }
  // Figure out who can play who and when
  scheduleGroupStageFixtures() {}
  calculateKnockoutFixtures(cup) {}
}

module.exports = TournamentOrganize;
