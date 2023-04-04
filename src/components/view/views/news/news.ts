import './news.css';
import '@/assets/news-placeholder.jpg';

import { NewsData } from '@/types';
import { View } from '@/components/interfaces';

import { getElementBySelector, getTemplateBySelector } from '../../utils';

export class News implements View<NewsData> {
    draw(data: NewsData) {
        const news = data.articles.length >= 10 ? data.articles.filter((_item, idx) => idx < 10) : data.articles;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getTemplateBySelector(document, '#newsItemTemp');

        if (news.length === 0) {
            const notFoundClone = getTemplateBySelector(document, '#not-found').content.cloneNode(true);

            if (!(notFoundClone instanceof DocumentFragment)) throw new TypeError('Invalid type inside template!');

            fragment.append(notFoundClone);
        } else
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true);

                if (!(newsClone instanceof DocumentFragment)) throw new TypeError('Invalid type inside template!');

                if (idx % 2) getElementBySelector(newsClone, '.news__item').classList.add('alt');

                if (item.urlToImage)
                    getElementBySelector(
                        newsClone,
                        '.news__meta-photo'
                    ).style.backgroundImage = `url(${item.urlToImage})`;
                getElementBySelector(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
                getElementBySelector(newsClone, '.news__meta-date').textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                getElementBySelector(newsClone, '.news__description-title').textContent = item.title;
                getElementBySelector(newsClone, '.news__description-source').textContent = item.source.name;
                getElementBySelector(newsClone, '.news__description-content').textContent = item.description;
                getElementBySelector(newsClone, '.news__read-more a').setAttribute('href', item.url);

                fragment.append(newsClone);
            });

        getElementBySelector(document, '.news').innerHTML = '';
        getElementBySelector(document, '.news').appendChild(fragment);
    }
}
