export function getElementBySelector(element: DocumentFragment | HTMLElement | Document, selector: string) {
    const result = element.querySelector(selector);
    if (!result) throw new Error('Element was not found!');
    if (!(result instanceof HTMLElement)) throw new TypeError('Element is not HTML!');
    return result;
}

export function getTemplateBySelector(element: HTMLElement | Document, selector: string) {
    const result = getElementBySelector(element, selector);
    if (!(result instanceof HTMLTemplateElement)) throw new TypeError('Element is not template!');
    return result;
}
