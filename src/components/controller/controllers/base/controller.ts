import { IController, ControllerCallback } from '../../../interfaces';
import { Loader } from './loader';

export abstract class Controller<DataType, Options = Record<string, never>> implements IController<DataType, Options> {
    private _loader: Loader | null = null;

    public init(loader: Loader) {
        this._loader = loader;
    }

    public getData(callback: ControllerCallback<DataType>, options?: Partial<Options>): void {
        const opts: Options = {
            ...this.defaultOptions,
            ...options,
        };
        if (!this._loader) throw new Error('Loader not loaded!');
        this._getData(this._loader, callback, opts);
    }

    protected abstract get defaultOptions(): Options;

    protected abstract _getData(loader: Loader, callback: ControllerCallback<DataType>, options: Options): void;
}
