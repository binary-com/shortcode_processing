var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

function updateTranslations(options) {
    this.options = options;
}

updateTranslations.prototype.apply = function (compiler) {
    const options = this.options;
    compiler.plugin('done', (compilation, callback) => {
        var messages = path.resolve(options.directory, options.pot);
        var commands = options.languages.map((ln) => {
            ln = path.resolve(options.directory, ln + '.po');
            return 'msgmerge -w 1000 --no-fuzzy-matching --output-file=' + ln + ' ' + ln + ' ' + messages;
        });
        console.log("Updating translation files...");

        function excute_command(commands, i) {
            if (commands[i]) {
                exec(commands[i], function (error, stdout, stderr) {
                    if (error) {
                        console.error(error);
                        return;
                    } else {
                        console.log('\033[0;32m...done\033[0m');
                        excute_command(commands, ++i);
                    }
                });
            }
        }
        excute_command(commands, 0)
    });
};

module.exports = updateTranslations;
