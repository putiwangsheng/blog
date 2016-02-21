import { Promise } from 'es6-promise';
import url from '../url.js';

var marked = require("marked");
var hljs = require("highlight.js");
var model = {};
const perPage = 10;

model.getIds = articleIds => {
    return new Promise((resolve, reject) => {
        $.get(url.articleUrl, function(data){

          if(typeof data === "string"){
              data = JSON.parse(data);
          }

          for (let i = 0; i < data.length; i++) {
              articleIds[i] = data[i]._id;
          }
          resolve(articleIds);
      });
  });
};

model.getItem = id => {
    return new Promise((resolve, reject) => {
        $.get(url.articleUrl + id, function(data){

          if(typeof data === "string"){
              data = JSON.parse(data);
          }
          resolve(data[0]);
      });
    });
};

model.getArticleList = url => {
    return new Promise((resolve, reject) => {
        $.get(url, function(data){

          if(typeof data === "string"){
              data = JSON.parse(data);
          }
          resolve(data);
      });
    });
};
model.getArticlesByPage = page => {
    var articleIds = [];
    model.getIds(articleIds).then(data => {
        articleIds = data;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const ids = articleIds.slice(start, end);
        return model.test(ids);
    });
};

model.test = ids => {
    return Promise.all(ids.map(id => model.getItem(id)));
};

model.getTagInfo = url => {
    return new Promise((resolve, reject) => {
        $.get(url, function(data){

          if(typeof data === "string"){
              data = JSON.parse(data);
          }
          resolve(data);
      });
  });
};

model.getAll = (articleUrl, tagUrl) => {
    return Promise.all([model.getArticleList(articleUrl), model.getTagInfo(tagUrl)]);
};

model.handleDate = date => {
        var dateArr = date.split('T');
        return dateArr[0];
};

model.toMarkdown = text => {
    return marked(text);
};

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
});

export default model;
