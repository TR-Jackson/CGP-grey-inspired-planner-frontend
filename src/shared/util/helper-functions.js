export const dateToArray = (timeInMilli) => {
  if (typeof timeInMilli === "string") {
    timeInMilli = parseInt(timeInMilli);
  }
  const date = new Date(timeInMilli);
  console.log(date);
  return [date.getDay(), date.getMonth(), date.getFullYear()];
};
