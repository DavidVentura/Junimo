import { Season, Weather } from './Common';

export enum Behavior {
    floater,
    dart,
    smooth,
    sinker,
    mixed,
}

export type Fish = {
    id: number,
    name: string,
    difficulty: number,
    behavior: Behavior,
    sizeRange: [number, number],
    timeRange: [string, string][],
    season: Season[],
    weather: Weather,
    location?: any,
    fishingLevel: number,
} // {Season: Location[]} 


const stringToFish = (id: number, s: string): Fish => {
    const parts = s.split('/');
    if (parts.length <= 8) {
        throw new Error('fuck off' + s);
    }

    const [name, difficulty, behavior, minSize, maxSize, timeString, seasons, weather, _8, _9, _10, _11, fishingLevel] = parts;
    const times = timeString.split(' ');
    let timeRanges: [string, string][] = [];
    for(let i=0; i<times.length; i+=2) {
        timeRanges.push([times[i], times[i+1]]);
    }
    return {
        id,
        name,
        difficulty: parseInt(difficulty),
        behavior: Behavior[behavior as keyof typeof Behavior],
        sizeRange: [parseInt(minSize), parseInt(maxSize)],
        timeRange: timeRanges,
        season: seasons.split(' ').map(_season => Season[_season as keyof typeof Season]),
        weather: Weather[weather as keyof typeof Weather],
        fishingLevel: parseInt(fishingLevel),
    } as Fish;
}


export default stringToFish;
