//Store Javascript, where I have my properties that may or may not be changed by actions within my Bookmarks
const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let itemExpanded = true;

function findById(id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

function addItem(item) {
  this.bookmarks.push(item);
}

function findAndUpdate(id, newData) {
  const updateItem = this.bookmarks.find(item => item.id==id);
  Object.assign(updateItem, newData);
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(bookmarks => bookmarks.id !== id);
}

function setError(error) {
  this.error = error;
}

export default {
  error,
  bookmarks,
  adding,
  filter,
  itemExpanded,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  setError,
};