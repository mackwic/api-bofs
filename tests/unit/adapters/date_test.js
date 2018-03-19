const dateAdapter = require('../../../src/adapters/date');
const assert = require('assert');

describe('Date', () => {
  describe('.parseNextBofsDate(:rawDate)', () => {
    describe('When rawDate uses the DD MM YYYY format', () => {
      it('returns a date using the yyyy-mm-dd format', () => {
        const result = dateAdapter.parseNextBofsDate('23 avril 2018');
        assert.equal(result, '2018-04-23');
      });
    });
    describe('When rawDate does not use the DD MM YYYY format', () => {
      it('returns a date using the yyyy-mm-dd format', () => {
        assert.throws(() => dateAdapter.parseNextBofsDate('23-04-2018'), Error);
      });
    });
  });
});
