export const generateDailyStamps = (start: string, end: string) => {
  const timestamps: string[] = [];

  let currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate <= endDate) {
    timestamps.push(currentDate.toISOString().replace(".000", ""));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return timestamps;
};
