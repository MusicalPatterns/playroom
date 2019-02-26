Makefile.self:
	@:

lint:
	@stylelint 'src/**/*.scss' --fix && musical-patterns-cli lint
