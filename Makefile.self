Makefile.self:
	@:

lint:
	@stylelint 'src/**/*.scss' --fix && bash ./node_modules/.bin/musical-patterns-cli lint
