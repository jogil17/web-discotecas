<?php
  // Retrieve the form inputs
  $userName = $_POST['subject'];
  $commentText = $_POST['message'];
  $starsRating = $_POST['stars'];
  // Retrieve the 'id' parameter from the URL
  // Retrieve the 'id' parameter from the referring URL
  $referer = $_SERVER['HTTP_REFERER'];
  $urlParts = parse_url($referer);
  $id = isset($urlParts['query']) ? explode('=', $urlParts['query'])[1] : '';
  $id = urldecode($id);

  // Create a new comment object
  $newComment = array(
    'stars' => $starsRating,
    'comment' => $commentText,
    'name' => $userName,
    'picture' => 'assets/img/testimonials/testimonials-1.jpg',
    'nightclub' => $id
  );

  // Read the existing JSON file
  $commentsData = file_get_contents('sitepro/comentarios.json');
  $commentsArray = json_decode($commentsData, true);

  // Add the new comment to the existing comments
  $commentsArray['comments'][] = $newComment;

  // Update the JSON file with the new comments
  file_put_contents('sitepro/comentarios.json', json_encode($commentsArray));

  // Return a response indicating the successful submission
  $response = array(
    'status' => 'success',
    'message' => 'Tu comentario se ha agregado correctamente.'
  );
  // Return a response indicating the successful submission
  echo "OK";
?>
