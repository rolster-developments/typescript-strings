import { firstElement, lastElement } from '@rolster/arrays';

export type Interpolators = LiteralObject<any> | any[];

export const firstChar = (value: string): string => {
  return value.length === 0 ? '' : value.charAt(0);
};

export const lastChar = (value: string): string => {
  return value.length ? value.charAt(value.length - 1) : '';
};

export const normalize = (word: string): string => {
  return word
    .slice()
    .replace(/á/g, 'a')
    .replace(/Á/g, 'A')
    .replace(/é/g, 'e')
    .replace(/É/g, 'E')
    .replace(/í/g, 'i')
    .replace(/Í/g, 'I')
    .replace(/ó/g, 'o')
    .replace(/Ó/g, 'O')
    .replace(/ú/g, 'u')
    .replace(/Ú/g, 'U');
};

export const hasPattern = (
  word: string,
  pattern: string,
  force = false
): boolean => {
  let filter = pattern.toLowerCase();
  let test = word.toLowerCase();

  if (force) {
    test = normalize(test);
    filter = normalize(filter);
  }

  return !!test.match(`^.*${filter}.*$`);
};

export const initials = (word: string, size = 2): string => {
  const split = word.split(' ');

  if (split.length === 1) {
    return word.slice(0, size).toUpperCase();
  }

  const firstValue = firstElement(split) as string;
  const lastValue = lastElement(split) as string;

  return `${firstChar(firstValue)}${firstChar(lastValue)}`.toUpperCase();
};

const regInterpolation = /{([^{}]*)}/g;

export function interpolation(template: string, value?: Interpolators): string {
  if (value) {
    return template.replace(regInterpolation, (_, key) =>
      String(Array.isArray(value) ? value[+key] : value[key])
    );
  }

  return !regInterpolation.test(template) ? template : '';
}
