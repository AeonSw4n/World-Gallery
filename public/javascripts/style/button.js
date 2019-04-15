var button = document.getElementById("myButton");
/*button.addEventListener('mousemove', function(){
  if(inter !== false)
    clearInter();
})*/

button.addEventListener('click', function(){
  if(!freeze)
    makeFormVisible();
});
