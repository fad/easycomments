<?php

$author = htmlentities($_POST["author"]);
$comment = htmlentities($_POST["comment"]);
$website = htmlentities($_POST["website"]);
$htmlForNewComment = addComment($author,$website,$comment);
sleep(5);
echo $htmlForNewComment;

function addComment($author,$website,$comment){
	if(str_isEmpty($author) || str_isEmpty($comment))
		return "";
	
	$commentFile = "comments.txt";
	$fh = fopen($commentFile, 'a') or die("ERROR: Can't open file 'coments.txt'! Make sure it's there and writable!");

	if (str_isEmpty($website))
		$authorDiv = "\t<p class='author'>$author</p>\n";
	else
		$authorDiv = "\t<p class='author'><a href='".getValidURL($website)."' target='_blank'>$author</a></p>\n";
	
	$comment = str_replace("\n","<br/>",$comment);
	$bodyDiv = "\t<p class='body'>$comment</p>\n";
	$stringData = "<li class='comment'>\n".$authorDiv.$bodyDiv."</li>\n\n";

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