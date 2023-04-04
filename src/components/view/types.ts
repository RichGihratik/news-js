import { View } from '@/components/interfaces';
import { Location, NewsData, SourcesData } from '@/types';
import { SourceMap, TopTypeMap } from '@/components/view/views';

export type ViewsMap = {
    [key in keyof ViewsTypesMap]: View<ViewsTypesMap[key]['data'], ViewsTypesMap[key]['observables']>;
};

export type ViewsTypesMap = {
    news: {
        data: NewsData;
        observables: Record<string, never>;
    };
    sources: {
        data: SourcesData;
        observables: SourceMap;
    };
    top: {
        data: Location;
        observables: TopTypeMap;
    };
    burgerMenu: {
        data: undefined;
        observables: Record<string, never>;
    };
    newsLoading: {
        data: undefined;
        observables: Record<string, never>;
    };
};
