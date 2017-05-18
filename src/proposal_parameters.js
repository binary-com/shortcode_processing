import { find } from './utils';
import { durationToEpoch } from '../src/utils.js';

export const get_proposal_parameters = (raw_response, active_symbols) => {
    // Fail safe for wierdos.
    if (typeof raw_response !== 'object' || !raw_response.echo_req || !raw_response.proposal)
        throw 'Unsupported proposal response.';
    //We should never reach here
    if (!active_symbols || Object.prototype.toString.call(active_symbols) !== "[object Array]") {
        throw 'Param 2 missing. Active symbols is required.';
    }
    const request = raw_response.echo_req;
    const response = raw_response.proposal;
    const parameters = {};
    // Set bet type
    parameters.bet_type = request.contract_type;
    parameters.currency = request.currency;
    parameters.underlying_symbol = request.symbol;
    parameters.amount_type = 'payout';
    parameters.amount = (+response.payout).toFixed(2);
    parameters.date_start = +response.date_start;

    const underlying = find(active_symbols, obj =>
        obj.symbol.toUpperCase() === parameters.underlying_symbol.toUpperCase()
    );
    const digits_after_decimal = underlying.pip ? ('' + underlying.pip).split('.')[1].length : 2;

    parameters.underlying = underlying.display_name;
    set_barriers(parameters, request, digits_after_decimal);
    calculate_ts(parameters, raw_response);

    // is forward starting ?
    if (request.date_start) {
        parameters.is_forward_starting = 1;
    }

    return parameters;
}

function set_barriers(parameters, request, digits_after_decimal) {
    parameters.barrier_count = request.barrier ? request.barrier2 ? 2 : 1 : 0;
    if (parameters.barrier_count === 1)
        parameters.barrier = parameters.bet_type.startsWith('DIGIT') ? request.barrier : (+request.barrier).toFixed(digits_after_decimal);
    if (parameters.barrier_count === 2) {
        parameters.high_barrier = (+request.barrier).toFixed(digits_after_decimal);
        parameters.low_barrier = (+request.barrier2).toFixed(digits_after_decimal);
    }
    if (request.barrier && /^\d+\.?\d+$/.test(request.barrier))
        parameters.barrier_absolute = 1;
}

//Function to calculate date_start and date_expiry based on duration value.
function calculate_ts(parameters, raw_response) {
    if (raw_response.echo_req.duration_unit && raw_response.echo_req.duration_unit.toLowerCase() === 't') {
        parameters.tick_expiry = 1;
        parameters.tick_count = raw_response.echo_req.duration;
    } else if (raw_response.echo_req.duration_unit && raw_response.echo_req.duration) {
        const duration = {
            duration_unit: raw_response.echo_req.duration_unit,
            duration: raw_response.echo_req.duration
        }
        parameters.date_expiry = durationToEpoch(raw_response.proposal.date_start, duration);
    } else if (raw_response.echo_req.date_expiry) {
        parameters.date_expiry = +raw_response.echo_req.date_expiry;
        parameters.fixed_expiry = 1;
    } else {
        throw 'Cannot determine expiry date.';
    }
}
