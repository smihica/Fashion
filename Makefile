# macro
MYSRCS	= \
	src/main.js			\
					\
	backends/svg/svg.js		\
	backends/svg/Circle.js		\
	backends/svg/Rect.js		\
	backends/svg/Path.js		\
	backends/svg/Drawable.js	\
					\
	backends/vml/vml.js		\
	backends/canvas/canvas.js

ROOTSRC = src/main.js

# proc
.PHONY:	all clean

all:	cmp

clean:
	rm -rf fashion.js fashion_test.js

cmp:	$(MYSRCS)
	export REQUEST_METHOD="GET" QUERY_STRING="file=$(ROOTSRC)"; ./compile.py -c > fashion.js

test:	$(MYSRCS)
	node_modules/nodeunit/bin/nodeunit tests
