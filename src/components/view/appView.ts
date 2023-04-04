import { News, Sources, BurgerMenu, NewsLoading, TopSource } from './views';
import { ViewsTypesMap, ViewsMap } from './types';
import { ObservablesMap } from '@/components/interfaces';

export class AppView {
    private map: ViewsMap = {
        news: new News(),
        sources: new Sources(),
        burgerMenu: new BurgerMenu(),
        newsLoading: new NewsLoading(),
        top: new TopSource(),
    };

    init() {
        for (const key in this.map) {
            const mapKey = key as keyof ViewsTypesMap;
            const initFunc = this.map[mapKey].init;
            if (initFunc) {
                initFunc.call(this.map[mapKey]);
            }
        }
    }

    draw<Key extends keyof ViewsTypesMap>(key: Key, data: ViewsTypesMap[Key]['data']) {
        this.map[key].draw(data);
    }

    observables<Key extends keyof ViewsTypesMap>(
        key: Key
    ): ObservablesMap<ViewsTypesMap[Key]['observables']> | undefined {
        return (this.map[key].observables ?? (() => undefined)).call(this.map[key]);
    }
}
