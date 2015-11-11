module.exports =  function(){
  //var $this = this
  var buttonfunc =  function(){
      $("button").on('click', function(){
      $('#time').html('Here is some time')
      console.log('working')
  })
};
  return buttonfunc;
};
