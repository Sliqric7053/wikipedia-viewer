document.getElementById('submit-btn').onclick = searchWiki;

function searchWiki() {
// declare all required variables
var inputValue  = document.getElementById('input').value;
var displayArea = document.getElementById('results-section');
var ul          = document.getElementById('ul');
var description = document.getElementById('description');
var xmlhttp     = new XMLHttpRequest();
var wikiUrl     = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputValue + '&limit=10&format=json&origin=*';

//The XMLHttpRequest.readyState property returns the state an XMLHttpRequest client is in. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { //4 means The operation is complete.
    var wikiResponse = JSON.parse(xmlhttp.responseText);
    if (wikiResponse[1]) {
      //clear old data
      displayArea.innerHTML = '';
      displayWikiArticles(wikiResponse);
    } else if (!wikiResponse[1]) {
      displayArea.innerHTML = '<h1>"Enter Search Term"!</h1>';
    } else {
      displayArea.innerHTML = '<h1>"Results Not Found"!</h1>';
    }
  };
};

//The XMLHttpRequest.open() method initializes a request. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)
//The XMLHttpRequest.send() method sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent. (see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)
xmlhttp.open('GET', wikiUrl, true);
xmlhttp.send();

function displayWikiArticles(arr) {

  var printOut  = '';
  for (var i = 0; i < arr[1].length; i++) {
    printOut += "<li class='li'><a href=" + arr[3][i] + " target='_blank'>" + arr[1][i] + "</a><p>" + arr[2][i] + "</p></li>";
  };
      displayArea.innerHTML = printOut;
    };
document.getElementById('input').value = '';
};

//setup keboard Enter key
function keyboardPress(event) {
  if (event.keyCode == 13 || event.which == 13) {
    event.preventDefault();
    searchWiki();
  };
};
