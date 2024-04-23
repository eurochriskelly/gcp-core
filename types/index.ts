export interface IRules {

}

export interface IPitch {
  name: string;
  availability: {
    from: Date;
    until: Date;
  }
}

export interface ITournament {
    tournamentId: number,
    description: string,
    startDate: string,
    groups: string[]
    pitches: IPitch[];
}

export interface IFixture {
  matchId: number;
  scheduledTime: string;
  pitch: string;
  category: string;
  stage: string;
  position: number;
  time: {
    halfDuration: number;
    breakDuration: number;
    minRest: number;
    allotted: number;
  },
  team1: string;
  score1: {
    goals: number | null;
    points: number | null;
  },
  team2: string;
  score2: {
    goals: number | null;
    points: number | null;
  }
  umpireTeam?: string;
}
