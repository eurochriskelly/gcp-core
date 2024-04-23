import { calculateNextGameStartTime } from "./util";

class Activity {
  ref: number;
  type: string;
  scheduledTime: string | null;
  pitch: string;
  allottedTime: number;

  static reference = 1000;
  constructor(type: string) {
    this.ref = Activity.reference++;
    this.type = type;
    this.scheduledTime = null;
    this.pitch = "";
    this.allottedTime = 0;
  }
  // provide a representation of the activity
  get repr() {
    return {
      type: this.type,
      scheduledTime: this.scheduledTime,
      pitch: this.pitch,
      allottedTime: this.allottedTime,
    };
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
  set reason(info: any){
    const [code, note] = info;
    // provide a reason for the break
    this.reasonCode = code;
    this.note = note;
  }
}


export class Fixture extends Activity {
  matchId: number;
  scheduledTime: string; // Renamed from startTime
  pitch: string;
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
  score1: { goals: number | null; points: number | null; }; // New structure for team1 score
  team2: string;
  score2: { goals: number | null; points: number | null; }; // New structure for team2 score
  umpireTeam?: string; // Optional field

  constructor(rowData: any = {}) {
    super('fixture');
    this.matchId = 0;
    this.scheduledTime = '';
    this.pitch = '';
    this.stage = '';
    this.category = '';
    this.position = 0;
    this.team1 = '';
    this.team2 = '';
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
      position,
      team1,
      team2,
      umpireTeam,
      halfDuration,
      breakDuration,
      minRest,
      allotted,
      team1Goals,
      team1Points,
      team2Goals,
      team2Points,
    } = rowData;

    this.matchId = matchId;
    this.scheduledTime = scheduledTime;
    this.pitch = pitch;
    this.stage = stage;
    this.category = category;
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
    this.score1 = { goals: team1Goals, points: team1Points };
    this.score2 = { goals: team2Goals, points: team2Points };
  }

  get repr() {
    return {
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
    };
  }
}
