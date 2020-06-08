// import { translation } from './utils/translation';
import Page from '../modules/Page';


const page1 =  new Page();

test('test get day now ru ', () => {
    page1.timezone = 'Europe/Minsk';
    page1.lang = 'ru';
    const time = page1.getDateTimeNow();
    expect(time.day).toMatch(/(вс)?(пн)?(вт)?(ср)?(чт)?(пт)?(суб)?/);
});

test('test get day now be', () => {
    page1.timezone = 'Europe/Minsk';
    page1.lang = 'be';
    const time = page1.getDateTimeNow();
    expect(time.day).toMatch(/(няд)?(пнд)?(аўт)?(сер)?(чцв)?(пят)?(суб)?/);
});

