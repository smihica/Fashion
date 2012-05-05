var Fashion = require('../fashion.js');

exports._lib_css = {
  testParseCSSRules: function(test) {
    test.expect(13);
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules("a:a"));
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules(" a:a"));
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules("a:a "));
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules("a :a"));
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules("a: a"));
    test.deepEqual({ 'a': ['a'] }, Fashion._lib._parseCSSRules("a : a"));
    test.deepEqual({ 'a': ['z'] }, Fashion._lib._parseCSSRules("a: \\z"));
    test.deepEqual({ 'a': [' '] }, Fashion._lib._parseCSSRules("a: \\ "));
    test.deepEqual({ 'a': ['\u000a'] }, Fashion._lib._parseCSSRules("a: \\a"));
    test.deepEqual({ 'a': ['#aaa'] }, Fashion._lib._parseCSSRules("a: \\#aaa"));
    test.deepEqual({ 'a': ['AB'] }, Fashion._lib._parseCSSRules("a: \\41 \\42"));
    test.deepEqual({ 'a': ['rgb(0,0,0)'] }, Fashion._lib._parseCSSRules("a: \\rgb(0,0,0)"));
    test.equal(String.fromCharCode(0x1f603), Fashion._lib._parseCSSRules("a: \\d83d\\de03").a[0]);
    test.done();
  }
};
/*
 * vim: sts=2 sw=2 ts=2 et
 */
