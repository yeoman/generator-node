'use strict';
var npmName = require('npm-name');

module.exports = function askName(prompt, generator, cb) {
  var prompts = [prompt, {
    type: 'confirm',
    name: 'askAgain',
    message: 'The name above already exists on npm, choose another?',
    default: true,
    when: function (answers) {
      var done = this.async();

      npmName(answers[prompt.name], function (err, available) {
        if (available) {
          done();
        } else {
          done(true);
        }
      });
    }
  }];

  generator.prompt(prompts, function (props) {
    if (props.askAgain) {
      return askName(prompt, generator, cb);
    }

    cb(props[prompt.name]);
  });
};
