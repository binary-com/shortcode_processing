import { ShortcodeProcessing } from '../src/shortcode_processing.js';
import { expect } from 'chai';

describe('Main module', () => {
    let obj, active_symbols;

    before(() => {
        active_symbols = [{
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
        obj = new ShortcodeProcessing(active_symbols, 'en');
    });

    it('Gets current language', () => {
        expect(obj.getCurrentLanguage()).to.equal('en');
    });

    it('Gets current active_symbols', () => {
        expect(obj.getActiveSymbols()).to.deep.equal(active_symbols);
    });
});