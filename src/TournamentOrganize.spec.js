const TEST_DATA = require('../test/test-data');
const Tournament = require('./Tournament.class')
const TournamentOrganize = require('./TournamentOrganize.class');

const tournament_1 = TEST_DATA.tournaments["t1"];

describe('TournamentOrganize', () => {
  it.skip("can assign teams to groups", () => {
    const cat = 'Mens'
    const T = new Tournament(tournament_1)
    const TO = new TournamentOrganize(T)
    expect(T.categories[cat].groups).toBeFalsy()
    TO.assignTeamsToGroups(cat)
    expect(T.categories[cat].groups).not.toBeFalsy()
  })
  
  it('Can schedule group fixtures', () => {
    const T = new Tournament(tournament_1)
    const TO = new TournamentOrganize(T);
    T.clearFixtures();
    // T.updateGroups();
    expect(T.schedule.length).toBe(0);
    const cat = 'Mens';
    TO.assignTeamsToGroups(cat);
    const matches = TO.calculateGroupStageFixtures(cat);
    console.table(matches)
  })
})

describe('End to end tournament organization', () => {
  it('completes the definition of a tournament from a minimal rules input', () => {
    const T = new Tournament(tournament_1);
    const TO = new TournamentOrganize(T);
    TO.generate();
    // expect teams to be placed in groups
    // expect multiple fixtures
    // expect group fixtures to be set out
    // expect knockout fixtures to be calculated also
    // expect schedule to be set for all games
  })
})
