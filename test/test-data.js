module.exports = {
  tournaments: {
    t1: {
      tournamentId: 6,
      description: "Benelux round A",
      startDate: "2024-04-01",
      pitches: ["Pitch 5", "Pitch 11", "Pitch 12", "Pitch 13"],
      categories: {
        Mens: {
          groups: [
            [
              "Amsterdam A",
              "Groningen",
              "Leuven A",
              "Hamburg/Bel'B'",
              "Eindhoven",
            ],
            ["Luxembourg A", "Nijmegen", "Hague A", "Dusseldorf/Cologne"],
            ["Belgium A", "Leuven B", "Maastricht", "Frankfurt"],
          ],
          knockouts: {
            rules: {
              divisionOrder: ['cup', 'shield', 'plate'],
              selection: 
            },
            divisions: {
              cup: 4,
              shield: 4,
              plate: 5,
            },
          ],
        },
        Ladies: {
          groups: [
            [
              "Leuven A",
              "A'dam'B'/Leuven'B'",
              "Belgium A",
              "Groningen",
              "Nijmegen",
            ],
            [
              "Luxembourg A",
              "Hague/Frankfurt",
              "Hamb/Duss/Lux'B'",
              "Amsterdam A",
            ],
          ],
          knockouts: [
            {
              division: "cup",
              rank: 1,
              size: 4,
            },
            {
              division: "sheild",
              rank: 2,
              size: 5,
            }
          ],
        },
      },
      fixtures: [
        [
          1,
          "10:30",
          "Pitch 5",
          "group",
          "Mens",
          1,
          "Amsterdam A",
          "Leuven A",
          "Groningen",
          15,
        ],
        [
          2,
          "11:00",
          "Pitch 5",
          "group",
          "Mens",
          3,
          "Belgium B",
          "Leuven B",
          "Leuven A",
          20,
        ],
        [
          3,
          "11:30",
          "Pitch 5",
          "group",
          "Mens",
          1,
          "Leuven A",
          "Groningen",
          "Belgium A",
          15,
        ],
      ],
    },
  },
};
