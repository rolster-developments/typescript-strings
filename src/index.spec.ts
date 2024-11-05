import {
  firstChar,
  hasPattern,
  initials,
  interpolation,
  lastChar,
  normalize
} from '.';

describe('Strings', () => {
  it('FirstChar', () => {
    expect(firstChar('Daniel')).toBe('D');
    expect(firstChar('')).toBe('');
  });

  it('LastChar', () => {
    expect(lastChar('Daniel')).toBe('l');
    expect(lastChar('')).toBe('');
  });

  it('Normalize', () => {
    expect(normalize('COLOMBIA')).toBe('COLOMBIA');
    expect(normalize('Daniel')).toBe('Daniel');
    expect(normalize('Dááníél')).toBe('Daaniel');
    expect(normalize('CÓLUMBIA')).toBe('COLUMBIA');
  });

  it('HasPattern', () => {
    expect(hasPattern('DANIEL CASTILLO', 'CASTI')).toBeTruthy();
    expect(hasPattern('DANIEL CASTILLO', 'NIAL')).toBeFalsy();

    expect(hasPattern('DÁNIÉL CASTILLO', 'ANIE', true)).toBeTruthy();
    expect(hasPattern('DÁNIÉL CASTILLO', 'NIAL')).toBeFalsy();
  });

  it('Initials', () => {
    expect(initials('Daniel Castillo')).toBe('DC');
    expect(initials('Daniel Castillo Pedroza')).toBe('DP');
    expect(initials('Daniel Castillo Pedroza', 3)).toBe('DP');

    expect(initials('Daniel')).toBe('DA');
    expect(initials('Daniel', 3)).toBe('DAN');
  });

  it('Interpolation', () => {
    const template1 = 'Hello, {person1} and {person2} to Colombia';
    const template2 = 'Thank you, for buy {product}';
    const template3 = 'Winners = {0}, {1} and {2}';
    const template4 = 'You only fail when you stop trying';
    const template5 =
      '{name}, the best way to predict the future is to invent it';

    expect(
      interpolation(template1, { person1: 'Daniel', person2: 'Katherin' })
    ).toBe('Hello, Daniel and Katherin to Colombia');

    expect(interpolation(template2, { product: 'Samsung Galaxy A24' })).toBe(
      'Thank you, for buy Samsung Galaxy A24'
    );

    expect(interpolation(template3, ['Faker', 'Deft', 'Score'])).toBe(
      'Winners = Faker, Deft and Score'
    );

    expect(interpolation(template4)).toBe('You only fail when you stop trying');

    expect(interpolation(template5)).toBe('');
  });
});
