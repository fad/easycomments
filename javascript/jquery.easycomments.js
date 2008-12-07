(function($){ 
	
$.fn.easycomments = function(options) {
	$('<h2>Kommentare:</h2>').appendTo(this);
	$('<div id="ec_commentList" />').appendTo(this);
	$('#ec_commentList').load('comments.txt');
	
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

function submitComment(author, website, comment){
	$.post(
		"addComment.php", 
		{ author: author, website: website, comment: comment }, 
		function(data){ 
			updateCommentDiv(data);
		});
}

function updateCommentDiv(htmlForNewComment){
	$("#ec_commentList").append(htmlForNewComment);
}

})(jQuery);