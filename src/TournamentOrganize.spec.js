const TEST_DATA = require('../test/test-data');
const Tournament = require('./Tournament.class')
const TournamentOrganize = require('./TournamentOrganize.class');

const tournament_1 = TEST_DATA.tournaments["t1"];

describe('TournamentOrganize', () => {
  it("can assign teams to groups", () => {
    const cat = 'Mens'
    const T = new Tournament(tournament_1)
    const TO = new TournamentOrganize(T)
    expect(T.categories[cat].groups).toBeFalsy()
    TO.assignTeamsToGroups(cat)
    expect(T.categories[cat].groups).not.toBeFalsy()
  })
  
  it('Can schedule group fixtures', () => {
    const T = new Tournament(tournament_1)
    const O = new TournamentOrganize(T);
    T.clearFixtures();
    // T.updateGroups();
  })
})
