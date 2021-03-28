export const dateToArray = (timeInMilli) => {
  if (typeof timeInMilli === "string") {
    timeInMilli = parseInt(timeInMilli);
  }
  const date = new Date(timeInMilli);
  return [date.getFullYear(), date.getMonth() + 1, date.getDay()];
};
