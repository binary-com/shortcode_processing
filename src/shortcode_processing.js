import {get_bet_parameters as getParameters} from './get_bet_parameters.js';

export class ShortcodeProcessing {
    constructor(active_symbols, lang) {
        this.active_symbols = active_symbols;
        this.lang = lang || 'en'; // EN is fallback language.
    }

    getActiveSymbols() {
        return this.active_symbols;
    }

    getCurrentLanguage() {
        return this.lang;
    }

    setCurrentLanguage(lang) {
        this.lang = lang;
    }

    getBetParameters(shortcode) {
        return getParameters(shortcode);
    }
}
