REQUIRED = --require should --require co-mocha

TESTS = test/index.js
LINTS = lib

BIN = iojs

ifeq ($(findstring io.js, $(shell which node)),)
	BIN = node
endif

test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/mocha \
		$(REQUIRED) \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		$(REQUIRED) \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		$(REQUIRED) \
		$(TESTS) \
		--bail

lint:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/eslint \
		$(LINTS)

.PHONY: test
