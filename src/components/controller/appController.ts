import { IController } from '@/components/interfaces';
import {
    NewsController,
    SourcesController,
    TopNewsController,
    NewsApiLoader,
    IPController,
    IPApiLoader,
} from './controllers';

import { BindingMap, DataByKey, MapKeys, OptionsByKey, Callback } from './types';

export class AppController {
    private readonly newsController = new NewsController();
    private readonly sourcesController = new SourcesController();
    private readonly topController = new TopNewsController();
    private readonly ipController = new IPController();

    private readonly newsLoader = new NewsApiLoader();
    private readonly ipLoader = new IPApiLoader();

    private callbackBindings: BindingMap = {
        news: {
            controller: this.newsController,
            hooks: [],
        },
        sources: {
            controller: this.sourcesController,
            hooks: [],
        },
        top: {
            controller: this.topController,
            hooks: [],
        },
        ip: {
            controller: this.ipController,
            hooks: [],
        },
    };

    init() {
        this.newsController.init(this.newsLoader);
        this.sourcesController.init(this.newsLoader);
        this.topController.init(this.newsLoader);
        this.ipController.init(this.ipLoader);
    }

    bindCallback<Key extends MapKeys>(key: Key, callback: Callback<Key>) {
        this.callbackBindings[key].hooks.push(callback);
    }

    private callBindings<Key extends MapKeys>(key: Key, data?: DataByKey[Key]) {
        this.callbackBindings[key].hooks.forEach((hook) => {
            hook(data);
        });
    }

    callController<Key extends MapKeys>(key: Key, options?: OptionsByKey[Key]) {
        this.callbackBindings[key].controller.getData((data?: DataByKey[Key]) => this.callBindings(key, data), options);
    }

    getController<Key extends MapKeys>(key: Key): IController<DataByKey[Key], OptionsByKey[Key]> {
        return this.callbackBindings[key].controller;
    }
}
