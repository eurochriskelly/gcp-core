module.exports = {
  tournaments: {
    t1: {
      tournamentId: 6,
      description: "Benelux round A",
      rules: {
        points: {
          positional: [25, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1], 
          participation: 2, // automatically receive 2 points for participating
        },
        stages: {
          preliminary: {
            match: {
              win: 3,
              draw: 1,
              loss: 0,
            },
          },
          elimination: {},
        }
      },
      location: {
        city: "Amsterdam",
        address: "",
        coordinates: [
          {
            latitude: 54,
            longitude: 4,
          },
        ],
      },
      startDate: "2024-04-01",
      pitches: [
        {
          name: "Pitch 5",
          available: {
            from: "10:00",
            until: "19:00",
          },
        },
        {
          name: "Pitch 11",
        },
        {
          name: "Pitch 12",
        },
        {
          name: "Pitch 13",
        },
      ],
      categories: {
        Mens: {
          teams: [
            "Amsterdam A",
            "Luxembourg A",
            "Belgium A",
            "Groningen",
            "Leuven A",
            "Hamburg/Bel'B'",
            "Eindhoven",
            "Nijmegen",
            "Hague A",
            "Dusseldorf/Cologne",
            "Leuven B",
            "Maastricht",
            "Frankfurt",
          ],
          rules: {
            preliminary: {},
            elimination: {
              brackets: {
                cup: 4,
                shield: 4,
                plate: 8,  
              }
            },
          },
          groups: [],
          fixtures: []
        },
        Ladies: {
          teams: [
            "Leuven A",
            "A'dam'B'/Leuven'B'",
            "Belgium A",
            "Groningen",
            "Nijmegen",
            "Luxembourg A",
            "Hague/Frankfurt",
            "Hamb/Duss/Lux'B'",
            "Amsterdam A",
          ],
          rules: {
            preliminary: {},
            elimination: {
              brackets: {
                cup: 4,
                shield: 8,
              }
            },
          },
          groups: [],
          fixtures: [],
        },
      },
      fixtures: [],
    },
  },
};

const fixtures = [
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
];

// in progress
const fixturesNew = [
  {
    matchId: 1,
    startTime: "10:30",
    pitch: "Pitch 5",
    stage: "group",
    group: {
      type: 'preliminary',
      stage: 'semis',
      name: 'Group A' // 
    },
    category: "Mens",
    bracket: null,
    group: 1,
    team1: {
      type: 'predefined',
      name: "Amsterdam A", 
      goals: null,
      points: null,
    },
    team2: {
      type: 'predefined',
      name: "Leuven A",
      goals: null,
      points: null,
    },
    umpirTeam: "Groningen",
    allottedTime: 15,
  },
  {
    matchId: 12,
    startTime: "15:00",
    pitch: "Pitch 5",
    stage: "semis",
    group: {
      type: 'preliminary',
      stage: 'semis',
      name: 'Group A' // 
    },
    category: "Mens",
  }
  
]