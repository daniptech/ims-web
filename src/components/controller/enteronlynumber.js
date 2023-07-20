export const enterOnlyNumber = (event) => {
  const keyCode = event.which || event.keyCode;
  const keyValue = String.fromCharCode(keyCode);
  const isValid = new RegExp('[0-9]').test(keyValue);
  // const isValidecimal = new RegExp(".").test(keyValue);
  if (!isValid) {
    event.preventDefault();
    return;
  }
};
