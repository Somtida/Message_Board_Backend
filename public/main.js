$(document).ready(init);

function init(){
  getMessage();
  $('.sendButton').click(createMessage);
  $('.messageBox').on('click','.deleteText', deleteText);
  $('.messageBox').on('click','.editText', editText);
}

function editText(){

  // $.ajax({
  //   method: "PUT",
  //   url:``,
  //   data: {
  //     id: id,
  //     newMsg: newText
  //   }
  // })
}

function deleteText(){
  // var authorName = $(this).parent().parent().parent().find('.messageArea').find('.messageAuthor').text();
  //console.log("authorName: ",authorName);
  var id = $(this).data('msgId');
  console.log("id: ",id);
  $.ajax({
    method:"DELETE",
    url: `/messages/${id}`
  })
  .done(()=>{
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
  })
  .fai(()=>{
    console.log("error: createMessage");
  })
}

function getMessage(){
  $.ajax('/messages')
  .done( data => {
    // console.log("data: ",data);
    let $p = buildParagraph(data);
    $('.messageBox').append($p);
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
    if((data.text).slice(0,5) === "http://"){
      $p.find('.image').attr('src',data.text);
    }
    $p.find('.messageTime').text(data.createAt);

    return $p;
    // return $('<p>').text(`${data.author}: ${data.text}`);
  });
  return $groupPara;
}
