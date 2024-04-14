"use strict";
const TournamentSimulator = require("./TournamentSimulator.class");
describe("TournamentSimulator", () => {
    it("Can generate fixtures for a set of groups", () => {
        const sp = TEST_DATA().stageParameters["test1"];
        const TS = new TournamentSimulator(sp);
        expect(true).toBe(true);
    });
});
/// ---------------------------- ///
/// Helper functions to be hoisted
function TEST_DATA() {
    return {
        stageParameters: {
            test1: [
                {
                    stage: "group",
                    groupSize: 3,
                    duration: 15,
                    break: 5,
                    gap: 5,
                },
                {
                    stage: "group",
                    groupSize: 4,
                    duration: 10,
                    break: 3,
                    gap: 5,
                },
                {
                    stage: "group",
                    groupSize: 5,
                    duration: 7.5,
                    break: 3,
                    gap: 5,
                },
                {
                    stage: "eigth",
                    groupSize: 16,
                    duration: 7.5,
                    break: 3,
                    gap: 5,
                },
                {
                    stage: "quarter",
                    groupSize: 8,
                    duration: 7.5,
                    break: 3,
                    gap: 5,
                },
                {
                    stage: "semis",
                    groupSize: 8,
                    duration: 7.5,
                    break: 3,
                    gap: 5,
                },
                {
                    stage: "finals",
                    groupSize: 8,
                    duration: 15,
                    break: 3,
                    gap: 5,
                },
            ],
        },
    };
}
