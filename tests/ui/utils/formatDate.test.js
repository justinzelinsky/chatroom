import formatDate from 'ui/utils/formatDate';

describe('formatDate function', () => {
  const date = new Date(1574818337 * 1000); // November 26th, 2019 at 20:32

  it('should correctly format date objects into a timestamp', () => {
    const formattedTime = formatDate(date, true);
    expect(formattedTime).toEqual('8:32:17 PM');
  });

  it('should correctly format date objects into a datetimestamp', () => {
    const formattedDateTime = formatDate(date);
    expect(formattedDateTime).toEqual('11/26/2019, 8:32:17 PM');
  });
});
