import { calculateNextGameStartTime } from "./util";

class Activity {
  ref: number;
  type: string;
  startTime: string;
  pitch: string;
  allottedTime: number;

  static reference = 1000;
  constructor(type: string) {
    this.ref = Activity.reference++;
    this.type = type;
    this.startTime = "";
    this.pitch = "";
    this.allottedTime = 0;
  }
  // provide a representation of the activity
  get repr() {
    return {
      type: this.type,
      startTime: this.startTime,
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
  stage: string;
  category: string;
  position: number;
  bracket: string;
  team1: any;
  team2: any;
  umpireTeam: any;
  halfDuration: number;

  constructor(rowData: any = {}) {
    super('fixture');
    this.matchId = 0;
    this.stage = '';
    this.category = '';
    this.position = 0;
    this.bracket = '';
    this.team1 = '';
    this.team2 = '';
    this.umpireTeam = '';
    this.halfDuration = 0;
    if (Object.keys(rowData).length) {
      this.data = rowData;
    }
  }
  set data(rowData: any) {
    const {
      matchId,
      startTime,
      pitch,
      stage,
      category,
      group,
      team1,
      team2,
      bracket,
      umpireTime,
      allottedTime,
      halfDuration,
    } = rowData;
    this.matchId = matchId;
    this.startTime = startTime;
    this.pitch = pitch;
    this.stage = stage;
    this.bracket = bracket;
    this.category = category;
    this.position = group;
    this.umpireTeam = umpireTime;
    this.team1 = team1;
    this.team2 = team2;
    this.halfDuration = halfDuration;
    this.allottedTime = allottedTime;
  }
  // give back in rows
  get data() {
    return [
      this.startTime,
      this.pitch,
      this.stage,
      this.category,
      this.position,
      this.bracket,
      this.team1,
      this.team2,
      this.umpireTeam,
      this.halfDuration,
    ];
  }
  // create after on same pitch
  createAfter(fixPrev: any, overrides: any) {
    const [startTime, pitch, stage, category, position] = fixPrev;
    const halfDuration = fixPrev.pop();
    if (overrides.pitch && overrides.pitch !== pitch) {
      throw new Error(
        `Next match must be calculated on same pitch as last match! override pitch [${overrides.pitch}] != previous pitch [${pitch}]`,
      );
    }
    this.data = [
      calculateNextGameStartTime(startTime, halfDuration),
      pitch,
      overrides.stage || stage,
      overrides.category || category,
      overrides.position || position,
      overrides.team1 || "~??",
      overrides.team2 || "~??",
      overrides.umpireTeam || "~??",
      overrides.halfDuration || halfDuration,
    ];
  }
  get repr() {
    const strteam = (t: any) => {
      const { type, stage, group, position } = t;
      if (type === 'calculated') {
        return `~${stage}:${group}/p:${position}`
      } else {
        return t
      }
    }
    return {
      id: this.matchId,
      ...super.repr,
      stage: this.stage,
      category: this.category,
      position: this.position,
      bracket: this.bracket,
      team1: strteam(this.team1),
      team2: strteam(this.team2),
      umpireTeam: this.umpireTeam,
      halfDuration: this.halfDuration,
    };
  }
}

