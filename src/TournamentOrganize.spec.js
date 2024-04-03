const TEST_DATA = require('../test/test-data');
const { prettyPrintMatches } = require("../test/test-util");
const Tournament = require('./Tournament.class')
const TournamentOrganize = require('./TournamentOrganize.class');

const tournament_1 = TEST_DATA.tournaments["t1"];

describe('TournamentOrganize', () => {

  it("can assign teams to groups", () => {
    const cat = 'Mens'
    const T = new Tournament(tournament_1)
    const TO = new TournamentOrganize(T)
    expect(T.categories[cat].groups.length).toBe(0)
    TO.assignTeamsToGroups(cat)
    expect(T.categories[cat].groups).not.toBeFalsy()
  })

  it("generates fixtures for all knockout stages", () => {
    const T = new Tournament(tournament_1)
    const TO = new TournamentOrganize(T)
    const matches = TO.generateKnockoutFixtures()
    prettyPrintMatches(matches);
    expect(T.fixtures.length).toBeGreaterThan(0)
  })

})

describe('End to end tournament organization', () => {

  it.only('completes the definition of a tournament from a minimal rules input', () => {
    const T = new Tournament(tournament_1);
    const TO = new TournamentOrganize(T);
    TO.generate();
    expect(true).toBe(true)
    // expect teams to be placed in groups
    // expect multiple fixtures
    // expect group fixtures to be set out
    // expect knockout fixtures to be calculated also
    // expect schedule to be set for all games
  })

})
