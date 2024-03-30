const Tournament = require('./Tournament.class');

describe('Tournament', () => {
    const tournament_1 = TEST_DATA().tournaments['t1']
    it('can load a tournament and export as is', () => {
        const T = new Tournament()
        T.load(tournament_1)
        const tdata = T.data
        console.log(T.data)
    })
    it('can add a new cateogry', () => {
        const T = new Tournament()
        T.load(tournament_1)
        T.addCategory('Mixed')
        const tdata = T.data
        

    })
    it('can swap teams', () => {

    })
    it('throws errors if teams, categories or groups do not exist', () => {

    })
})


/// ---------------------------- ///
/// Helper functions to be hoisted
function TEST_DATA() {
    return {
        tournaments: {
            t1: {
                tournamentId: 6,
                description: "Benelux round A",
                startDate: "2024-04-01",
                pitches: ["Pitch 5", "Pitch 11", "Pitch 12", "Pitch 13"],
                categories: {
                    Mens: {
                        g1: ["Amsterdam A", "Groningen", "Leuven A", "Hamburg/Bel'B'", "Eindhoven"],
                        g2: ["Luxembourg A", "Nijmegen", "Hague A", "Dusseldorf/Cologne"],
                        g3: ["Belgium A", "Leuven B", "Maastricht", "Frankfurt"]
                    },
                    Ladies: {
                        g1: ["Leuven A", "A'dam'B'/Leuven'B'", "Belgium A", "Groningen", "Nijmegen"],
                        g2: ["Luxembourg A", "Hague/Frankfurt", "Hamb/Duss/Lux'B'", "Amsterdam A"]
                    },
                },
                schedule: {
                    headings: ["startTime", "pitch", "stage", "category", "group", "Team1", "Team2", "UmpireTeam", "Duration"],
                    fixtures: [
                        ["10:30", "Pitch 5", "group", "Mens", "g1", "Amsterdam A", "Leuven A", "Groningen", 15],
                        ["11:00", "Pitch 5", "group", "Mens", "g3", "Belgium B", "Leuven B", "Leuven A", 20],
                        ["11:30", "Pitch 5", "group", "Mens", "g1", "Leuven A", "Groningen", "Belgium A", 15],
                    ]
                }
            },
        }
    }
}
