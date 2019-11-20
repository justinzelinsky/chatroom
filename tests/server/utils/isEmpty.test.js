import { isEmpty } from '../../../src/server/utils';

describe('isEmpty function', () => {
  it('should correctly determine empty objects', () => {
    expect(isEmpty({})).toEqual(true);
    expect(isEmpty({ a: 1 })).toEqual(false);
  });
});
