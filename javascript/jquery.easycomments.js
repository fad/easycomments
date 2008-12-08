(function($){ 
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

$.fn.easycomments = function(options) {	
	$('<div id="ec_commentList" />').appendTo(this);
	$('<h2>Kommentare:</h2>').appendTo('#ec_commentList');
	$('<div id="ec_commentList_innerDiv" />').appendTo('#ec_commentList');
	$('#ec_commentList_innerDiv').load('comments.txt');
	
	var commentFormHTML = 
	'<h2>Neuer Kommentar</h2>'
 		+'<label for="comment_author">Name:</label><br/>'
		+'<input id="comment_author" type="text"/><br/>'
		+'<label for="comment_author_website">Webseite (optional):</label><br/>'
		+'<input id="comment_author_website" type="text"/><br/>'
		+'<label for="comment_body">Kommentar:</label><br/>'
		+'<textarea id="comment_body" rows="15" cols="60"></textarea><br/>'
		+'<input type="button" id="ec_comment_submit" value="Abschicken" />'
	$(commentFormHTML).appendTo(this);
	
	$("#ec_comment_submit").click(function(){
		var author = $("#comment_author").val();
		var website = $("#comment_author_website").val();
		var body = $("#comment_body").val();
		submitComment(author, website, body);
  	});
};

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
			updateCommentDiv(data);
		});
}

function updateCommentDiv(htmlForNewComment){
	$("#ec_commentList_innerDiv").append(htmlForNewComment);
}

})(jQuery);