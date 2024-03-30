const TEST_DATA = require('../test/test-data');

const Tournament = require("./Tournament.class");

const tournament_1 = TEST_DATA.tournaments["t1"];

describe("Tournament", () => {
  it("can load a tournament and export as is", () => {
    const T = new Tournament();
    T.load(tournament_1);
    const tdata = T.data;
    expect(tdata.isValid).toBe(true);
  });
  it("can add a new cateogry", () => {
    const T = new Tournament();
    const numCatsBefore = Object.keys(tournament_1.categories).length;
    T.load(tournament_1);
    T.addCategory("Mixed");
    const tdata = T.data;
    const numCatsAfter = Object.keys(tdata.categories).length;
    expect(numCatsAfter).toBeGreaterThan(numCatsBefore);
  });
  it("can add new teams", () => {
    const T = new Tournament();
    T.load(tournament_1);
    const numTeams1 = T.categoryTeams['Mens'].length
    expect(T.categories.Mens.g3.length).toBe(4)
    T.addTeam('Foo', 'Mens')
    T.addTeam('Bar', 'Mens')
    T.addTeam('Baz', 'Mens')
    const numTeams2 = T.categoryTeams['Mens'].length
    expect(numTeams2).toBeGreaterThan(numTeams1)
    expect(numTeams2).toBe(numTeams1 + 3)
    expect(T.categories.Mens.g3.length).toBe(5)
    expect(T.categories.Mens.g4.length).toBe(2)
  });
  it("can swap teams", () => {});
  it("throws errors if teams, categories or groups do not exist", () => {});
});

