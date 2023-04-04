import { Loader } from '../base';

export class NewsApiLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'your-key',
            pageSize: '10',
        });
    }
}
