"use strict";
const Tournament = require("./Tournament.class");
const PitchAllocator = require("./PitchAllocator.class");
const { fixtures, tournaments } = require("../test/test-data");
describe("PitchAllocator", () => {
    it("can allocate pitches to games in a group stage for a given category", () => {
        const T = new Tournament(tournaments.t1);
        T.clearActivities();
        T.fixturesAppend(fixtures.f4);
        const PA = new PitchAllocator(T);
        PA.allocate("Mens");
        PA.allocate("Ladies");
        T.prettyPrintActivities((f) => f.pitch === "Pitch 1");
        T.prettyPrintActivities((f) => f.pitch === "Pitch 4");
    });
});
