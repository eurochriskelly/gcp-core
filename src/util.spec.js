const { calculateNextGameStartTime } = require('./util');

describe('Useful utility functions', () => {
  it('can calculate time for upcoming matches', () => {
    var nextTime = '';
    nextTime = calculateNextGameStartTime('10:00', 10, 4)
    expect(nextTime).toBe('10:30')
    nextTime = calculateNextGameStartTime('12:45', 15, 6)
    expect(nextTime).toBe('13:30')
  })
})
