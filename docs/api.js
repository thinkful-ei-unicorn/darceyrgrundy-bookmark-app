const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

function apiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('Content-Type')) {
          error.message = res.status;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}


function getItems() {
  return apiFetch(`https://cors-anywhere.herokuapp.com/${BASE_URL}/darcey/bookmarks`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  });
}

function createItem(bookmark) {
  return apiFetch(`https://cors-anywhere.herokuapp.com/${BASE_URL}/darcey/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: bookmark,
  });
}


function updateItem(id, updateDataArg) {
  const updateData = JSON.stringify(updateDataArg);
  return apiFetch(`https://cors-anywhere.herokuapp.com/${BASE_URL}/PATCH/darcey/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: updateData,
  });
}


function deleteItem(id) {
  return apiFetch(`https://cors=anywhere.herokuapp.com/${BASE_URL}/DELETE/darcey/bookmarks/${id}`, {
    method: 'DELETE'
  });
}

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  apiFetch,
};
