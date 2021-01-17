import * as FishData from '../data/Fish.json';
import stringToFish from './types/Fish';
import stringToPotFish, { isTrap } from './types/PotFish';

const JSONParser = () => {
    
    const trapLines = Object.values(FishData.content).filter(isTrap).map(stringToPotFish);
    const normalLines = Object.entries(FishData.content)
                            .filter(([k, v]) => !isTrap(v))
                            .map(([k, v]) => stringToFish(parseInt(k), v));
    console.log(normalLines);
}
JSONParser();