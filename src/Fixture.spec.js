const TEST_DATA = require('../test/test-data');

const Fixture = require("./Fixture.class");

const fixtures = TEST_DATA.fixtures.f1;
describe("Fixture", () => {
  it("Can create a next fixture given a prior fixture", () => {
    const F = new Fixture()
    const rowData = fixtures[0].slice(1)
    F.createAfter(rowData, {
      team1: 'Carrowroe',
      team2: 'Spiddal',
      umpireTeam: 'Inishgreen',
      group: 2
    })
    expect(F.startTime).toBe('11:10')
    expect(F.pitch).toBe(rowData[1]) 
    expect(F.team1).toBe('Carrowroe')
  })
})

