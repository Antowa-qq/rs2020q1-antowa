import convertTemp from '../modules/utils/convertTemp';


test('test celsius to fahrenheit ', () => {
    expect(convertTemp.celsiusToFahrenheit(7)).toBe(44.6);
});

test('test celsius to fahrenheit ', () => {
    expect(convertTemp.celsiusToFahrenheit(0)).toBe(32);
});

test('test celsius to fahrenheit ', () => {
    expect(convertTemp.celsiusToFahrenheit(-1)).toBe(30.2);
});

test('test celsius to fahrenheit ', () => {
    expect(convertTemp.celsiusToFahrenheit(-1.5)).toBe(29.3);
});



test('test fahrenheit to celsius ', () => {
    expect(convertTemp.fahrenheitToCelsius(0)).toBe(-17.77777777777778);
});

test('test fahrenheit to celsius ', () => {
    expect(convertTemp.fahrenheitToCelsius(-1)).toBe(-18.333333333333336);
});

test('test fahrenheit to celsius', () => {
    expect(convertTemp.fahrenheitToCelsius(34)).toBe(1.1111111111111112);
});
