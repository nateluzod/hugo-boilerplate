import lunr from "lunr";
import domready from "domready";
import searchIndex from "./search-index.json";
import paramByName from "param-by-name";


const idx = lunr(function () {
  this.ref('uri')
  this.field('content')

  searchIndex.forEach(function (doc) {
    this.add(doc)
  }, this)
})

const searchString = paramByName("q");
const searchResults = idx.search(searchString)

domready(function() {
  document.getElementById('search-string').innerHTML = searchString
  document.getElementById('results').innerHTML = JSON.stringify(searchResults)
})