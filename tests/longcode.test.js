import { Longcode } from '../src/longcode.js';
import { expect } from 'chai';
import { constants } from './constants';

describe('Main module', () => {
  const active_symbols = constants.active_symbols;

  it('Constructor test', () => {
    let sp = new Longcode(active_symbols, 'EUR');
    expect(sp.getCurrentCurrency()).to.equal('EUR');

    sp = new Longcode(active_symbols);
    expect(sp.getCurrentCurrency()).to.equal('USD');
    expect(sp.getCurrentLanguage()).to.equal('en');
    expect(() => { new Longcode() }).to.throw('Param 1 containing active_symbols is missing.');

    sp = new Longcode(active_symbols, 'id', 'EUR');
    expect(sp.getCurrentCurrency()).to.equal('EUR');
    expect(sp.getCurrentLanguage()).to.equal('id');

    sp = new Longcode(active_symbols, 'id');
    expect(sp.getCurrentCurrency()).to.equal('USD');
    expect(sp.getCurrentLanguage()).to.equal('id');
  });

  it('Returns bet parameter', () => {
    let sp = new Longcode(active_symbols, 'en', 'EUR');
    expect(sp.getBetParameters('CALL_R_10_70.73_1492407012_5T_S1366P_0')).to.deep.equal({
      amount: '70.73',
      amount_type: 'payout',
      barrier: '1.366',
      barrier_count: 1,
      bet_type: 'CALL',
      currency: 'EUR',
      date_start: 1492407012,
      shortcode: 'CALL_R_10_70.73_1492407012_5T_S1366P_0',
      tick_count: 5,
      tick_expiry: 1,
      underlying: 'Volatility 10 Index',
      underlying_symbol: 'R_10'
    });
  });

  it('Returns longcode', () => {
    let longcode = new Longcode(active_symbols, 'en', 'EUR');
    expect(longcode.get('EXPIRYRANGE_RDBULL_10_1492589411_1492590000F_S1776P_S-1775P'))
      .to.equal('EUR 10.00 payout if Bull Market Index ends strictly between entry' +
      ' spot minus 0.1775 to entry spot plus 0.1776 at 2017-04-19 08:20:00 GMT.');
  });

  it('Returns longcode for proposal object', () => {
    let longcode = new Longcode(active_symbols, 'en', 'EUR');
    expect(longcode.get(constants.proposal['forward starting']))
      .to.equal('USD 10.00 payout if Volatility 10 Index is strictly higher than entry spot at 6 hours 45 minutes after 2017-05-17 09:50:00 GMT.')
  });
});
