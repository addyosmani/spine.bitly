(function($){
  
  var defaults = {
    version:    "3.0",
    login:      "legacye",
    apiKey:     "R_32f60d09cccde1f266bcba8c242bfb5a",
    history:    "0",
    format:     "json"
  };

  $.bitly = function( url, callback, params ) {
    if ( !url || !callback ) throw("url and callback required");
    
    var params = $.extend( defaults, params );
    params.longUrl = url;
    
    return $.getJSON("http://api.bit.ly/shorten?callback=?", params, function(data, status, xhr){
      callback(data.results[params.longUrl].shortUrl, data.results[params.longUrl], data);
    });
  };
  
  $.bitly.stats = function( url, callback, params ) {
    if ( !url || !callback ) throw("url and callback required");
    
    var params = $.extend( defaults, params );
    params.shortUrl = url;
    
    return $.getJSON("http://api.bitly.com/v3/clicks?callback=?", params, function(data, status, xhr){
      callback(data.data.clicks[0], data);
    });
  };
})(jQuery);