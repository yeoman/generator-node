const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('node:cli', () => {
  beforeEach(() => {
    return helpers.run(require.resolve('../generators/cli')).on('ready', generator => {
      generator.fs.write(generator.destinationPath('package.json'), '{"name": "my-lib"}');
    });
  });

  it('creates cli.js', () => {
    assert.file('lib/cli.js');
    assert.fileContent('lib/cli.js', "const meow = require('meow')");
    assert.fileContent('lib/cli.js', "const myLib = require('./')");
  });

  it('Extends package.json', () => {
    assert.fileContent('package.json', '"bin": "lib/cli.js"');
    assert.fileContent('package.json', '"meow"');
    assert.fileContent('package.json', /"lec": "\^/);
    assert.fileContent('package.json', '"prepare": "lec lib/cli.js -c LF"');
  });
});

describe('node:cli', () => {
  beforeEach(() => {
    return helpers
      .run(require.resolve('../generators/cli'))
      .withOptions({ generateInto: 'other/' })
      .on('ready', generator => {
        generator.fs.write(
          generator.destinationPath('other/package.json'),
          '{"name": "my-lib"}'
        );
      });
  });

  it('creates cli.js with path option', () => {
    assert.file('other/lib/cli.js');
  });
});
