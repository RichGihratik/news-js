import { IController } from '@/components/interfaces';
import { Location, NewsData, SourcesData } from '@/types';
import { NewsOptions, TopOptions } from './controllers';

// Все типы использовались только в одном файле (appController.ts) и предназначены только для него
// Не стал их разбивать по файлам

export type ControllerTypesMap = {
    news: {
        dataType: NewsData;
        optionsType: Partial<NewsOptions>;
    };
    top: {
        dataType: NewsData;
        optionsType: Partial<TopOptions>;
    };
    sources: {
        dataType: SourcesData;
        optionsType: undefined;
    };
    ip: {
        dataType: Location;
        optionsType: undefined;
    };
};

export type MapKeys = keyof ControllerTypesMap;

export type DataByKey = {
    [key in MapKeys]: ControllerTypesMap[key]['dataType'];
};

export type OptionsByKey = {
    [key in MapKeys]: ControllerTypesMap[key]['optionsType'];
};

export type Callback<T extends MapKeys> = (data?: DataByKey[T]) => void;

type CallbackBinding<T extends MapKeys> = {
    controller: IController<DataByKey[T], OptionsByKey[T]>;
    hooks: Callback<T>[];
};

export type BindingMap = {
    [key in MapKeys]: CallbackBinding<key>;
};
