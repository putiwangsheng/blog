import { Promise } from 'es6-promise';
import url from '../util/url.js';

var store = {};
const perPage = store.perPage = 5;

store.getRequestInfo = url => {
    return new Promise((resolve, reject) => {
        $.get(url, function(data){
            isString(data);
            resolve(data);
      });
    });
};

// get items according to page
store.getArticlesByPage = (page) => {
    var pageUrl = url.articleUrl + '?limit=' + perPage + '&skip=' + (page - 1) * perPage;
    return store.getRequestInfo(pageUrl);
};

//get infomation of articles and tags
store.getAll = (articleUrl, tagUrl) => {
    return Promise.all([store.getRequestInfo(articleUrl), store.getRequestInfo(tagUrl)]);
};

store.getDate = date => {
        var dateArr = date.split('T');
        return dateArr[0];
};

function isString(data){
    if(typeof data === "string"){
        data = JSON.parse(data);
    }
}

export default store;
