 import {googleAPIKey} from '../config'
var GoogleMapsLoader = require('google-maps'); // only for common js environments



GoogleMapsLoader.KEY = googleAPIKey;

GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];


let google;
const loadMap = () =>
    new Promise((resolve, reject) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

const maps = async () => {
    const google = await loadMap();
    return google.maps;
};

export { maps };