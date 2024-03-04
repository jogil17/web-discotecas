function searchGallery() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var images = document.querySelectorAll("gallery-item h-100");
  
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var imageName = image.querySelector('p').innerHTML.toLowerCase();
    if (imageName.indexOf(input) > -1) {
      image.style.display = "";
    } else {
      image.style.display = "none";
    }
  }
}
