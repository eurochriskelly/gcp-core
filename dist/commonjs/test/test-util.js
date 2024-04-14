"use strict";
module.exports = {
    prettyPrintMatches,
};
const VERBOSE = true;
function prettyPrintMatches(matches) {
    return VERBOSE
        ? console.table(matches.map(m => {
            const strteam = t => {
                const { type, stage, group, position } = t;
                if (type === 'calculated') {
                    return `~${stage}:${group}/p:${position}`;
                }
                else {
                    return 'real';
                }
            };
            return Object.assign(Object.assign({}, m), { team1: strteam(m.team1), team2: strteam(m.team2) });
        }))
        : null;
}
