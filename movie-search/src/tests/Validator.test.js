import Validator from '../modules/utils/Validator';

test('test validator field value = qwe ', () => {
    const field = document.createElement('input');
    field.value = 'qwe';
    expect(Validator.isEmpty(field)).toBe(true);
});

test('test validator field value = false  ', () => {
    const field = document.createElement('input');
    field.value = false;
    expect(Validator.isEmpty(field)).toBe(true);
});

test('test validator  field value = null ', () => {
    const field = document.createElement('input');
    field.value = null;
    expect(Validator.isEmpty(field)).toBe(false);
});