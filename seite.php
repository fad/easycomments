<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Beschreibung der Seite</title>
		<link rel="stylesheet" type="text/css" href="stylesheets/comment-styles.css">
		<script src="javascript/jquery-1.2.6.min.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function() {
				$("#comment_submit").click(function(){
					var author = $("#comment_author").val();
					var website = $("#comment_author_website").val();
					var body = $("#comment_body").val();
					submitComment(author, website, body);
					
			  	});
			});
			
			function submitComment(author, website, comment){
				$.post(
					"addComment.php", 
					{ author: author, website: website, comment: comment }, 
					function(data){ 
						updateCommentDiv(data);
					});
			}
			
			function updateCommentDiv(htmlForNewComment){
				$("#comments").append(htmlForNewComment);
			}
		</script>
 	</head>
	<body>
	<h2>Inhalt</h2>
	<p>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
		tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
		At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
		no sea takimata sanctus est Lorem ipsum dolor sit amet.
	</p>

	<h2>Kommentare:</h2>
 	<div id="comments">
		<?php
			readfile("comments.txt");
 		?>
	</div>
 	<br/>
	<h2>Neuer Kommentar</h2>
 		<label for="comment_author">Name:</label><br/>
		<input id="comment_author" type="text"/><br/>
		<label for="comment_author_website">Webseite (optional):</label><br/>
		<input id="comment_author_website" type="text"/><br/>
		<label for="comment_body">Kommentar:</label><br/>
		<textarea id="comment_body" rows="15" cols="60"></textarea><br/>
		<input type="button" id="comment_submit" value="Abschicken" />

	</body>
</html>
