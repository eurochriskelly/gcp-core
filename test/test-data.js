module.exports = {
  tournaments: {
    t1: {
      tournamentId: 6,
      description: "Benelux round A",
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
          brackets: {
            rules: {},
            groups: {},
            knockouts: {},
          },
          knockouts: {
            rules: {
              divisionOrder: ["cup", "shield", "plate"],
              selection: "default",
            },
            divisions: {
              cup: 4,
              shield: 4,
              plate: 5,
            },
          },
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
          knockouts: [
            {
              division: "cup",
              rank: 1,
              size: 4,
            },
            {
              division: "shield",
              rank: 2,
              size: 5,
            },
          ],
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