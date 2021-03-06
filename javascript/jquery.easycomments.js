(function($){ 

//localization:
var str_commentListHeader = "Kommentare:";
var str_newCommentFormHeader = "Kommentar hinzufügen:";	
var str_commentAuthor = "Name";
var str_commentAuthorWebsite = "Webseite";
var str_commentBody = "Kommentar";
var str_submitComment = "Abschicken";
var str_required = "*";
var str_notRequired = "";
var str_errorMessagesHeader = "Fehler:";	
var str_commentBodyMustNotBeEmpty = "Kommentar darf nicht leer sein.";
var str_commentAuthorMustNotBeEmpty = "Autor darf nicht leer sein.";
	
//functions to disable and enable form elements
$.fn.disable = function() { 
  return this.each(function() { 
    if (typeof this.disabled != "undefined") this.disabled = true; 
  }); 
} 

$.fn.enable = function() { 
  return this.each(function() { 
    if (typeof this.disabled != "undefined") this.disabled = false; 
  }); 
}

//main
$.fn.easycomments = function(options) {	
	$('<div id="ec_commentsPanel" />').appendTo(this);
	$('<h1>'+str_commentListHeader+'</h1>').appendTo('#ec_commentsPanel');
	$('<ul id="ec_commentList" />').appendTo('#ec_commentsPanel');
	$('#ec_commentList').load('comments.txt');
	
	//add and hide error message panel
	$('<div id="ec_errorMessages" style="display:none;"></div>').appendTo($("#ec_commentsPanel"));
	
	//add new comment form
	var commentFormHTML = 
	'<div id="ec_newCommentForm"><h1>'+str_newCommentFormHeader+'</h1>'
		+ '<table>'
 		+'<tr><td align="right"><label for="comment_author">'+str_commentAuthor+'&nbsp;'+str_required+'</label></td>'
		+'<td><input id="comment_author" type="text"/></td></tr>'
		+'<tr><td align="right"><label for="comment_author_website">'+str_commentAuthorWebsite+'&nbsp;'+str_notRequired+'</label></td>'
		+'<td><input id="comment_author_website" type="text"/></td></tr>'
		+'<tr valign="top"><td align="right"><label for="comment_body">'+str_commentBody+'&nbsp;'+str_required+'</label></td>'
		+'<td><textarea id="comment_body" rows="10" cols="40"></textarea></td></tr>'
		+'<tr><td></td><td><input type="button" id="ec_comment_submit" value="'+str_submitComment+'" /><img id="ec_loader" src="images/ajax-loader.gif" style="display:none" /></td></tr>'
		+'</table></div>';
/*		
	commentFormHTML = 
	'<div id="ec_newCommentForm"><h1>'+str_newCommentFormHeader+'</h1>'
	 		+'<label for="comment_author">'+str_commentAuthor+'&nbsp;'+str_required+'</label><br/>'
		+'<input id="comment_author" type="text"/><br/>'
		+'<label for="comment_author_website">'+str_commentAuthorWebsite+'&nbsp;'+str_notRequired+'</label><br/>'
		+'<input id="comment_author_website" type="text"/><br/>'
		+'<label for="comment_body">'+str_commentBody+'&nbsp;'+str_required+'</label><br/>'
		+'<textarea id="comment_body" rows="10" cols="40"></textarea><br/>'
		+'<input type="button" id="ec_comment_submit" value="'+str_submitComment+'" />'
		+'</div>;
*/	
	$(commentFormHTML).appendTo($("#ec_commentsPanel"));
	
	//add event handling for submit button click
	$("#ec_comment_submit").click(function(){
		var errorMessages = validateNewCommentForm();
		if (errorMessages.length > 0){
			var errorMessagesString ='<h1>'+str_errorMessagesHeader+'</h1>';
			$.each(errorMessages,function(i,message) {
				errorMessagesString += '<li>'+message+'</li>'; 
			});  
			$("#ec_errorMessages").html('<ul>'+errorMessagesString+'</ul>');
			$("#ec_errorMessages").show();
		}
		else{
			$("#ec_errorMessages").hide();
			$("#ec_loader").show();
			submitComment(
				$("#comment_author").val(), 
				$("#comment_author_website").val(), 
				$("#comment_body").val());
		}
  	});
};

//helper functions
function validateNewCommentForm(){
	var errorMessages = [];
	if ($.trim($("#comment_author").val()) == "")
		errorMessages.push(str_commentAuthorMustNotBeEmpty);
	if ($.trim($("#comment_body").val()) == "")
		errorMessages.push(str_commentBodyMustNotBeEmpty);
	return errorMessages;
}

function clearNewCommentForm(){
	$("#comment_author").val("");
	$("#comment_author_website").val("");
	$("#comment_body").val("");
}

function submitComment(author, website, comment){
	clearNewCommentForm();
	$("#ec_comment_submit").disable();	
	$.post(
		"addComment.php", 
		{ author: author, website: website, comment: comment }, 
		function(data){ 
			$("#ec_comment_submit").enable();
			updateCommentList(data);
			$("#ec_loader").hide();
		});
}

function updateCommentList(htmlForNewComment){
	$("#ec_commentList").append(htmlForNewComment);
}

})(jQuery);