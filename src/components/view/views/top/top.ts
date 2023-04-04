import { Observable } from '@/common/observable';
import { View, ObservablesMap } from '@/components/interfaces';
import { Location } from '@/types';

import { getElementBySelector, getTemplateBySelector } from '../../utils';
import { ObservablesTypesMap, headingTemplate, locationPlaceholder, btnId } from './types';

export class TopSource implements View<Location, ObservablesTypesMap> {
    private element: HTMLElement | null = null;

    private observablesMap: ObservablesMap<ObservablesTypesMap> = {
        btnClick: new Observable<void>(),
    };

    public observables(): ObservablesMap<ObservablesTypesMap> {
        return { ...this.observablesMap };
    }

    draw(data: Location) {
        if (!this.element) {
            const sourceItemTemp = getTemplateBySelector(document, '#sourceItemTemp');

            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) throw new TypeError('Invalid type inside template!');

            const mainElement = getElementBySelector(sourceClone, '.source__item');
            mainElement.onclick = () => {
                this.observablesMap.btnClick.next();
            };
            mainElement.id = btnId;

            const container = getElementBySelector(document, '.sources');
            container.insertBefore(sourceClone, container.firstChild);
            this.element = getElementBySelector(document, '#' + btnId);
        }

        getElementBySelector(this.element, '.source__item-name').textContent = headingTemplate.replace(
            locationPlaceholder,
            data.location.country.code
        );
    }
}
