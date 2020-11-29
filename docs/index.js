/* eslint-disable no-console */
console.log('hello world');
import $ from 'jquery';
import './index.css';

function main() {
  console.log('DOM is loaded');

  const startMsg = $('<p>Webpack is working!</p>');
  $('#root').append(startMsg);
}

function talk() {
  console.log('words');
}


  

  
$(main);
  
console.log('hiii', main());

$(talk);
$(main);

//my store: used for generating my pre-made bookmarks and updating to it to get my added ones
/*const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};

*/

//-----pseudocode/things i want my code to do------
// i want a function that takes my store and puts my bookmarks where they belong