import 'mocha';
import stringToFish, { Behavior, Season, Weather, Fish } from '../parser';
import { expect } from 'chai';

describe('crap', () => {
  it('sucs', () => {
    const result = stringToFish('Pufferfish/80/floater/1/36/1200 1600/summer/sunny/690 .4 685 .1/4/.3/.5/0');
    const expected: Fish = {
      name: 'Pufferfish',
      difficulty: 80,
      behavior: Behavior['floater'],
      sizeRange: [1, 36],
      timeRange: [['1200', '1600']],
      season: [Season['summer']],
      weather: Weather['sunny'],
    }
    expect(result).to.deep.equal(expected);
  })
});