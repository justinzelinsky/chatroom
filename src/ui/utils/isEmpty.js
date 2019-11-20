const isEmpty = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export default isEmpty;
