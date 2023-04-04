import { Loader } from '../base';

export class IPApiLoader extends Loader {
    constructor() {
        super('https://api.ipregistry.co/', {
            key: '2dufpbirbixwmccz',
        });
    }
}
