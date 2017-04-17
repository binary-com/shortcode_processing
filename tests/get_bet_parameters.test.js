import {get_bet_parameters} from '../dist/main.js';
import {expect} from 'chai';

describe('get_bet_parameters',() => {
    it('lists all the bet parameters', () => {
        expect(get_bet_parameters()).to.equal('abcd');
    })
})