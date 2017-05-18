import { dateProcessor } from '../src/utils.js';
import { durationToEpoch } from '../src/utils.js';
import { expect } from 'chai';

describe('Duration', () => {
    it('returns date', () => {
        const d = dateProcessor(1492732799 * 1000);
        expect(d.getDate()).to.equal('2017-04-20');
    });

    it('returns date and time', () => {
        const d = dateProcessor(1492592280 * 1000);
        expect(d.getDateTime()).to.equal('2017-04-19 08:58:00');
    });

    it('returns day', () => {
        const d = dateProcessor(1492592280 * 1000);
        expect(d.getDateTime()).to.equal('2017-04-19 08:58:00');
    });

    it('returns hours', () => {
        const d = dateProcessor((1492600816 - 1492595816) * 1000);
        expect(d.hours()).to.equal(1);
    });

    it('returns minutes', () => {
        const d = dateProcessor((1492600816 - 1492595816) * 1000);
        expect(d.minutes()).to.equal(23);
    });

    it('returns seconds', () => {
        const d = dateProcessor((1492600816 - 1492595816) * 1000);
        expect(d.seconds()).to.equal(20);
    });
});

describe('Timestamp', () => {
    it('gives timestamp for duration in seconds', () => {
        const date_start = 1492407769;
        const duration = {
            duration_unit: 's',
            duration: '40'
        }
        expect(durationToEpoch(date_start, duration)).to.equal(1492407809);
    });
    it('gives timestamp for duration in minutes', () => {
        const date_start = 1492407769;
        const duration = {
            duration_unit: 'm',
            duration: '40'
        }
        expect(durationToEpoch(date_start, duration)).to.equal(1492410169);
    });
    it('gives timestamp for duration in hours', () => {
        const date_start = 1492407769;
        const duration = {
            duration_unit: 'h',
            duration: '40'
        }
        expect(durationToEpoch(date_start, duration)).to.equal(1492551769);
    });
    it('gives timestamp for duration in days', () => {
        const date_start = 1492407769;
        const duration = {
            duration_unit: 'd',
            duration: '40'
        }
        expect(durationToEpoch(date_start, duration)).to.equal(1495863769);
    });
});