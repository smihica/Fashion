# macro
MYSRCS	= \
	src/Base.js		 	\
	src/Circle.js	 		\
	src/Color.js	 		\
	src/Drawable.js	 		\
	src/MouseEvt.js 		\
	src/MouseEventsHandler.js	\
	src/Path.js			\
	src/PathData.js			\
	src/Rect.js			\
	src/Shape.js	 		\
	src/Stroke.js	 		\
	src/Text.js		 	\
	src/conf.js		 	\
	src/main.js		 	\
	src/util/Matrix.js		\
	src/util/Path.js		\
	src/util/Style.js		\
	src/util/util.js		\
	src/lib/MultipleKeyHash.js 	\
	src/lib/browser.js 		\
	src/lib/classify.js 		\
	src/lib/error.js	 	\
	src/lib/misc.js	 		\
	src/lib/lib.js	 		\
					\
	backends/BaseImpl.js		\
	backends/DrawableImpl.js	\
	backends/MouseEvtImpl.js	\
	backends/PathImpl.js		\
	backends/ShapeImpl.js		\
	backends/TextImpl.js		\
	backends/backend.js		\
					\
	backends/canvas/canvas.js	\
					\
	backends/svg/svg.js		\
	backends/svg/Base.js		\
	backends/svg/Circle.js		\
	backends/svg/Drawable.js	\
	backends/svg/MouseEvt.js	\
	backends/svg/Path.js		\
	backends/svg/Rect.js		\
	backends/svg/Text.js		\
	backends/svg/Util.js		\
					\
	backends/vml/vml.js		\
	backends/vml/Base.js		\
	backends/vml/Circle.js		\
	backends/vml/Drawable.js	\
	backends/vml/MouseEvt.js	\
	backends/vml/Path.js		\
	backends/vml/Rect.js		\
	backends/vml/Text.js		\
	backends/vml/Util.js


ROOTSRC = src/main.js

# proc
.PHONY:	all clean

all:	cmp

clean:
	rm -rf fashion.js fashion_test.js

cmp:	$(MYSRCS)
	export REQUEST_METHOD="GET" QUERY_STRING="file=$(ROOTSRC)"; ./compile.py -c > fashion.js

check:	$(MYSRCS)
	node_modules/nodeunit/bin/nodeunit tests
