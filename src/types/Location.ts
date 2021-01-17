import { Season } from "./Common";

export type Spawn = {
    id: number,
    area: number
}

type objectID = number;
export type Location = {
    name: string,
    spawns: {
        [key: number]: Season[],
    },
}

const stringToLocation = (name: string, s: string): Location => {
    const parts = s.split('/');
    if (parts.length <= 8) {
        throw new Error('fuck off' + s);
    }
    const ids = (part: string): objectID[] => {
        return part.split(' ') // 153 -1 154 -1 155 -1
                    .filter((_, idx) => (idx % 2) == 0)
                    .map(x => parseInt(x));
    };

    const seasonalData = new Map([
        [Season.spring, ids(parts[4])],
        [Season.summer, ids(parts[5])],
        [Season.fall, ids(parts[6])],
        [Season.winter, ids(parts[7])],
    ]);
    const allIDs = Array.from(seasonalData.values()).flat();
    /*const spawns = Object.fromEntries(allIDs.map(id => [
        id, 
        Array.from(seasonalData.entries()).filter(([_, items]) => {
            return items.indexOf(id) !== -1
        }).map(([season, _]) => season)
    ]));*/

    let spawns: {[key: number]: Season[]} = {};
    for (let id of allIDs) {
        spawns[id] = [];
        seasonalData.forEach((ids, season) => {
            if (ids.indexOf(id) !== -1) spawns[id].push(season);
        })
    }
    
    return {
        name,
        spawns
    } as Location;
}

export default stringToLocation;