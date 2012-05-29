# macro
UGLIFY_JS = uglifyjs

all: fashion.min.js fashion.svg.min.js fashion.vml.min.js

clean:
	rm -rf fashion.js fashion.min.js fashion.svg.js fashion.svg.min.js fashion.vml.js fashion.vml.min.js

fashion.js: src/*.js src/lib/*.js
	./compile.py -o fashion.js src/main.js

fashion.svg.js: backends/svg/*.js
	./compile.py -o fashion.svg.js backends/svg/svg.js

fashion.vml.js: backends/vml/*.js
	./compile.py -o fashion.vml.js backends/vml/vml.js

fashion.min.js: fashion.js
	$(UGLIFY_JS) $< > $@	

fashion.svg.min.js: fashion.svg.js
	$(UGLIFY_JS) $< > $@	

fashion.vml.min.js: fashion.vml.js
	$(UGLIFY_JS) $< > $@	

check:	$(MYSRCS)
	node_modules/nodeunit/bin/nodeunit tests

.PHONY:	all clean

