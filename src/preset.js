const { Preset } = require('use-preset');

module.exports = Preset.make('nextjs-preset')
	.copyTemplates()
	.installDependencies();
