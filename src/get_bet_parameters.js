/**
 * Created by Apoorv Joshi on 17/04/2017
 * @param {*} shortcode 
 * @param {*} currency 
 * @param {*} is_sold 
 */

import {find} from './utils';


export const get_bet_parameters = (shortcode, currency, is_sold, active_symbols) => {
    let parameters = {
        bet_type: 'Invalid',
        underlying: 'config',
        currency: currency
    };
    if(!active_symbols)
        throw 'Active Symbols list not present';
    //Contracts with barrier
    let match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)_S?(-?\d+)P?_S?(-?\d+)P?/);
    if (!match) { // Contracts without barriers. Eg: 'Asians'. (Not being racist, it is actually a contract type. Believe me!)
        match = shortcode.match(/^([^_]+)_([\w\d^_]+)_(\d*\.?\d*)_(\d+F?)_(\d+[FT]?)/);
        if (match) {
            let underlying = find(active_symbols, underlying => underlying.symbol === match[2]);
            parameters = {
                barrier_count: 0,
                shortcode: match[0],
                bet_type: match[1],
                underlying: underlying.market_display_name,
                underlying_symbol: match[2],
                amount_type: 'payout',
                amount: +match[3],
                date_start: +match[4],
                tick_expiry: 1,
                tick_count: +match[5].toUpperCase().replace('T', '')
            }
        }
    } else { // Normal contracts with at least 1 barrier.
        let underlying = find(active_symbols, underlying => underlying.symbol === match[2]);
        parameters = {
            shortcode: match[0],
            bet_type: match[1],
            underlying_symbol: match[2],
            underlying: underlying.market_display_name,
            amount_type: 'payout',
            amount: +match[3],
            date_start: +match[4].toUpperCase().replace('F', '')
        }
        if (match[4].toUpperCase().indexOf('F') !== -1) parameters.starts_as_forward_starting = 1;
        if (match[5].toUpperCase().indexOf('T') !== -1) { // Tick trade
            parameters.tick_expiry = 1;
            parameters.tick_count = +match[5].toUpperCase().replace('T', '');
        } else {
            if (match[5].toUpperCase().indexOf('F') !== -1) parameter.fixed_expiry = 1;
            parameters.date_expiry = +match[5].toUpperCase().replace('F', '')
        }
        if (+match[6] === 0) { // No barrier
            parameters.barrier_count = 0;
        } else if (+match[7] === 0) { //Only one barrier available
            parameters.barrier = +match[6] * underlying.pip;
            parameters.barrier_count = 1;
        } else { // Two barriers available
            parameters.high_barrier = +match[6] * underlying.pip;
            parameters.low_barrier = +match[7] * underlying.pip;
            parameters.barrier_count = 2;
        }
    }

    parameters.currency = currency;
    parameters.is_sold = is_sold;

    return parameters;
}
