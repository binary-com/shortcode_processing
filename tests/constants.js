export const constants = {
    proposal: {
        default: {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 5,
                "duration_unit": "t", "proposal": 1, "req_id": 195, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "passthrough": null, "proposal": {
                "ask_price": "5.15", "date_start": "1494994408",
                "display_value": "5.15", "id": "870f37b7-bd8c-6046-7ae5-b6efc1b3e5ba",
                "longcode": "Win payout if Volatility 10 Index after 5 ticks is strictly higher than entry spot.",
                "payout": "10", "spot": "10740.108", "spot_time": "1494994408"
            },
            "req_id": 195
        },
        'One barrier': {
            "echo_req": {
                "amount": 10, "barrier": "+0.36", "basis": "payout", "contract_type": "CALL",
                "currency": "USD", "duration": 2, "duration_unit": "m", "proposal": 1, "req_id": 483, "subscribe": 1,
                "symbol": "R_10"
            }, "msg_type": "proposal", "proposal": {
                "ask_price": "4.47", "date_start": "1495005880",
                "display_value": "4.47", "id": "2f9b1462-42b7-ea47-dd13-36cd2b16da4e",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than entry spot plus 0.360 at 2 minutes after contract start time.",
                "payout": "10", "spot": "10744.395", "spot_time": "1495005880"
            }, "req_id": 483
        },
        'One absolute barrier': {
            "echo_req": {
                "amount": 10, "barrier": "10787.629", "basis": "payout",
                "contract_type": "CALL", "currency": "USD", "duration": 1,
                "duration_unit": "d", "proposal": 1, "req_id": 485, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "proposal": {
                "ask_price": "3.03", "date_start": "1495006152", "display_value": "3.03",
                "id": "b4dd6aaf-2a34-d22f-ed2f-e09a122f6011",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than 10787.629 at close on 2017-05-18.",
                "payout": "10", "spot": "10746.918", "spot_time": "1495006152"
            }, "req_id": 485
        },
        'Two barrier': {
            "echo_req": {
                "amount": 10, "barrier": "+1.25", "barrier2": "-1.763", "basis": "payout",
                "contract_type": "EXPIRYMISS", "currency": "USD", "duration": 2, "duration_unit": "m",
                "proposal": 1, "req_id": 494, "subscribe": 1, "symbol": "R_10"
            }, "msg_type": "proposal", "proposal": {
                "ask_price": "4.91", "date_start": "1495006420",
                "display_value": "4.91", "id": "7b8c5435-ae27-d2ca-1346-6a03a65f5b7f",
                "longcode": "Win payout if Volatility 10 Index ends outside entry spot minus 1.763 to entry spot plus 1.250 at 2 minutes after contract start time.",
                "payout": "10", "spot": "10745.728", "spot_time": "1495006420"
            }, "req_id": 494
        },
        'Two absolute barrier': {
            "echo_req": {
                "amount": 10, "barrier": "10787.629", "barrier2": "10693.002",
                "basis": "payout", "contract_type": "EXPIRYMISS", "currency": "USD", "duration": 1, "duration_unit": "d", "proposal": 1,
                "req_id": 496, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "proposal": {
                "ask_price": "5.32", "date_start": "1495006602", "display_value": "5.32",
                "id": "418b3602-cab8-ede7-b5c5-9d4a0a53c80d",
                "longcode": "Win payout if Volatility 10 Index ends outside 10693.002 to 10787.629 at close on 2017-05-18.",
                "payout": "10", "spot": "10744.203", "spot_time": "1495006602"
            }, "req_id": 496
        },
        'Tick': {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD",
                "duration": 5, "duration_unit": "t", "proposal": 1, "req_id": 500, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "passthrough": null, "proposal": {
                "ask_price": "5.15", "date_start": "1495007500",
                "display_value": "5.15", "id": "d7a93a8e-ccb7-6054-9333-cf56fcf6519d",
                "longcode": "Win payout if Volatility 10 Index after 5 ticks is strictly higher than entry spot.",
                "payout": "10", "spot": "10751.072", "spot_time": "1495007500"
            }, "req_id": 500
        },
        'Duration': {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD", "duration": 14,
                "duration_unit": "h", "proposal": 1, "req_id": 542, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "passthrough": null, "proposal": {
                "ask_price": "5.14", "date_start": "1495010874",
                "display_value": "5.14", "id": "b55c2aa0-763d-a2f7-26a3-c410461a4520",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than entry spot at 14 hours after contract start time.",
                "payout": "10", "spot": "10762.499", "spot_time": "1495010874"
            }, "req_id": 542
        },
        'No date_expiry': {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD",
                "proposal": 1, "req_id": 542, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "passthrough": null, "proposal": {
                "ask_price": "5.14", "date_start": "1495010874",
                "display_value": "5.14", "id": "b55c2aa0-763d-a2f7-26a3-c410461a4520",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than entry spot at 14 hours after contract start time.",
                "payout": "10", "spot": "10762.499", "spot_time": "1495010874"
            }, "req_id": 542
        },
        'date_expiry': {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD", "date_expiry": 1495038900,
                "proposal": 1, "req_id": 552, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "proposal": {
                "ask_price": "5.14", "date_start": "1495011662",
                "display_value": "5.14", "id": "a8e25c8e-23e3-5cef-3156-1d293cabb462",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than entry spot at 2017-05-17 16:35:00 GMT.",
                "payout": "10", "spot": "10769.878", "spot_time": "1495011662"
            }, "req_id": 552
        },
        'forward starting': {
            "echo_req": {
                "amount": 10, "basis": "payout", "contract_type": "CALL", "currency": "USD", "date_expiry": 1495038900,
                "date_start": 1495014600, "proposal": 1, "req_id": 554, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "proposal": {
                "ask_price": "5.14", "date_start": "1495014600",
                "display_value": "5.14", "id": "c8676439-3f83-b02b-4fab-263dadaf052e",
                "longcode": "Win payout if Volatility 10 Index is strictly higher than entry spot at 6 hours 45 minutes after 2017-05-17 09:50:00 GMT.",
                "payout": "10", "spot": "10770.548", "spot_time": "1495012262"
            }, "req_id": 554
        },
        'DIGITMATCH': {
            "echo_req": {
                "amount": 10, "barrier": "0", "basis": "payout", "contract_type": "DIGITMATCH",
                "currency": "USD", "duration": 5, "duration_unit": "t", "proposal": 1, "req_id": 556, "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "passthrough": null, "proposal": {
                "ask_price": "1.10", "date_start": "1495013448",
                "display_value": "1.10", "id": "eb28d50e-e6a3-b50e-a971-df7e06cf737f",
                "longcode": "Win payout if the last digit of Volatility 10 Index is 0 after 5 ticks.",
                "payout": "10", "spot": "10771.584", "spot_time": "1495013448"
            }, "req_id": 556
        },
        'ENDSIN': {
            "echo_req": {
                "amount": 10, "barrier": "+10755.1", "barrier2": "-1.763", "basis": "payout",
                "contract_type": "EXPIRYMISS", "currency": "USD", "duration": 2, "duration_unit": "m", "proposal": 1, "req_id": 558,
                "subscribe": 1, "symbol": "R_10"
            },
            "msg_type": "proposal", "proposal": {
                "ask_price": "2.16", "date_start": "1495013868",
                "display_value": "2.16", "id": "0baeadea-2ee0-dc67-409a-70a4a3114a0b",
                "longcode": "Win payout if Volatility 10 Index ends outside entry spot minus 1.763 to entry spot plus 10755.100 at 2 minutes after contract start time.",
                "payout": "10", "spot": "10774.050", "spot_time": "1495013868"
            }, "req_id": 558
        }
    },
    active_symbols: [{
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
    }]
};
