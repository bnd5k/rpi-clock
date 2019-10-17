var SECONDS = 1000;
var MINUTES = 60 * SECONDS;

function updateClock() {
  var now = new Date();
  var hour = now.getHours();
  var am = true;
  if (hour > 12) {
    hour -= 12;
    am = false;
  }
  var minute = now.getMinutes();
  if (minute < 10) minute = '0' + minute;
  $('#clock').html(hour + ':' + minute)
}

updateClock();
setInterval(updateClock, 15 * SECONDS);

var errors = 0;

function updatePage() {
  $.get(location.href, function(html) {
    var body = html.replace(/^[\S\s]*<body[^>]*?>/i, '')
                   .replace(/<\/body[\S\s]*$/i, '');
    var content = $(body).html();
    if (content) {
      $('body').html(content);
      updateClock();
      errors = 0;
    } else {
      errors++;
      if (errors >= 5)
        $('body').css('backgroundColor', 'red');
      else
        updatePage();
    }
  });
}

// Temporary.  Maybe...
// setInterval(updatePage, 5 * MINUTES);
