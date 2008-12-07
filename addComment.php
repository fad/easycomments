<?php

$author = htmlentities($_POST["author"]);
$comment = htmlentities($_POST["comment"]);
$website = htmlentities($_POST["website"]);
$htmlForNewComment = addComment($author,$website,$comment);
echo $htmlForNewComment;

function addComment($author,$website,$comment){
	if(str_isEmpty($author) || str_isEmpty($comment))
		return "";
	
	$commentFile = "comments.txt";
	$fh = fopen($commentFile, 'a') or die("can't open file");

	if (str_isEmpty($website))
		$authorDiv = "\t<div class='author'>$author</div>\n";
	else
		$authorDiv = "\t<div class='author'><a href='".getValidURL($website)."' target='_blank'>$author</a></div>\n";
	
	$comment = str_replace("\n","<br/>",$comment);
	$bodyDiv = "\t<div class='body'>$comment</div>\n";
	$stringData = "<div class='comment'>\n".$authorDiv.$bodyDiv."</div>\n\n";

	fwrite($fh, $stringData);
	fclose($fh);
	
	return $stringData;
}

//Hilfsfunktionen
function str_isEmpty($string){
	$trimmedString = trim($string);
	return empty($trimmedString);
}

function str_startsWith($source, $prefix){
   return strncmp($source, $prefix, strlen($prefix)) == 0;
}

function getValidURL($url){
	if (str_startsWith($url,"http://"))
		return $url;
	else
		return "http://".$url;
}

?>