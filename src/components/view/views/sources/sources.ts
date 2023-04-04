import './sources.css';

import { Observable } from '@/common/observable';
import { View, ObservablesMap } from '@/components/interfaces';
import { SourcesData } from '@/types';

import { getElementBySelector, getTemplateBySelector } from '../../utils';
import { ObservablesTypeMap } from './types';

export class Sources implements View<SourcesData, ObservablesTypeMap> {
    private observablesMap: ObservablesMap<ObservablesTypeMap> = {
        sourceClick: new Observable<{ id: string }>(),
    };

    public observables(): ObservablesMap<ObservablesTypeMap> {
        return { ...this.observablesMap };
    }

    draw(data: SourcesData) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getTemplateBySelector(document, '#sourceItemTemp');

        data.sources.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) throw new TypeError('Invalid type inside template!');

            getElementBySelector(sourceClone, '.source__item-name').textContent = item.name;
            const mainElement = getElementBySelector(sourceClone, '.source__item');
            mainElement.setAttribute('data-source-id', item.id);
            mainElement.onclick = () => {
                this.observablesMap.sourceClick.next({ id: item.id });
            };

            fragment.append(sourceClone);
        });

        const container = getElementBySelector(document, '.sources');
        container.innerHTML = '';
        container.classList.remove('sources_not_loaded');
        container.append(fragment);
    }
}
