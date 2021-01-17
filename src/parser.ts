import * as FishData from '../data/Fish.json';

export enum Behavior {
    floater,
    dart,
    smooth,
    sinker,
    mixed,
}

export enum Season {
    summer,
    spring,
    fall,
    winter
}
export enum Weather {
    sunny,
    rainy,
    both
}
export type Fish = {
    name: string,
    difficulty: number,
    behavior: Behavior,
    sizeRange: [number, number],
    timeRange: [string, string][],
    season: Season[],
    weather: Weather,
    location?: any, // 690 .4 685 .1 ??
    // extra fields: 4/.3/.5/0
}

export type TrapFish = {

}

const stringToFish = (s: string): Fish => {
    const parts = s.split('/');
    if (parts.length <= 8) {
        throw new Error('fuck off' + s);
    }

    const [name, difficulty, behavior, minSize, maxSize, timeString, seasons, weather, ...extra] = parts;
    const times = timeString.split(' ');
    let timeRanges: [string, string][] = [];
    for(let i=0; i<times.length; i+=2) {
        timeRanges.push([times[i], times[i+1]]);
    }
    return {
        name,
        difficulty: parseInt(difficulty),
        behavior: Behavior[behavior as keyof typeof Behavior],
        sizeRange: [parseInt(minSize), parseInt(maxSize)],
        timeRange: timeRanges,
        season: seasons.split(' ').map(_season => Season[_season as keyof typeof Season]),
        weather: Weather[weather as keyof typeof Weather],
    } as Fish;
}
const stringToTrap = (s: string): TrapFish => {
    return {};
}

const isTrap = (s: string): boolean => {
    const parts = s.split('/');
    return (parts[1] === 'trap');
}
const JSONParser = () => {
    const lines: string[] = Object.values(FishData.content);
    const trapLines = lines.filter(isTrap).map(stringToTrap);
    const normalLines = lines.filter(x => !isTrap(x)).map(stringToFish);
    console.log(normalLines);
}
JSONParser();
/*
Lobster/trap/.05/688 .45 689 .35 690 .35/ocean/2/20
Pufferfish/80/floater/1/36/1200 1600/summer/sunny/690 .4 685 .1/4/.3/.5/0
Anchovy/30/dart/1/16/600 2600/spring fall/both/682 .2/1/.25/.3/0
Tuna/70/smooth/12/60/600 1900/summer winter/both/689 .35 681 .1/3/.15/.55/0
Sardine/30/dart/1/12/600 1900/spring summer fall winter/both/683 .3/1/.65/.1/0
Bream/35/smooth/12/30/1800 2600/spring summer fall winter/both/684 .35/1/.45/.1/0
*/
//console.log('crap')
//.log(stringToFish('Pufferfish/80/floater/1/36/1200 1600/summer/sunny/690 .4 685 .1/4/.3/.5/0'))

export default stringToFish;
