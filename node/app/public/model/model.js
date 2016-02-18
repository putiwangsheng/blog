import { Promise } from 'es6-promise';

var model = {};

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
    var markdown = require("markdown").markdown;
    return markdown.toHTML(text);
};

export default model;
