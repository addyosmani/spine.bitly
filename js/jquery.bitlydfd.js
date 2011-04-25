$.fn.bitlyShorten = function(options) {
	
  var defaults = {
    version:    '2.0.1',
    login:      'legacye',
    apiKey:     'R_32f60d09cccde1f266bcba8c242bfb5a',
    history:    '0',
    longUrl:  '',
  };   

 	var args = arguments, 
		opts = $.extend(defaults,options), 
		collection = this, 
		result = "",
		queryUrl = "http://api.bit.ly/shorten?"
    				+"version="+opts.version
    				+"&longUrl="+opts.longUrl
    				+"&login="+opts.login
    				+"&apiKey="+opts.apiKey
    				+"&history="+opts.history
    				+"&format=json&callback=?";
    
    $.getJSON(queryUrl, function(data){
        result = (data.results[defaults.longUrl].shortUrl);
    })
	.then(
    function(){
        if(result){
        return collection.each(function() {
               //$(this).val(result);
				Task.create({name: result, original:opts.longUrl});
        });
        }
    },
    function(){
         return collection.each(function() {
             //$(this).val('Error: an issue was experienced when connecting to the bit.ly API');
			alert('There was an error connecting to the Bit.ly API')
        });
    }
);

};

                        
