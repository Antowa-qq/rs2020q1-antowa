export default class Convert {
  static celsiusToFahrenheit(value) {
    return (Number.parseFloat(value) * (9 / 5)) + 32;
  }

  static fahrenheitToCelsius(value) {
    return (Number.parseFloat(value) - 32) * (5 / 9);
  }
}
