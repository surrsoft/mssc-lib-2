
build:
	npm run rollup

publish:
	npm publish

# build & publish
bp:
	npm run rollup && npm publish

storybook_start:
	npm run storybook

json-server-start:
	npm run json-server-start

rsuv-update:
	npm i rsuv-lib@latest
