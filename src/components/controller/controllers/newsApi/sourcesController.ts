import { ControllerCallback } from '@/components/interfaces';
import { SourcesData } from '@/types';
import { Loader, Controller } from '../base';

export class SourcesController extends Controller<SourcesData> {
    protected get defaultOptions(): Record<string, never> {
        return {};
    }

    protected _getData(loader: Loader, callback: ControllerCallback<SourcesData>) {
        loader.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }
}
