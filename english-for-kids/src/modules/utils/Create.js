export default function create(el, classNames, child, parent) {
  const element = document.createElement(el);

  if (classNames) {
    element.classList.add(...classNames.split(' '));
  }

  if (child) {
    element.append(...child);
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}
