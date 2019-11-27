export const formatTime = date => {
  const [, ...timestamp] = date
    .toLocaleString('en-US', { timeZone: 'America/New_York' })
    .split(' ');
  return timestamp.join(' ');
};

export const formatDateTime = date => {
  const [datestamp, ...timestamps] = date
    .toLocaleString('en-US', { timeZone: 'America/New_York' })
    .split(' ');
  return `${datestamp} ${timestamps.join(' ')}`;
};
