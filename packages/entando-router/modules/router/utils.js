export const deparam = (queryString) => {
  const obj = {};
  const parmArray = queryString.replace(/\+/g, ' ').split('&');

  for (let i = 0; i < parmArray.length; i += 1) {
    const param = parmArray[i].split('=');
    const key = decodeURIComponent(param[0]);
    if (param[0]) {
      obj[key] = param.length === 2 ? decodeURIComponent(param[1]) : '';
    }
  }
  return obj;
};

export const coerceTypes = (obj, emptyValue = '') => {
  const types = { true: !0, false: !1, null: null };
  const result = {};
  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    if (val && !Number.isNaN(Number.parseFloat(val))) {
      // val is a number
      result[k] = +val;
    } else if (val === 'undefined') {
      // val is undefined
      result[k] = undefined;
    } else if (val === '') {
      // val is empty
      result[k] = emptyValue;
    } else if (types[val] !== undefined) {
      // val is true, false, null
      result[k] = types[val];
    } else {
      result[k] = val;
    }
  });
  return result;
};
