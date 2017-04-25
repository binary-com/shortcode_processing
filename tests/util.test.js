import { dateProcessor } from '../src/utils.js';
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
})