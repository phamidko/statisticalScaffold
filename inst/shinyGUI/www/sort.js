// return order of a sortable list
// function created by ZJ: https://groups.google.com/forum/?fromgroups=#!topic/shiny-discuss/f3n5Iv2wNQ8 
var returnOrderBinding = new Shiny.InputBinding();
$.extend(returnOrderBinding, {
  find: function(scope) {
    return $(scope).find('.ui-sortable'); 
  },
  getId: function(el) {
    return Shiny.InputBinding.prototype.getId.call(this, el) || el.name;
  },
  getValue: function(el) {
    //console.log(el)
    var hi =  $(el).find("li").map(function(i,el) {return $(el).text()})
    hii = []
    hi.each(function() {hii.push(this)})
    return hii
    // return $("ul li").map(function(i,el) {return $(el).text()});
  },
  setValue: function(el, value) {
    el.value = value;
  },
  receiveMessage: function(el, data) {
    if (data.hasOwnProperty('value'))
    {
      this.setValue(el, data.value);
      console.log(data.value);
      $(el).empty();
      var new_list = data.value.map(function(v, i, a) {return("<li class='ui-state-default stab'><span class='label'>" + v + "</span></li>");});
      console.log(new_list);
      $(el).append(new_list);
    }
    $(el).trigger('sortupdate.ui-sortable');
  },  
  subscribe: function(el, callback) {
    $(el).on("sortupdate.ui-sortable", function(event) {
      callback(true);
    });
  },
  unsubscribe: function(el) {
    $(el).off('.ui-sortable');
  },
});
Shiny.inputBindings.register(returnOrderBinding, 'returnOrder');
