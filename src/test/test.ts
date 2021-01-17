import 'mocha';
import stringToPotFish, { PotFish, Area} from '../types/PotFish';
import stringToFish, { Behavior, Fish } from '../types/Fish';
import { Season, Weather } from '../types/Common';
import { expect } from 'chai';
import stringToLocation, { Location } from '../types/Location';

describe('parsers', () => {
  it('parses string into fish', () => {
    const result = stringToFish(55, 'Pufferfish/80/floater/1/36/1200 1600/summer/sunny/690 .4 685 .1/4/.3/.5/0');
    const expected: Fish = {
      id: 55,
      name: 'Pufferfish',
      difficulty: 80,
      behavior: Behavior['floater'],
      sizeRange: [1, 36],
      timeRange: [['1200', '1600']],
      season: [Season['summer']],
      weather: Weather['sunny'],
      fishingLevel: 0,
    }
    expect(result).to.deep.equal(expected);
  });
  it('parses string into potfish', () => {
    const result = stringToPotFish("Lobster/trap/.05/688 .45 689 .35 690 .35/ocean/2/20");
    const expected: PotFish = {
      name: 'Lobster',
      area: Area['ocean'],
    }
    expect(result).to.deep.equal(expected);
  })
  it('parses string into location', () => {
    const result = stringToLocation("UndergroundMine", "-1/-1/-1/-1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/153 -1 156 -1 157 -1/107 .01",);
    const expected: Location = {
      name: 'UndergroundMine',
      spawns: {
        153: [Season.spring, Season.summer, Season.fall, Season.winter],
        156: [Season.spring, Season.summer, Season.fall, Season.winter],
        157: [Season.spring, Season.summer, Season.fall, Season.winter],
      },
    }
    expect(result).to.deep.equal(expected);
  })
});