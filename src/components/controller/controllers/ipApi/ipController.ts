import { ControllerCallback } from '@/components/interfaces';
import { Location } from '@/types';
import { Loader, Controller } from '../base';

export class IPController extends Controller<Location> {
    protected get defaultOptions() {
        return {};
    }

    protected _getData(loader: Loader, callback: ControllerCallback<Location>) {
        loader.getResp(
            {
                endpoint: '',
            },
            callback
        );
    }
}
