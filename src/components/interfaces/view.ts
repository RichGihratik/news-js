import { Observable } from '@/common/observable';

interface MapType {
    [key: string]: unknown;
}

export type ObservablesMap<K> = {
    [key in keyof K]: Observable<K[key]>;
};

export interface View<DataType, Map extends MapType = Record<string, never>> {
    draw(d: DataType): void;
    observables?(): ObservablesMap<Map>;
    init?(): void;
}
