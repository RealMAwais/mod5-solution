$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

var dc = {};

var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";

var insertHtml = function(selector, html){
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// var menuItemsUrl =
//   "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
// var menuItemsTitleHtml = "snippets/menu-items-title.html";
// var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
// var insertHtml = function (selector, html) {
//   var targetElem = document.querySelector(selector);
//   targetElem.innerHTML = html;
// };

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

var insertProperty = function(string, propName, propValue){
  var propToReplace = " {{ " + propName + " }} ";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}


document.addEventListener("DOMContentLoaded", function (event) {

  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (responseText) {
      document.querySelector("#main-content").innerHTML = responseText;
    },
    false);
});
dc.loadMenuCategories = function (){
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
};

function buildAndShowCategoriesHTML (categories){
  $ajaxUtils.sendGetRequest(categoriesTitleHtml, function(categoriesTitleHtml){
    $ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml){
      var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
      insertHtml("#main-content", categoriesViewHtml);
    }, false);
  }, false);
}



function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml){
  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  for(var i=0; i<categories.length; i++){

    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = "" + categories[i].short_name;
    html = insertProperty(html, "name", name);
    html = insertProperty(html, "short_name", short_name);

    finalHtml += html;

  }
}
global.$dc = dc;

})(window);
