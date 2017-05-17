import { get_proposal_parameters as get_param } from '../src/proposal_parameters.js';
import { expect } from 'chai';
import { constants } from './constants';

describe('Using proposal response to generate bet parameters', () => {
    const proposal_response = constants.proposal.default;
    const active_symbols = constants.active_symbols;
    it('throws error for unsupported proposal response', () => {
        let proposal_response = 'abcd';
        expect(() => get_param(proposal_response)).to.throw('Unsupported proposal response.')
        proposal_response = {};
        expect(() => get_param(proposal_response)).to.throw('Unsupported proposal response.')
        proposal_response = { echo_req: {} };
        expect(() => get_param(proposal_response)).to.throw('Unsupported proposal response.')
        proposal_response = { proposal: {} };
        expect(() => get_param(proposal_response)).to.throw('Unsupported proposal response.')
    });
    it('throws error for no active_symbols', () => {
        expect(() => get_param(proposal_response)).to.throw('Param 2 missing. Active symbols is required.');
        expect(() => get_param(proposal_response, {})).to.throw('Param 2 missing. Active symbols is required.');
    });
    it('sets correct default parameter', () => {
        const param = get_param(proposal_response, active_symbols);
        expect(param.bet_type).to.equal('CALL');
        expect(param.currency).to.equal('USD');
        expect(param.underlying_symbol).to.equal('R_10');
        expect(param.amount_type).to.equal('payout');
        expect(param.amount).to.equal('10.00');
        expect(param.date_start).to.equal(1494994408);
    });
    it('sets correct underlying based on symbol', () => {
        const param = get_param(proposal_response, active_symbols);
        expect(param.underlying).to.equal('Volatility 10 Index');
    });
    it('No barrier', () => {
        const param = get_param(proposal_response, active_symbols);
        expect(param.barrier_count).to.equal(0);
        expect(param.barrier).to.equal(undefined);
        expect(param.high_barrier).to.equal(undefined);
        expect(param.low_barrier).to.equal(undefined);
        expect(param.barrier_absolute).to.equal(undefined);
    });
    it('One Barrier', () => {
        const param = get_param(constants.proposal['One barrier'], active_symbols);
        expect(param.barrier_count).to.equal(1);
        expect(param.barrier).to.equal('0.360');
        expect(param.high_barrier).to.equal(undefined);
        expect(param.low_barrier).to.equal(undefined);
        expect(param.barrier_absolute).to.equal(undefined);
    });
    it('One absolute barrier', () => {
        const param = get_param(constants.proposal['One absolute barrier'], active_symbols);
        expect(param.barrier_count).to.equal(1);
        expect(param.barrier).to.equal('10787.629');
        expect(param.high_barrier).to.equal(undefined);
        expect(param.low_barrier).to.equal(undefined);
        expect(param.barrier_absolute).to.equal(1);
    });
    it('Two barrier', () => {
        const param = get_param(constants.proposal['Two barrier'], active_symbols);
        expect(param.barrier_count).to.equal(2);
        expect(param.barrier).to.equal(undefined);
        expect(param.high_barrier).to.equal('1.250');
        expect(param.low_barrier).to.equal('-1.763');
        expect(param.barrier_absolute).to.equal(undefined);
    });
    it('Two absolute barrier', () => {
        const param = get_param(constants.proposal['Two absolute barrier'], active_symbols);
        expect(param.barrier_count).to.equal(2);
        expect(param.barrier).to.equal(undefined);
        expect(param.high_barrier).to.equal('10787.629');
        expect(param.low_barrier).to.equal('10693.002');
        expect(param.barrier_absolute).to.equal(1);
    });
    it('sets tick properties for Tick trades', () => {
        const param = get_param(constants.proposal['Tick'], active_symbols);
        expect(param.tick_expiry).to.equal(1);
        expect(param.tick_count).to.equal(5);
    });
    it('converts duration to timestamps', () => {
        const param = get_param(constants.proposal['Duration'], active_symbols);
        expect(param.date_expiry).to.equal(1495061274);
    });
    it('sets date_expiry from request', () => {
        const param = get_param(constants.proposal['date_expiry'], active_symbols);
        expect(param.date_expiry).to.equal(1495038900);
    });
    it('throws error if no date_expiry could be determined', () => {
        expect(() => get_param(constants.proposal['No date_expiry'], active_symbols))
            .to.throw('Cannot determine expiry date.');
    });
    it('sets is_forward_starting value for forward starting contracts', () => {
        const param = get_param(constants.proposal['forward starting'], active_symbols);        
        expect(param.is_forward_starting).to.equal(1);
    });
});
