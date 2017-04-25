export const find = (array, fn) => {
    if (Array.prototype.find)
        return Array.prototype.find.call(array, fn);

    let i = 0;
    for (; i < array.length; i++)
        if (fn(array[i]))
            break;

    return array[i];
}

export const dateProcessor = (ts) => {
    ts = parseInt(ts);
    return {
        getDate: () => {
            const dateObj = new Date(ts);
            const date = ('0' + dateObj.getUTCDate()).slice('-2');
            const month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            const year = dateObj.getUTCFullYear();

            return [year, month, date].join('-');
        },
        getDateTime: () => {
            const dateObj = new Date(ts);
            const date = ('0' + dateObj.getUTCDate()).slice('-2');
            const month = ('0' + (dateObj.getUTCMonth() + 1)).slice('-2');
            const year = dateObj.getUTCFullYear();
            const hours = ('0' + dateObj.getUTCHours()).slice('-2');
            const minutes = ('0' + dateObj.getUTCMinutes()).slice('-2');
            const seconds = ('0' + dateObj.getUTCSeconds()).slice('-2');

            return [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
        },
        days: () => {
            return parseInt(ts / (24 * 60 * 60 * 1000));
        },
        hours: () => {
            const day = 24 * 60 * 60 * 1000;
            return parseInt((ts % day) / (60 * 60 * 1000));
        },
        minutes: () => {
            const hour = 60 * 60 * 1000;
            return parseInt((ts % hour) / (60 * 1000));
        },
        seconds: () => {
            const minutes = 60 * 1000;
            return parseInt((ts % minutes) / 1000);
        }
    }
};
