var exports = this;

jQuery(function($){
  
  $.fn.toggleDisplay = function(bool){
    if ( typeof bool == "undefined" ) {
      bool = !$(this).filter(":first:visible")[0];
    }
    return $(this)[bool ? "show" : "hide"]();
  };
  
  exports.Urls = Spine.Controller.create({
    events: {
      "click .destroy": "destroy",
      "click .toggleStats": "toggleStats"
    },
    
    proxied: ["render", "remove"],

    template: function(items){
      return $("#urlTemplate").tmpl(items);
    },
    
    init: function(){
      this.item.bind("update",  this.render);
      this.item.bind("destroy", this.remove);
    },
    
    render: function(){
      this.el.html(this.template(this.item));
      return this;
    },
    
    toggleStats: function(){
      this.navigate("/stats", this.item.id, true);
    },
    
    remove: function(){
      this.el.remove();
    },
    
    destroy: function(){
      this.item.destroy();
    }
  });

  exports.UrlsList = Spine.Controller.create({
    elements: {
      ".items": "items",
      "form":   "form",
      "input":  "input"
    },
    
    events: {
      "submit form": "create",
    },
    
    proxied: ["render", "addAll", "addOne"],
    
    init: function(){
      Url.bind("create",  this.addOne);
      Url.bind("refresh", this.addAll);
    },
    
    addOne: function(url){
      var view = Urls.init({item: url});
      this.items.append(view.render().el);
    },
    
    addAll: function(){
      Url.each(this.addOne);
    },
        
    create: function(e){
      e.preventDefault();
      var value = this.input.val();
      
      if (value)
        Url.create({long_url: value});

      this.input.val("");
      this.input.focus();
    }
  });
  
  exports.Stats = Spine.Controller.create({
    events: {
      "click .back": "back"
    },
    
    proxied: ["change", "render"],
    
    init: function(){
      Url.bind("update", this.render);
    },
    
    template: function(items){
      return $("#statsTemplate").tmpl(items);
    },
    
    render: function(){
      if ( !this.item ) return;
      this.el.html(this.template(this.item));
    },
    
    change: function(item){
      this.item = item;
      this.navigate("/stats", item.id);
      this.item.fetchStats();
      this.render();
      this.active();
    },
    
    back: function(){
      this.navigate("/list", true);
    }
  })
  
  exports.UrlApp = Spine.Controller.create({
    el: $("body"),
    
    elements: {
      "#urls": "urlsEl",
      "#stats": "statsEl"
    },
    
    init: function(){
      this.list = UrlsList.init({el: this.urlsEl});
      this.stats = Stats.init({el: this.statsEl});
      
      this.manager = Spine.Controller.Manager.init();
      this.manager.addAll(this.list, this.stats);
      
      this.routes({
        "": function(){ this.list.active() },
        "/list": function(){ this.list.active() },
        "/stats/:id": function(id){ this.stats.change(Url.find(id)) }
      });
      
      Url.fetch();
      Spine.Route.setup();
    }
  });
  
  exports.App = UrlApp.init();
});