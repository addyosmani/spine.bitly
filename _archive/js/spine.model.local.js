Spine.Model.Local = {
  extended: function(){
    this.sync(this.proxy(this.saveLocal));
    this.fetch(this.proxy(this.loadLocal));
  },
    
  saveLocal: function(){
    var result = JSON.stringify(this);
    //localStorage[this.name] = result;
	store.set(this.name, result);
  },

  loadLocal: function(){
    //var result = localStorage[this.name];
    var result = store.get(this.name);
    if ( !result ) return;
	var result = JSON.parse(result);
    this.refresh(result);
  }
};