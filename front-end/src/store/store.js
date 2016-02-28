import { Promise } from 'es6-promise';
import url from '../url.js';

var store = {};
const perPage = store.perPage = 10;

store.getItem = id => {
    return new Promise((resolve, reject) => {
        $.get(url.articleUrl + '?_id=' + id, function(data){
            isString(data);
            resolve(data[0]);
      });
    });
};

// get items according to given ids
store.getItems = ids => {
    return Promise.all(ids.map(id => store.getItem(id)));
};

store.getArticlesByPage = (page, articleIds) => {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const ids = articleIds.slice(start, end);
    return store.getItems(ids);
};

store.getRequestInfo = url => {
    return new Promise((resolve, reject) => {
        $.get(url, function(data){
            isString(data);
            resolve(data);
      });
    });
};

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
