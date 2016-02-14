var fs = require('fs'),
    markdown = require('markdown').markdown;

console.log(markdown.toHTML( "Hello *World*!" ));
