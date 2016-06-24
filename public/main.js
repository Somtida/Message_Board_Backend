$(document).ready(init);

// let host = '//somtida-message-board-v1.herokuapp.com';
// var host = '//localhost:8000';

function init(){
  getMessage();
  $('.sendButton').click(createMessage);
  $('.messageBox').on('click','.deleteText', deleteText);
  $('.messageBox').on('click','.editText', editText);
  $('.modal-content').on('click','.saveNewMsg', saveNewMsg);
  $('.modal-content').on('click','.cancel', cancelNewMsg);
  $('.sortby').change(sortMessage);

}

function sortMessage(){
  getMessage();
}

function cancelNewMsg(){
  $('.editModal').modal('toggle');
}


function saveNewMsg(){
  let id = $(this).parent().data('id');
  console.log("id: ",id);
  let newMsg = $('.newMsg').val();
  console.log("newMsg: ",newMsg);
  $.ajax({
    method: 'PUT',
    url: `/messages/${id}/${newMsg}`
  })
  .done(()=>{
    console.log("save edited Text");
    $('.editModal').modal('toggle');
    getMessage();
  })
  .fail(()=>{
    console.log("error: save edited Text");
  })
}

function editText(){
  let id = $(this).parent().parent().parent().parent().data('msgId');
  console.log("id: ",id);

  console.log("in editText");
  let msg = $(this).parent().parent().parent().parent().data('msgText');
  console.log("msg: ",msg);
  let $newMessage = $('.newMsgBox').clone();
  $newMessage.addClass('.newBox').removeClass('newMsgBox');
  $newMessage.data('id',id);
  $newMessage.find('.newMsg').val(msg);
  $('.modal-content').empty().append($newMessage);



}

function deleteText(){
  // var authorName = $(this).parent().parent().parent().find('.messageArea').find('.messageAuthor').text();
  //console.log("authorName: ",authorName);
  var id = $(this).parent().parent().parent().parent().data('msgId');
  // console.log("id: ",id);
  $.ajax({
    method:'DELETE',
    url: `/messages/${id}`
  })
  .done(()=>{
    console.log("deleted");
    getMessage();
  })
  .fail(()=>{
    console.log("error: deleteText");
  })
}

function createMessage(){
  $.post('/messages',
  {
    author: $('.createAuthor').val(),
    text: $('.createText').val()
  })
  .done( () => {
    $('.createStatus').text("posted");
    $('.createAuthor').text('');
    $('.createText').text('');
    getMessage();
    $('.createAuthor').val('');
    $('.createText').val('');
    $('.createStatus').fadeOut();
  })
  .fail(()=>{
    console.log("error: createMessage");
  })
}

function getMessage(){
  let sortby = $('.sortby').val();
  console.log("sortby: ",sortby);
  let sort;
  if( sortby == "date"){
    sort = '/messages';
  }else{
    sort = '/messages?sort='+sortby;
  }
  $.ajax(sort)
  .done( data => {
    // console.log("data: ",data);
    let $p = buildParagraph(data);

    $('.messageBox').empty().append($p);
  })
  .fail(()=>{
    console.log("error: getMessage");
  });
}
function buildParagraph(alldata){
  let $groupPara = alldata.map(data => {
    let $p = $('.messageInfo').clone();
    $p.addClass('msgInfo').removeClass('messageInfo');
    $p.find('.messageAuthor').text(data.author);
    $p.data('msgId',data.id);
    $p.find('.messageText').text(data.text);
    $p.data('msgText',data.text);

    if((data.text).slice(0,4) === "http"){
      console.log("add attr image");
      $p.find('.image').attr('src',data.text);
      debugger;
    }
    $p.find('.messageTime').text(data.createAt);

    return $p;
    // return $('<p>').text(`${data.author}: ${data.text}`);
  });
  return $groupPara;
}
