SRC = lib/*.js

include node_modules/make-lint/index.mk

TESTS = test/so

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require test/support/chai \
		--harmony \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		--require test/support/chai \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--require test/support/chai \
		$(TESTS) \
		--bail

.PHONY: test
