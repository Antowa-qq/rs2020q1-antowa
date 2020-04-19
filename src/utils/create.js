export default function create(el, classNames, child, parent, ...dataAttr) {

    let element = document.createElement(el);

    if (classNames) {
        element.classList.add(...classNames.split(' '));
    }

    if (child) {
        element.append(...child);
    }

    if (parent) {
        parent.append(element);
    }

    if (dataAttr) {
        dataAttr.forEach(item => {
            for (let i in item) {
                element.dataset[i] = item[i];
            }
        });
    }

    return element;
}