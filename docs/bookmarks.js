/* eslint-disable no-console */
import $ from 'jquery';
import store from './store.js';
import api from './api.js';
import store1 from './store1.js';

//function generateItem
function generateItem(item) {
  let itemTitle = `<form id="js-edit-item-form">
  <input class="bookmark-item" type="text" value="${item.title}" required/>
</form> 
<div class="rating-box">
  ${rating(item)}
</div>
<br>
<label> Visit site: <a href="${item.url}" target="new_blank">${item.url}</a> </label>
<section class="bookmark-description">${item.desc}</section>
  <div class="bookmark-item-controls">
      <button class="bookmark-item-toggle js-item-toggle">Done</button>
      <button class="bookmark-item-delete js-item-delete">Delete</button>
  </div>`;
  if (!item.expanded) {
    itemTitle = `<div class="bookmark-box">
      <span class="bookmark-item bookmark-item-expanded">${item.title}</span>
      <div class="rating-box">${rating(item)}</div>
    </div>`;
  }
  return `<li class="js-item-element" data-item-id="${item.id}"> ${itemTitle}</li>`;
}


//function rating
function rating(item) {
  let starsView = [];
  if (item.rating > 1) {
    for (let i = 0; i < item.rating; i++) {
      starsView.push(`<label type='radio' checked='checked' class='starView' >☆</label>`);
    }
  }
  return starsView.join('');
}

//functiongenbookmarkitemstring
function generateBookmarkItemsString(bookmarksList) {
  const items = bookmarksList.map((item) => generateItem(item));
  return items.join('');
}

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});


//function getitemid
function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-element')
    .data('.item-id');
}

//function generatenewform
function generateNewForm() {
  if (store.adding) {
    const newForm = `<div class="error-placement"> </div>
    <form id="js-new-bookmark">
      <label for="bookmark-entry">New Bookmark URL:</label><br>
      <input type="text" name="url" class="bookmark-url-entry" value="https://" required /><br>
      <label for="bookmark-title-entry">Bookmark Title:</label><br>
      <input type="text" name="title" class="bookmark-title-entry" placeholder="ex: Google" ><br>
      <label for="bookmark-rating-entry">Rating:</label><br>
          <div class="rating">
              <input id="star1" name="rating" type="radio" value="1"/>
              <label for="star1" >1 star</label>
              <input id="star2" name="rating" type="radio" value="2"/>
              <label for="star2" >2 stars</label>
              <input id="star3" name="rating" type="radio" value="3"/>
              <label for="star3" >3 stars</label>
              <input id="star4" name="rating" type="radio" value="4"/>
              <label for="star4" >4 stars</label>
              <input id="star5" name="rating" type="radio" value="5"/>
              <label for="star5" >5 stars</label>
              <div class="clear"></div>
          </div>
      <input type="text" name="desc" class="bookmark-description-entry" placeholder="description"><br>
      <div class = "new-form-button-display">
      <button class="create">create</button>
      <button class="cancel" type="reset">cancel</button>
      </div>
    </form>`;
    $('.new-bookmark').html(newForm);
  } else {
    $('.new-bookmark').empty();
  }
  render();
}

//function generror
function generateError(message) {
  return `<section class-"error-content">
  <button id="cancel">X</button>
  <p>${message}</p>
  </section>`;
}



//function rendererror
function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-placement').html(el);
  } else {
    $('.error-placement').empty(); 
  }
}

//function handlenewsub
function handleNewSubmit() {
  $('.main').on('click', '.startnew', function event() {
    store.adding = true;
    generateNewForm();
  });
}

///myconsole///

//function handledelete
function handleDeleteItemClicked() {
  $('.main').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

//function handleeditbookmark
function handleEditBookmarkItemSubmit() {
  $('.main').on('submit', '#js-edit-item-form', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.bookmark-item').val();
    api.updateItem(id, {title:itemName})
      .then((newItem) => {
        store.findAndUpdate(id, {title:itemName});
        store.filter = 0;
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
}

//function handleitemexpand
function handleItemExpandClicked() {
  $('.main').on('click', '.bookmark-item-expanded', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    item.expanded = !item.expanded;
    render();
  });
}

//function handleclicked
function handleDoneClicked() {
  $('.main').on('click', '.bookmark-item-expanded', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    item.expanded = !item.expanded;
    render();
  });
}

//function handlefilter
function handleFilterClick() {
  let filterValue = $('#ratings option:selected').val();
  store.filter = filterValue;
  render();
}

//function handlecancel
function handleNewCancel() {
  $('.main').on('click', '.cancel', function event() {
    store.adding = false;
    generateNewForm();
    render();
  });
}

//function handlesubmit
function handleNewItemSubmit() {
  $('.main').on('submit', '#js-new-bookmark', event => {
    event.preventDefault();
    const bookmark = $(event.target).serializeJson();
    api.createItem(bookmark)
      .then((bookmark) => {
        store.addItem(bookmark);
        store.adding = false;
        store.filter = 0;
        generateNewForm();
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

//function handlecloseerror
function handleCloseError() {
  $('.main').on('click', '#cancel', () => {
    store.setError(null);
    renderError();
  });
}

//function render
function render() {
  renderError();
  let items = [store.bookmarks];
  items = items.filter(item => item.rating <= store.filter);
  const bookmarkListItemsString = generateBookmarkItemsString(items);
  if (store.adding === false) {
    let html = `<div class="new-bookmark">
    <div class="bookmarkview">
      <form id="startview">
        <button class="startnew" button type="button">Add New Bookmark</button>
        <select id="ratings" name="ratings">
          <option> <span class="button-label"></span>View Bookmarks By Stars</span></option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </form>
    </div>
    <ul class="bookmark-list js-bookmark-list"></ul>
    </div>`;
    //store1.loopInstead();
    // store1.fromExport();
    store1.accordion();
    $('.main').html(html);
    //  $('.js-bookmark-list').html(bookmarkListItemsString);
    //$('.js-bookmark-list').html('Hello');
  } else {
    $('.bookmarkview').empty();
  }
}

function allEventListeners() {
  handleNewItemSubmit();
  handleItemExpandClicked();
  handleDeleteItemClicked();
  handleEditBookmarkItemSubmit();
  handleCloseError();
  $('.main').on('change','#ratings', handleFilterClick);
  handleNewSubmit();
  handleNewCancel();
  handleDoneClicked();
  store1.accordionHandler();
}

export default {
  render,
  allEventListeners
};
