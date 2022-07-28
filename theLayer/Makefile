build-TheLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs/node_modules/theLayer"
	npm ci
	npm run compile
	cp -R dist/* "$(ARTIFACTS_DIR)/nodejs/node_modules/theLayer"
	cp package-dist.json "$(ARTIFACTS_DIR)/nodejs/node_modules/theLayer/package.json"
	cp -R node_modules/* "$(ARTIFACTS_DIR)/nodejs/node_modules"
