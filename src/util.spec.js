const { 
  calculateNextGameStartTime, 
  calculateGroupStageFixtures,
  assignTeamsToGroups 
} = require("./util");

describe("Useful utility functions", () => {
  it("can calculate time for upcoming matches", () => {
    var nextTime = "";
    nextTime = calculateNextGameStartTime("10:00", 10, 4);
    expect(nextTime).toBe("10:30");
    nextTime = calculateNextGameStartTime("12:45", 15, 6);
    expect(nextTime).toBe("13:30");
  });

  it("organizes the teams into a power of 2 number of groups", () => {
    const groups = [
      "Team 1",
      "Team 2",
      "Team 3",
      "Team 4",
      "Team 5",
      "Team 6",
      "Team 7",
      "Team 8",
      "Team 9",
      "Team 10",
      "Team 11",
      "Team 12",
      "Team 13",
      "Team 14",
      // exect 3 sub-groups of 3 teams and 2 sub-groups of 4 teams
    ];
    var result
    result = assignTeamsToGroups(groups);
    expect(result.length).toBe(4)
    expect(result[0].length).toBe(4)
    expect(result[1].length).toBe(4)
    expect(result[2].length).toBe(3)
    expect(result[3].length).toBe(3)
    // check with a smaller group, e.g. 6 teams 
    result = assignTeamsToGroups(groups.slice(0,6))
    expect(result.length).toBe(2)
    expect(result[0].length).toBe(3)
    expect(result[1].length).toBe(3)
  });


  it.only('maximizes rest time for teams in stage', () => {
    const slack = [0, 0, 60, 40, 25, 20, 15];
    const groups = [
      ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 11'],
      ['Team 5', 'Team 6', 'Team 7'],
      ['Team 8', 'Team 9', 'Team 10'],
    ]
    const matches = calculateGroupStageFixtures('Mens', groups, slack, false);
    console.table(matches.filter(m => m.group === 0))
    matches.forEach(match => {
      expect(match.allottedTime).toBeGreaterThanOrEqual(0)
    })
  })

  it('schedules group fixtures', () => {
    const cat = 'Mens';
    const groups = [
      ['Team 1', 'Team 2', 'Team 3', 'Team 4'],
      ['Team 5', 'Team 6', 'Team 7'],
      ['Team 8', 'Team 9', 'Team 10'],
      ['Team 11', 'Team 12', 'Team 13']
    ]
    const matches = calculateGroupStageFixtures(cat, groups, [0, 0, 60, 40, 25, 20, 15]);
    // how many matches were defined for this group?
    expect(matches.length).toBe(
      (1 + 2 + 3) + // A group of 4
      (1 + 2) +     // A group of 3
      (1 + 2) +     // A group of 3
      (1 + 2)       // A group of 3
    );
  })
});
