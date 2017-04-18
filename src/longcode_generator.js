import { Translation } from '../src/translation.js';
import moment from 'moment';

let t;

const contract_map = {
    ASIANU: (param) => {
        return t.translate('Win payout [amount] [currency] if the last tick of [underlying] is strictly higher than the average of the [tick_count] ticks.', param);
    },
    ASIAND: (param) => {
        return t.translate('Win payout [amount] [currency] if the last tick of [underlying] is strictly lower than the average of the [tick_count] ticks.', param);
    },
    CALL: (param) => {
        if (param.barrier_count === 0) {
            param.entry_spot = 'entry spot';
        } else {
            if (param.barrier > 0)
                param.entry_spot = 'entry spot plus ' + Math.abs(param.barrier);
            else
                param.entry_spot = 'entry spot minus ' + Math.abs(param.barrier);
        }

        if (param.tick_expiry === 1) { // Tick trade
            return t.translate('Win payout [amount] [currency] if [underlying] after [tick_count] ticks is strictly higher than [entry_spot].', param)
        }

        if (param.is_forward_starting === 1) {
            param.duration = get_duration(param.date_expiry - param.date_start);
            param.date_start = get_date_time(param.date_start);
            return t.translate('Win payout [amount] [currency] if Volatility 10 Index is strictly higher than entry spot at [duration] after [date_start].', param)
        }

        if (param.fixed_expiry === 1) {
            if (is_daily(param.date_expiry - param.date_start)) //Daily
                param.date_expiry = 'close on ' + get_date(param.date_expiry);
            else //Intraday
                param.date_expiry = get_date_time(param.date_expiry);

            return t.translate('Win payout [amount] [currency] if Volatility 10 Index is strictly higher than entry spot at [date_expiry].', param)
        }

        if (is_daily(param.date_expiry - param.date_start)) {
            // Daily normal constracts. 
            param.date_expiry = 'close on ' + get_date(param.date_expiry);
            return t.translate('Win payout [amount] [currency] if Volatility 10 Index is strictly higher than entry spot at [date_expiry].', param)
        }
        // Intraday normal contracts having duration in minutes, seconds, or hours.
        param.duration = get_duration(param.date_expiry - param.date_start);
        return t.translate('Win payout [amount] [currency] if Volatility 10 Index is strictly higher than entry spot at [duration] after contract start time.', param)
    }
}

const get_duration = (diff) => {
    const duration = moment.duration(diff * 1000);
    let duration_str = '';
    if (duration.days()) duration_str += t.translate('[n] day', '[n] days', { n: duration.days() });
    if (duration.hours())
        duration_str += duration_str ? ' ' + t.translate('[n] hour', '[n] hours', { n: duration.hours() }) : t.translate('[n] hour', '[n] hours', { n: duration.hours() });
    if (duration.minutes())
        duration_str += duration_str ? ' ' + t.translate('[n] minute', '[n] minutes', { n: duration.minutes() }) : t.translate('[n] minute', '[n] minutes', { n: duration.minutes() });
    if (duration.seconds())
        duration_str += duration_str ? ' ' + t.translate('[n] second', '[n] seconds', { n: duration.seconds() }) : t.translate('[n] second', '[n] seconds', { n: duration.seconds() });

    return duration_str;
}

const get_date_time = (ts) => moment.utc(ts * 1000).format('YYYY-MM-DD HH:mm:ss') + ' GMT';
const get_date = (ts) => moment.utc(ts * 1000).format('YYYY-MM-DD');

const is_daily = (diff) => moment.duration(diff * 1000).days() > 0;

export const longcode = (bet_param, lang) => {
    t = new Translation(lang);
    return contract_map[bet_param.bet_type](bet_param);
}
