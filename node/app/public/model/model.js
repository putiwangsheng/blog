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

model.getAll = (aurl, turl) => {
    return Promise.all([model.getArticleList(aurl), model.getTagInfo(turl)]);
};

export default model;
