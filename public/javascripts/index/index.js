var fastTimeOffset = 500;
var normalTimeOffset = 2500;
var elements = [
  {
    "type"        : "h2",
    "content"     : "Welcome",
    "timeout"     : fastTimeOffset
  },{
    "type"        : "p",
    "content"     : "This website has absolutely no purpose",
    "timeout"     : normalTimeOffset
  },{
    "type"        : "p",
    "content"     : "You can add ",
    "child"       : [{
      "type"        : "b",
      "content"     : "anything",
    },{
      "content"   : " you want to the world"
    }],
    "timeout"     : normalTimeOffset
  },{
    "type"        : "p",
    "content"     : "Mouse moves the world and drags your picture",
    "timeout"     : normalTimeOffset
  },{
    "type"        : "p",
    "child"       : [{
      "type"        : "b",
      "content"     : "Have fun"
    }],
    "timeout"     : normalTimeOffset
  },{
    "type"        : "button",
    "properties"  : {
      "className"   : "button",
      "onclick"     : function(){window.location='/r';}
    },
    "child"       : [{
      "type"        : "span",
      "content"     : "Let's go"
    }],
    "timeout"     : normalTimeOffset
  },{
    "type"        : "p",
    "properties"  : {
      "className"   : "important"
    },
    "content"     : "Left click on this screen to skip it next time",
    "timeout"     : 100
  }/*,{
    "type"        : "p",
    "properties"  : {
      "className"   : "important"
    },
    "content"     : "Please don't add NSFW content though, I don't want to get banned :(...",
    "timeout"     : 100
  }*/
];

var container = document.getElementById("container");
var chainArray = [];
var done = false;
elements.forEach((item)=>{
  chainArray.push(()=>{
    return new Promise((fulfill,reject)=>{
      if(done)
        return;
      var elem = createElement(item, container);
      elem.style.opacity = "0";
      elem.style.transition = "0.5s";
      setTimeout(()=>{
        if(done)
          return;
        elem.style.opacity = "1";
        fulfill();
      }, item.timeout);
    });
  });
});
chainArray.reduce((target, item)=>{
  return target.then(item);
}, Promise.resolve()).then(()=>{done = true;});

function createElement(element, parent){
  if(done)
    return;
  var elem;
  if(element.hasOwnProperty("type"))
    elem = document.createElement(element.type);
  else{
    var content = document.createTextNode(element.content);
    parent.append(content);
    return;
  }
  if(element.hasOwnProperty("properties")){
    for(var key in element.properties)
      elem[key] = element.properties[key];
  }
  if(element.hasOwnProperty("content")){
    var content = document.createTextNode(element.content);
    elem.appendChild(content);
  }
  if(element.hasOwnProperty("child")){
    for(var i=0;i<element.child.length;i++){
      createElement(element.child[i], elem);
    }
  }
  parent.appendChild(elem);
  return $(elem)[0];
}

$(window).mousedown(()=>{
  if(done)
    return;
  while(container.lastChild.outerHTML != "<br>"){
    container.removeChild(container.lastChild);
  }
  elements.forEach((item)=>{
    var elem = createElement(item, container);
    elem.style.opacity = "1";
  });
  done = true;
});
