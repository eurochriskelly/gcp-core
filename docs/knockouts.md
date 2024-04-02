# Knockout stage

The knock out stage is organized based on the rules defined in the brackets
section of the tournament document. Knockouts stages are calculated per
category. For example, in a tournamnent with Mens and Ladies categories, the
knockout stages are calculated separately for each category and the rules are
defined in the brackets section of the tournament.

A knockout bracket will typically involve semi-finals plus finals for the top
team in a each group in a competition with 4 groups, or a semi-finals and finals
for the top 2 teams in a competition with 2 groups. The number of teams in the
knockout stage is determined by the number of teams in the competition and the
rules defined in the brackets section of the tournament. 

## Examples

Given a definition as follows:

divisions {
    cup: 4,
    plate: 4,
    bowl: null
}

The knockout divisions will be ordered "cup", "plate", "bowl", the cup will take
in the top 4 teams, the plate will take in the next 4 teams and the bowl will
take in the rest of the teams.

Teams should not play another team in the same group in the knockout stage until
the final if possible. Using the default rules, the number of teams will be a
power of 2 and all but the last division must choose a power of 2 number of
teams. The last division will take the remaining teams.

### Example 1

Give the following group result for a 13 team competitions:

| POS | GROUP 1 | GROUP 2 | GROUP 3 | GROUP 4 |
|-----|---------|---------|---------|---------|
| 1   | Team 3  | Team 6  | Team 9  | Team 11 |
| 2   | Team 1  | Team 5  | Team 10 | Team 13 |
| 3   | Team 4  | Team 7  | Team 8  | Team 12 |
| 4   | Team 2  |         |         |         |


The first place team in groups 1-4 will be selected for the cup. The second
place team in groups 1-4 will be selected for the plate. The third and fourth
place team in groups 1-4 will be selected for the bowl. 

To decide who plays who in the knockout stage we first must determine the
overall order of teams in the competition as if they all played in one large
group. If groups are not balanced, the teams in the larger groups will have
their points and goal difference adjusted to reflect the average points and goal
difference of the smaller groups. Goal difference will be adjusted based on
number of games played as well as the playing time per game which is different
depending on the size of the group. If 2 teams have the same points, points
scored, and points difference making it impossible to determine the order, the
order will be randomly determined and the decision to do so will be logged for
audit purposes. 


