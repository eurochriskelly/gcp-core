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
