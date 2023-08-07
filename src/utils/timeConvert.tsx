export const convertTimeStampToDate = (time: number) => {
  let date = new Date(time);
  // let result = date.toISOString().slice(0, 16);
  return new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 16);
};

export const convertDateToTimeStamp = (date: string) => {
  return Date.parse(date);
};