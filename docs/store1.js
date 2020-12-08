/* eslint-disable no-console */
import store from './store.js';
import $ from './jquery';
import './index.css';
import apiFetch from './api.js';

let adding = true;
let expanded = false;


function accordion() {
  let insert = `<div class="inserted">
  <div class="wrapper">
  ${store.bookmarks.map(function(marks) {
    return `
    <div class="accordion_wrap">
    <div class="accordion_header"><p>${marks.title}, Star Rating: ${marks.rating}</p></div>
    <div class="accordion_body"><p>${marks.url}<br>${marks.desc}</p></div>
    </div>`;
  }).join('')}
  </div>
  </div`;
  $('.alternate').html(insert);
}

function accordionHandler() {
  $('.alternate').on('click', '.accordion_header', function event() {
    $('.accordion_header').removeClass('active');
    $(this).addClass('active');
  });
} 



export default {
  adding,
  expanded,
  accordion,
  accordionHandler
};
