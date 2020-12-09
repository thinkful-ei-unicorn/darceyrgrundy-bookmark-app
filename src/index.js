import $ from 'jquery';
import './index.css';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import './index.css';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      items.forEach((item) => item.expanded = false);
      bookmarks.render();
    });
  bookmarks.allEventListeners();
  bookmarks.render();
};

$(main);