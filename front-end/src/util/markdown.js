var marked = require("marked");
// var hljs = require("highlight.js");
var util = {};
util.toMarkdown = text => {
    return marked(text);
};

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
});

export default util;