import { Promise } from 'es6-promise';
import url from '../util/url.js';
import { getRequestInfo } from '../util/fetchData.js';

var store = {};
const perPage = store.perPage = 5;

//store the fetch result in variable
store.getRequestInfo = getRequestInfo;
store.getArticles = getRequestInfo(url.articleUrl);
store.getTags = getRequestInfo(url.tagUrl);

// get items according to page
store.getArticlesByPage = (page) => {
    var pageUrl = url.articleUrl + '?sort=-date&limit=' + perPage + '&skip=' + (page - 1) * perPage;
    store.getByPage = getRequestInfo(pageUrl);
    return store.getByPage;
};

//get infomation of articles and tags
store.getAll = (articleUrl, tagUrl) => {
    return Promise.all([store.getArticles, store.getTags]);
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
