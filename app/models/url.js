var Url = Spine.Model.setup("Url", ["short_url", "long_url", "stats"]);

Url.extend(Spine.Model.Local);

Url.include({
  validate: function(){
    if ( !this.long_url )
      return "long_url required"
      
    if ( !this.long_url.match(/:\/\//))
      this.long_url = "http://" + this.long_url
  },
  
  fetchUrl: function(){
    if ( !this.short_url )
      $.bitly(this.long_url, this.proxy(function(result){
        this.updateAttributes({short_url: result});
      }));
  },
  
  fetchStats: function(){
    if ( !this.short_url ) return;
    $.bitly.stats(this.short_url, this.proxy(function(result){
      this.updateAttributes({stats: result});
    }));
  }
});

Url.bind("create", function(rec){
  rec.fetchUrl();
});