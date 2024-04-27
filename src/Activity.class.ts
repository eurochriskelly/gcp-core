import { IFixProps, IFixture } from "../types";

class Activity {
  ref: number;
  type: string;
  scheduledTime: string | null;
  pitch: string;
  allottedTime: number;

  static reference = 100;
  constructor(type: string) {
    this.ref = Activity.reference++;
    this.type = type;
    this.scheduledTime = null;
    this.pitch = "";
    this.allottedTime = 0;
  }
  // provide a representation of the activity
  get repr(): string {
    return JSON.stringify({
      type: this.type,
      scheduledTime: this.scheduledTime,
      pitch: this.pitch,
      allottedTime: this.allottedTime,
    });
  }
}

export class Break extends Activity {
  reasonCode: number;
  note: string;
  constructor() {
    super('break');
    this.reasonCode = 0;
    this.note = ''
  }
  set reason(info: any) {
    const [code, note] = info;
    // provide a reason for the break
    this.reasonCode = code;
    this.note = note;
  }
}

export class Fixture extends Activity implements IFixture {
  matchId: number;
  scheduledTime: string; // Renamed from startTime
  pitch: string;
  bracket: string;
  category: string;
  stage: string;
  position: number;
  time: { // New structure for handling time-related details
    halfDuration: number;
    breakDuration: number;
    minRest: number;
    allotted: number;
  };
  team1: string;
  letter1?: string | undefined;
  score1: { goals: number | null; points: number | null; }; // New structure for team1 score
  team2: string;
  letter2?: string | undefined;
  score2: { goals: number | null; points: number | null; }; // New structure for team2 score
  umpireTeam?: string; // can be optional at first

  constructor(rowData: IFixProps) {
    super('fixture');
    this.matchId = 0;
    this.scheduledTime = '';
    this.pitch = '';
    this.stage = '';
    this.bracket = '';
    this.category = '';
    this.position = 0;
    this.team1 = '';
    this.letter1 = '';
    this.team2 = '';
    this.letter2 = '';
    this.umpireTeam = '';
    this.time = {
      halfDuration: 0,
      breakDuration: 0,
      minRest: 0,
      allotted: 0
    };
    this.score1 = { goals: null, points: null };
    this.score2 = { goals: null, points: null };

    if (Object.keys(rowData).length) {
      this.data = rowData;
    }
  }

  set data(rowData: any) {
    const {
      matchId,
      scheduledTime,
      pitch,
      stage,
      category,
      bracket,
      position,
      team1,
      team2,
      umpireTeam,
      halfDuration,
      breakDuration,
      minRest,
      allotted,
    } = rowData;

    this.matchId = matchId;
    this.scheduledTime = scheduledTime;
    this.pitch = pitch;
    this.stage = stage;
    this.category = category;
    this.bracket = bracket;
    this.position = position;
    this.team1 = team1;
    this.team2 = team2;
    this.umpireTeam = umpireTeam;
    this.time = {
      halfDuration,
      breakDuration,
      minRest,
      allotted
    };
    this.score1 = { goals: null, points: null };
    this.score2 = { goals: null, points: null };
  }

  get repr(): string {
    return JSON.stringify({
      matchId: this.matchId,
      scheduledTime: this.scheduledTime,
      pitch: this.pitch,
      category: this.category,
      stage: this.stage,
      position: this.position,
      time: this.time,
      team1: this.team1,
      score1: this.score1,
      team2: this.team2,
      score2: this.score2,
      umpireTeam: this.umpireTeam,
    });
  }
}
