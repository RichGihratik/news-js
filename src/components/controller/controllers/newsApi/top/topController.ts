import { ControllerCallback } from '@/components/interfaces';
import { NewsData } from '@/types';
import { Loader, Controller } from '../../base';
import { TopOptions } from './types';

export class TopNewsController extends Controller<NewsData, TopOptions> {
    protected get defaultOptions(): TopOptions {
        return {
            country: 'us',
            sortedBy: 'popularity',
        };
    }

    protected _getData(loader: Loader, callback: ControllerCallback<NewsData>, options: TopOptions) {
        loader.getResp(
            {
                endpoint: 'top-headlines',
                options: options,
            },
            callback
        );
    }
}
