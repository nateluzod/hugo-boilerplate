import lunr from "lunr";
import domready from "domready";
import searchIndex from "./search-index.json";
import paramByName from "param-by-name";


const idx = lunr( function() {
  this.field("title", {
    boost: 10
  })
  this.field("content")
  this.ref("uri")
  
  searchIndex.forEach((doc)=> {
    this.add(doc)
  }, this)
})

const searchString = paramByName("q")
const searchResults = idx.search(searchString)



domready(function() {

  // Add the search string to the page header
  document.getElementById('search-string').innerHTML = searchString
  
  // 1. Loop through the results
  searchResults.forEach((result) => {

    // 2. Find the match in the index
    const indexResult = searchIndex.filter(function (entry) {
      return entry.uri === result['ref']
    })

    // 3. Push that to the search results
    const resultUri = indexResult[0]['uri'];

    const resultWrapper = document.createElement('div')
    // let htmlResult = "<li>" + resultUri + "</li>"
    // resultWrapper.appendChild('test')

    document.getElementById('results').appendChild(resultWrapper)

  })
})