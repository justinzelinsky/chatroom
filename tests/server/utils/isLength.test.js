import { isLength } from 'server/utils';

describe('isLength function', () => {
  it('should correctly determine if strings have valid lengths', () => {
    expect(isLength('str', { min: 1, max: 4 })).toEqual(true);
    expect(isLength('helloworld', { min: 1, max: 5 })).toEqual(false);
    expect(isLength('hey', { min: 4, max: 10 })).toEqual(false);
  });
});
