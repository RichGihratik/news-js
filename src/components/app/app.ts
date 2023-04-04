import { AppController } from '../controller';
import { AppView } from '../view';

const defaultCountry = 'us';

export class App {
    private controller = new AppController();
    private view = new AppView();

    private locationCountry = defaultCountry;
    private firstUpdate = true;

    start() {
        this.controller.init();
        this.view.init();

        // News init
        // =============

        this.controller.bindCallback('news', (data?) => {
            if (data) this.view.draw('news', data);
        });

        // Sources init
        // =============

        this.controller.bindCallback('sources', (data?) => {
            if (data) {
                this.view.draw('sources', data);
                this.view.draw('top', { location: { country: { code: this.locationCountry } } });
            }
        });
        const sourceObservable = this.view.observables('sources');
        if (!sourceObservable) throw new Error('Sources must have observers!');
        sourceObservable.sourceClick.subscribe((sourceId) => {
            this.view.draw('newsLoading', undefined);
            this.controller.callController('news', { sources: sourceId.id });
        });

        // Top init
        // =============

        this.controller.bindCallback('top', (data?) => {
            if (data) {
                // If there's no trending news in our country then set to default (us)
                if (data.articles.length === 0 && this.locationCountry !== defaultCountry) {
                    this.locationCountry = defaultCountry;
                    this.controller.callController('top', { country: this.locationCountry });
                } else {
                    // We're only need to call it once
                    if (this.firstUpdate) {
                        this.controller.callController('sources');
                        this.firstUpdate = false;
                    }
                    this.view.draw('news', data);
                }
            }
        });
        const topObservable = this.view.observables('top');
        if (!topObservable) throw new Error('Top must have observable!');
        topObservable.btnClick.subscribe(() => {
            this.view.draw('newsLoading', undefined);
            this.controller.callController('top', { country: this.locationCountry });
        });

        // Fetch IP info
        // =============

        this.controller.bindCallback('ip', (data?) => {
            this.locationCountry = data ? data.location.country.code.toLowerCase() : defaultCountry;
            this.controller.callController('top', { country: this.locationCountry });
        });

        // Start app
        this.controller.callController('ip');
    }
}
