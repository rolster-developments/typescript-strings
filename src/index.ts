import { first, last } from '@rolster/arrays';

export type Interpolators = LiteralObject<any> | any[];

export function firstChar(value: string): string {
  return value.length === 0 ? '' : value.charAt(0);
}

export function lastChar(value: string): string {
  return value.length ? value.charAt(value.length - 1) : '';
}

export function normalize(word: string): string {
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function coincidence(
  word: string,
  pattern: string,
  force = false
): boolean {
  let filter = pattern.toLowerCase();
  let test = word.toLowerCase();

  if (force) {
    filter = normalize(filter);
    test = normalize(test);
  }

  return !!test.match(`^.*${filter}.*$`);
}

export function initials(word: string, size = 2): string {
  const split = word.split(' ');

  if (split.length === 1) {
    return word.slice(0, size).toUpperCase();
  }

  const firstValue = first(split) ?? '';
  const lastValue = last(split) ?? '';

  return `${firstChar(firstValue)}${firstChar(lastValue)}`.toUpperCase();
}

const REGEX_INTERPOLATION = /{([^{}]*)}/g;

export function interpolation(template: string, value?: Interpolators): string {
  return value
    ? template.replace(REGEX_INTERPOLATION, (_, key) =>
        String(Array.isArray(value) ? value[+key] : value[key])
      )
    : !REGEX_INTERPOLATION.test(template)
    ? template
    : '';
}
