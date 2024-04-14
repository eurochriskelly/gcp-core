"use strict";
/**
 * orignal function to calculate group stage fixtures
 * without using a Berger Table. Likely to be removed.
 */
const calculateGroupStageFixtures1 = (category, groups, slack = [10, 10, 10, 10, 10, 10, 10]) => {
    let matches = [];
    groups.map((teams, i) => {
        const group = i;
        const groupMatches = [];
        const groupSize = teams.length;
        let offset = 0;
        let allottedTime = slack[groupSize];
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                groupMatches.push({
                    matchId: 0,
                    category,
                    offset,
                    group,
                    stage: 'group',
                    team1: teams[i],
                    team2: teams[j],
                    allottedTime,
                });
                offset += allottedTime;
            }
        }
        console.table(groupMatches);
        matches = [...matches, ...groupMatches];
    });
    return matches;
};
