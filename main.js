document.getElementById('submit-btn').onclick = searchWiki;

function searchWiki() {

// declare all required variables
var inputValue  = document.getElementById('input').value;
var generateBtn = document.getElementById('generate-btn');
var displayArea = document.getElementById('results-section');
var xmlhttp     = new XMLHttpRequest();
var randomUrl   = 'https://en.wikipedia.org/wiki/Special:Random';
var wikiUrl     = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputValue + '&limit=10&format=json&origin=*';
console.log('wikiUrl: ' + wikiUrl);

//The XMLHttpRequest.readyState property returns the state an XMLHttpRequest client is in. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { //4 means The operation is complete.
    var wikiResponse = JSON.parse(xmlhttp.responseText);
    console.log('wikiResponse: ' + wikiResponse);
    displayWikiArticles(wikiResponse);
  };
};

//The XMLHttpRequest.open() method initializes a request. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)
//The XMLHttpRequest.send() method sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)
xmlhttp.open('GET', wikiUrl, true);
xmlhttp.send();

function displayWikiArticles(arr) {
  var name        = '';
  var description = '';
  var link        = '';
  if ( typeof(arr) == 'object') {
    for (var i = 0; i < arr.length; i++) {
      printOut += '<p class="displayPara"><a href="' + arr[3][0] + '"' + '</a>' + arr[i][0] + '</p><br>';
    }
  }
  displayArea.innerHTML = printOut;
}

}
