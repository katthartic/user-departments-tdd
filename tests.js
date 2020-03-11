const { expect } = require('chai');
const db = require('./db');
describe('Database tests', () => {
  let seed;
  beforeEach(async () => (seed = await db.sync()));
  describe('data layer', () => {
    it('User databse should include moe, larry, curly', () => {
      expect(seed.users.moe.name).to.equal('moe');
      expect(seed.users.curly.name).to.equal('curly');
      expect(seed.users.larry.name).to.equal('larry');
    });
    it('Department database should include it, sales, hr', () => {
      expect(seed.departments.it.name).to.equal('it');
      expect(seed.departments.sales.name).to.equal('sales');
      expect(seed.departments.hr.name).to.equal('hr');
    });
  });
});
