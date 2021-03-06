import $ from 'jquery';
import store from './store.js';
import api from './api.js';

//this generates a return statement that goes into render with two possible variables
function generateItem(item) {
  let itemTitle = `<div class="expandholder">
  <h2>${item.title}</h2>
<div class="rating-box">
  ${rating(item)}
</div>
<br>
<label class="bookmark-link"> Visit site: <a href="${item.url}" target="new_blank" class="link-to-page">${item.url}</a> </label>
<section class="bookmark-description">${item.desc}</section><br>
  <div class="bookmark-item-controls">
      <button class="bookmark-item-delete js-item-delete">Delete</button>
  </div>
  </div>`;
  if (!item.expanded) {
    itemTitle = `<div class="bookmark-box">
      <span class="bookmark-item bookmark-item-expanded">${item.title}</span>
      <div class="rating-box">${rating(item)}</div>
      <button type="button" class="bookmark-item-expand">Expand Bookmark Details</button>
    </div>`;
  }
  return `<li class="js-item-element" data-item-id="${item.id}"> ${itemTitle}</li>`;
}


function rating(item) {
  let starsView = [];
  if (item.rating > 1) {
    for (let i = 0; i < item.rating; i++) {
      starsView.push(`<label type='radio' checked='checked' class='starView' >☆</label>`);
    }
  }
  return starsView.join('');
}

//this joins together all of my individual bookmark list items
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

function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
}

//this returns the view of the 'add bookmark' page
function generateNewForm() {
  return `<div class="error-placement"> </div>
    <div class="adding-status"><p class="adding-text">Please be patient after hitting create on your new bookmark, the team at DarceyTech is aware of the delay.</p></div>
    <form id="js-new-bookmark">
      <label for="bookmark-entry">New Bookmark URL:</label><br>
      <input type="text" id="bookmark-entry" name="url" class="bookmark-url-entry" value="https://" required /><br>
      <label for="bookmark-title-entry">Bookmark Title:</label><br>
      <input type="text" id="bookmark-title-entry" name="title" class="bookmark-title-entry" placeholder="ex: Google" ><br>
      <label for="bookmark-rating-entry">Rating:</label><br>
          <div class="rating">
            <fieldset>
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
            </fieldset>  
            <div class="clear"></div>
          </div>
      <input type="text" name="desc" class="bookmark-description-entry" placeholder="description"><br><br>
      <div class="new-form-button-display">
      <button class="create-new-bookmark">Create</button>
      <button class="cancel-bookmark-submit" type="reset">Cancel</button>
      </div>
    </form>`;
}

//this will show if a submission doesn't have enough information
function generateError(message) {
  return `<section class-"error-content">
  <button id="cancel-error" class="cancel-error">X</button>
  <p>${message}</p>
  </section>`;
}

function generateNewBookForm() {
  return `<div class="new-bookmark">
  <div class="bookmarkview">
    <form id="startview">
      <button class="startnew" button type="button" tabindex="0">+ Add New Bookmark</button><br><br>
      <select id="ratings" name="ratings" label="select-star-rating">
        <option> <span class="button-label" id="starselect">View Bookmarks By Stars</span></option>
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
}

//this places my generated error from above
function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-placement').html(el);
  } else {
    $('.error-placement').empty(); 
  }
}

function handleNewSubmit() {
  $('main').on('click', '.startnew', function event() {
    store.adding = true;
    render();
  });
}

//this will remove my item from the bookmark list
function handleDeleteItemClicked() {
  $('main').on('click', '.js-item-delete', event => {
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

//this tells if user clicked on expand and signals to alternate the view
function handleItemExpandClicked() {
  $('main').on('click', '.bookmark-item-expand', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    item.expanded = !item.expanded;
    render();
  });
}

function handleFilterClick() {
  let filterValue = $('#ratings option:selected').val();
  store.filter = filterValue;
  render();
}

//this tells if the cancel button was clicked in the add bookmark page and returns user back to the page with "add new button" and "filter star view"
function handleNewCancel() {
  $('main').on('click', '.cancel-bookmark-submit', function event() {
    store.adding = false;
    render();
  });
}

//this takes the submitted bookmark info and creates the item on my API
function handleNewItemSubmit() {
  $('main').on('submit', '#js-new-bookmark', event => {
    event.preventDefault();
    const bookmark = $(event.target).serializeJson();
    api.createItem(bookmark)
      .then((bookmark) => {
        store.addItem(bookmark);
        store.adding = false;
        store.filter = 0;
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}


function handleCloseError() {
  $('main').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
}

//this ultimately control my DOM based on different if statements contained in my store js file
function render() {
  renderError();
  let items = [...store.bookmarks];
  items = items.filter(item => item.rating >= store.filter);
  const bookmarkListItemsString = generateBookmarkItemsString(items);
  if (store.adding === false) {
    $('main').html(generateNewBookForm);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  } else if (store.adding) {
    $('.new-bookmark').html(generateNewForm);    
  } else {
    $('.bookmarkview').empty();
  }
}

function allEventListeners() {
  handleNewItemSubmit();
  handleItemExpandClicked();
  handleDeleteItemClicked();
  handleCloseError();
  $('main').on('change','#ratings', handleFilterClick);
  handleNewSubmit();
  handleNewCancel();
}

export default {
  render,
  allEventListeners
};