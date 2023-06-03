export const $ = <T extends HTMLElement>(parent: ParentNode, selector: string): T | null => {
  return parent.querySelector(selector)
}

export const $$ = <T extends HTMLElement>(parent: ParentNode, selector: string): NodeListOf<Element> => {
  return parent.querySelectorAll(selector)
}

export const $H = <T = Record<string, HTMLElement>>(parent: ParentNode, selectors: Record<keyof T, string>): T | null => {
  const elements: Record<string, HTMLElement> = {};
  for (const key in selectors) {
    const el = $<HTMLElement>(parent, selectors[key]);
    if (el == null) {
      return null
    };
    elements[key] = el;
  }
  return elements as unknown as T;
}

export const on = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): HTMLElement => {
  element.addEventListener(type, listener, false);
  return element;
}

export const style = (element: HTMLElement, style: Record<string, string>): HTMLElement => {
  for(const key in style) {
    element.style.setProperty(key, style[key])
  }
  return element
}

export const create = (tag: string, classes: string[] = [], config?: {
  attrs?: Record<string, string>;
  style?: Record<string, string>;
  html?: string;
}): HTMLElement => {
  const element = document.createElement(tag);
  if (classes) attrs(element, { 'class': classNames(classes) });
  if (config?.attrs) attrs(element, config.attrs);
  if (config?.style) style(element, config.style);
  if (config?.html) html(element, config.html);
  return element;
}

export const observe = (element: HTMLElement, callback: MutationCallback): MutationObserver  => {
  const observer = new MutationObserver(callback)
  observer.observe(element, {childList: true, subtree: true})
  return observer
}

export const classNames =  (names: string[]): string => {
  return names.join(' ');
}

export const attrs = (element: HTMLElement, attrs: Record<string, string | null>): HTMLElement => {
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, value);
    }
  }
  return element;
}

export const html = (element: HTMLElement, html: string): HTMLElement => {
  element.innerHTML = html;
  return element;
}

export const append = (parent: ParentNode, creator: () => HTMLElement): HTMLElement => {
  const element = creator();
  parent.append(element);
  return element;
}