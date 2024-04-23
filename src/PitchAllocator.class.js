import { addMinutes } from './util';

class Pitch {
    constructor(name, availability) {
        this.name = name;
        this.availability = availability;
        this.nextAvailableSlot = availability.from; // initialize to the first available slot
    }
}

class PitchAllocator {
    constructor(tournament) {
        this.tournament = tournament;
        this.pitches = []
    }

    nextAvailablePitch() {
        const convertToMs = time => new Date(time).getTime();
        return this.pitches
            .sort((a, b) => {
                const nextA = convertToMs(a.nextAvailableSlot)
                const nextB = convertToMs(b.nextAvailableSlot)
                return nextA > nextB ? 1 : nextB > nextA ? -1 : 0
            })[0]
    }

    /**
     * Allocate fixtures to available pitches
     */
    allocate(category) {
        debugger
        const { pitches, categories } = this.tournament;
        const catPitches = categories[category].pitches;
        this.pitches = [...pitches]
            .filter((p, i) => catPitches.includes(i))
            .map(p => new Pitch(p.name, p.availability));

        // Loop over each match and try to allocate a match to the next available slot
        this.tournament.filterActivities(f => f.category === category)
            .forEach(match => {
                const pitch = this.nextAvailablePitch()
                match.pitch = pitch.name
                match.startTime = pitch.nextAvailableSlot
                const time = pitch.nextAvailableSlot.split('T').pop().substring(0, 5)
                const nextSlot = `${this.tournament.startDate}T${addMinutes(time, match.allottedTime)}:00`
                pitch.nextAvailableSlot = nextSlot
            })
    };
}

export default PitchAllocator;
