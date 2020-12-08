const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

//function findbyid
function findById(id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

//function additem
function addItem(item) {
  this.bookmarks.push(item);
}

//function findupdate
function findAndUpdate(id, newData) {
  const updateItem = this.bookmarks.find(item => item.id === id);
  Object.assign(updateItem, newData);
}

//function findanddelete
function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(bookmarks => bookmarks.id !== id);
}

//function seterror
function setError(error) {
  this.error = error;
}


export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addItem,
  findAndUpdate,
  findAndDelete,
  setError,
};