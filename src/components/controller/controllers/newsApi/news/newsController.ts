import { ControllerCallback } from '@/components/interfaces';
import { NewsData } from '@/types';
import { Loader, Controller } from '../../base';
import { NewsOptions } from './types';

export class NewsController extends Controller<NewsData, NewsOptions> {
    protected get defaultOptions(): NewsOptions {
        return {
            sources: '',
            sortBy: 'popularity',
        };
    }

    protected _getData(loader: Loader, callback: ControllerCallback<NewsData>, options: NewsOptions) {
        if (options.sources === '') throw new Error('Sources was not defined!');
        loader.getResp(
            {
                endpoint: 'everything',
                options: options,
            },
            callback
        );
    }
}
