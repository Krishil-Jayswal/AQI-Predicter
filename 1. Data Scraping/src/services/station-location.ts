export const getLocation = (stationId: string, timestamp: string) => {
  const location = { station_id: stationId, date: timestamp }
  return location;
};
