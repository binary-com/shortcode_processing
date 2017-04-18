import { longcode } from '../src/longcode_generator.js';
import { get_bet_parameters } from '../src/get_bet_parameters.js';
import { expect } from 'chai';

describe('Longcode Generator', () => {
    const active_symbols = [{
        "allow_forward_starting": 1,
        "display_name": "Bull Market Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.0001",
        "submarket": "random_daily",
        "submarket_display_name": "Daily Reset Indices",
        "symbol": "RDBULL",
        "symbol_type": "stockindex"
    },
    {
        "allow_forward_starting": 1,
        "display_name": "Volatility 10 Index",
        "exchange_is_open": 1,
        "is_trading_suspended": 0,
        "market": "volidx",
        "market_display_name": "Volatility Indices",
        "pip": "0.001",
        "submarket": "random_index",
        "submarket_display_name": "Continuous Indices",
        "symbol": "R_10",
        "symbol_type": "stockindex"
    }];

    it('Sends longcode for ASIANU contract type.', () => {
        const param = get_bet_parameters('ASIANU_R_10_3.88_1492410252_5T', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 3.88 USD if the last tick of Volatility 10 Index is strictly higher than the average of the 5 ticks.');
    });

    it('Sends longcode for ASIAND contract type.', () => {
        const param = get_bet_parameters('ASIAND_R_10_3.88_1492410530_5T', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 3.88 USD if the last tick of Volatility 10 Index is strictly lower than the average of the 5 ticks.');
    });

    it('Sends longcode for CALL contract type having no barrier and tick as duration.', () => {
        const param = get_bet_parameters('CALL_R_10_10_1492495694_5T_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index after 5 ticks is strictly higher than entry spot.');
    });

    it('Sends longcode for CALL contract type having +ve barrier and tick as duration.', () => {
        const param = get_bet_parameters('CALL_R_10_10_1492495842_5T_S364P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index after 5 ticks is strictly higher than entry spot plus 0.364.');
    });

    it('Sends longcode for CALL contract type having -ve barrier and tick as duration.', () => {
        const param = get_bet_parameters('CALL_R_10_10_1492496024_5T_S-364P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index after 5 ticks is strictly higher than entry spot minus 0.364.');
    });

    it('Sends longcode for forward starting CALL contract type.', () => {
        let param = get_bet_parameters('CALL_R_10_10_1492498500F_1492502760_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at 1 hour 11 minutes after 2017-04-18 06:55:00 GMT.');
        param = get_bet_parameters('CALL_R_10_10_1492501500F_1492552200F_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at 14 hours 5 minutes after 2017-04-18 07:45:00 GMT.');
    });

    it('Sends longcode for intraday CALL contract type having fixed expiry.', () => {
        const param = get_bet_parameters('CALL_R_10_10_1492501145_1492559400F_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at 2017-04-18 23:50:00 GMT.');
    });

    it('Sends longcode for daily CALL contract type having fixed expiry.', () => {
        const param = get_bet_parameters('CALL_R_10_10_1492501623_1493423999F_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at close on 2017-04-28.');
    });

    it('Sends longcode for normal CALL type contracts.', () => {
        let param = get_bet_parameters('CALL_R_10_10_1492501916_1492505656_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at 1 hour 2 minutes 20 seconds after contract start time.');
        param = get_bet_parameters('CALL_R_10_10_1492502097_1493596799_S0P_0', 'USD', 0, active_symbols);
        expect(longcode(param, 'en')).to.equal('Win payout 10 USD if Volatility 10 Index is strictly higher than entry spot at close on 2017-04-30.');
    });
});
