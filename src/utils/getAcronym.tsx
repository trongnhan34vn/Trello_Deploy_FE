export const getAcronym = (name: string | null) => {
  if(!name) return;
  let strArr = name.split(' ');
  let firstChar= strArr[0].charAt(0);
  let secondChar = strArr[1].charAt(0);
  return firstChar + secondChar;
}