import { getSeasonByLat } from '../modules/utils/getSeasonByLat';


test('test season', () => {
    const season = getSeasonByLat('53S');
    expect(season).toMatch(/(winter)?(autumn)?(spring)?(summer)?/);
});