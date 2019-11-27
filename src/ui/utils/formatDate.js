export const formatDate = (date, onlyTime = false) => {
  const [datestamp, ...timestamps] = date
    .toLocaleString('en-US', { timeZone: 'America/New_York' })
    .split(' ');
  if (onlyTime) {
    return timestamps.join(' ');
  }
  return `${datestamp} ${timestamps.join(' ')}`;
};

export default formatDate;
