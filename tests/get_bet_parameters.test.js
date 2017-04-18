import { get_bet_parameters } from '../src/get_bet_parameters.js';
import { expect } from 'chai';

describe('get_bet_parameters', () => {
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

    it('Throws error if active_symbols is undefined', () => {
        expect(() => get_bet_parameters('invalid_invalid', 'USD', 0, undefined))
            .to.throw('Active Symbols list not present');
    });

    it('Sends "invalid" as bet_type for unsupported shortcodes', () => {
        expect(get_bet_parameters('invalid_invalid', 'USD', 0, active_symbols).bet_type)
            .to.equal('Invalid');
    });

    it('Lists all the bet parameters for contracts with no barriers (Asians)', () => {
        expect(get_bet_parameters('ASIANU_R_10_3.88_1492410252_5T', 'USD', 0, active_symbols))
            .to.deep.equal({
                barrier_count: 0,
                shortcode: 'ASIANU_R_10_3.88_1492410252_5T',
                bet_type: 'ASIANU',
                underlying: "Volatility 10 Index",
                underlying_symbol: 'R_10',
                amount: 3.88,
                date_start: 1492410252,
                amount_type: 'payout',
                tick_expiry: 1,
                tick_count: 5,
                currency: 'USD',
                is_sold: 0
            });
    });

    it('Lists all the bet parameters for contracts with no barriers (Normal)', () => {
        expect(get_bet_parameters('CALL_R_10_10_1492405008_5T_S0P_0', 'USD', 0, active_symbols))
            .to.deep.equal({
                barrier_count: 0,
                shortcode: 'CALL_R_10_10_1492405008_5T_S0P_0',
                bet_type: 'CALL',
                underlying: "Volatility 10 Index",
                underlying_symbol: 'R_10',
                amount_type: 'payout',
                amount: 10,
                date_start: 1492405008,
                tick_expiry: 1,
                tick_count: 5,
                currency: 'USD',
                is_sold: 0
            });
    });

    it('Lists all the bet parameters for contracts with 1 barriers', () => {
        expect(get_bet_parameters('CALL_R_10_70.73_1492407012_5T_S1366P_0', 'USD', 0, active_symbols))
            .to.deep.equal({
                barrier_count: 1,
                shortcode: 'CALL_R_10_70.73_1492407012_5T_S1366P_0',
                bet_type: 'CALL',
                underlying: "Volatility 10 Index",
                underlying_symbol: 'R_10',
                amount_type: 'payout',
                amount: 70.73,
                date_start: 1492407012,
                tick_expiry: 1,
                tick_count: 5,
                barrier: 1.366,
                currency: 'USD',
                is_sold: 0
            });
    });

    it('Lists all the bet parameters for contracts with 2 barriers', () => {
        expect(get_bet_parameters('EXPIRYRANGE_R_10_3.25_1492407769_1492407889_S1796P_S-1795P', 'USD', 0, active_symbols))
            .to.deep.equal({
                barrier_count: 2,
                shortcode: 'EXPIRYRANGE_R_10_3.25_1492407769_1492407889_S1796P_S-1795P',
                bet_type: 'EXPIRYRANGE',
                underlying: "Volatility 10 Index",
                underlying_symbol: 'R_10',
                amount_type: 'payout',
                amount: 3.25,
                date_start: 1492407769,
                date_expiry: 1492407889,
                high_barrier: 1.796,
                low_barrier: -1.795,
                currency: 'USD',
                is_sold: 0
            });
    });
})