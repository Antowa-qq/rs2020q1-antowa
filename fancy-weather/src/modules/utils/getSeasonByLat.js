const getSeasonByLat = (lat) => {
  const seasonMonth = {
    winter: [11, 0, 1],
    spring: [2, 3, 4],
    summer: [5, 6, 7],
    autumn: [8, 9, 10],
  };
  const season = {
    winter: 'winter',
    spring: 'spring',
    summer: 'summer',
    autumn: 'autumn',
  };
  // Latitude > 0 - North
    // Latitude < 0 - South
  const date = new Date();
  const n = date.getMonth();
  const isSouth = lat.includes('S');

  if (seasonMonth.winter.includes(n)) {
    return isSouth ? season.summer : season.winter;
  }

  if (seasonMonth.spring.includes(n)) {
    return isSouth ? season.autumn : season.spring;
  }

  if (seasonMonth.summer.includes(n)) {
    return isSouth ? season.winter : season.summer;
  }

  return isSouth ? season.spring : season.autumn;
};
export { getSeasonByLat };
