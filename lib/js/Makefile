# macro
MYSRCS	= \
	main.js			\
				\
	svg/svg.js		\
	svg/Circle.js		\
	svg/Rect.js		\
	svg/Path.js		\
	svg/Drawable.js		\
				\
	vml/vml.js		\
	canvas/canvas.js

ROOTSRC = main.js
TESTSRC = test.js

# proc
.PHONY:	all clean

all:	cmp test

clean:
	rm -rf fashion.js fashion_test.js

cmp:	$(MYSRCS)
	export REQUEST_METHOD="GET" QUERY_STRING="file=$(ROOTSRC)"
	./compile.py -c > fashion.js

test:	*.test.js
	export REQUEST_METHOD="GET" QUERY_STRING="file=$(TESTSRC)"
	./compile.py -c > fashion_test.js

