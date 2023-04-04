import { View } from '../../interfaces';
import { getElementBySelector } from '../utils';

export class NewsLoading implements View<undefined> {
    private newsDiv: HTMLElement | null = null;

    init() {
        this.newsDiv = getElementBySelector(document, '.news');
    }

    draw() {
        if (this.newsDiv) {
            this.newsDiv.textContent = '';
            const elem = document.createElement('div');
            elem.classList.add('loading-spinner');
            this.newsDiv.appendChild(elem);
        }
    }
}
