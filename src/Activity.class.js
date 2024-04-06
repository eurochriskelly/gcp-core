const { calculateNextGameStartTime } = require("./util");

class Activity {
  static reference = 1000;
  constructor(type) {
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

class Break extends Activity {
  constructor() {
    super('break');
    this.reasonCode = 0;
    this.note
  }
  set reason([code, note]) {
    // provide a reason for the break
    this.reasonCode = code;
    this.note = note;
  }
}

class Fixture extends Activity {
  constructor(rowData = []) {
    super('fixture');
    if (Object.keys(rowData).length) {
      this.data = rowData;
    }
  }
  set data(rowData) {
    const {
      matchId,
      startTime,
      pitch,
      stage,
      category,
      group,
      team1,
      team2,
      umpireTime,
      allottedTime,
      halfDuration,
    } = rowData;
    this.matchId = matchId;
    this.startTime = startTime;
    this.pitch = pitch;
    this.stage = stage;
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
      this.team1,
      this.team2,
      this.umpireTeam,
      this.halfDuration,
    ];
  }
  // create after on same pitch
  createAfter(fixPrev, overrides) {
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
    const strteam = t => {
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
      team1: strteam(this.team1),
      team2: strteam(this.team2),
      umpireTeam: this.umpireTeam,
      halfDuration: this.halfDuration,
    };
  }
}

module.exports = {
  Fixture,
  Break,
}