const isLength = (str, { min, max }) =>
  str && str.length >= min && str.length <= max;

module.exports = isLength;
