export enum Area {
    ocean,
    freshwater,
}

export type PotFish = {
    name: string,
    area: Area,
}
export const isTrap = (s: string): boolean => {
    const parts = s.split('/');
    return (parts[1] === 'trap');
}


const stringToPotFish = (s: string): PotFish => {
    const parts = s.split('/');
    if (parts.length <= 6 || !isTrap(s)) {
        throw new Error('fuck off' + s);
    }

    const name = parts[0];
    const area = parts[4];
    return {
        name,
        area: Area[area as keyof typeof Area],
    } as PotFish;
}

export default stringToPotFish;