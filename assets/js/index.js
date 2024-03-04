
  window.onload = function() {
    fetch('sitepro/discotecas.json')
      .then(response => response.json())
      .then(data => {
        const itemList = data.itemListElement;
        const galleryRow = document.getElementById("gallery-row");

        // Loop through the itemList and create a gallery item for each element
        itemList.forEach((item, index) => {
          const name = item.name;
          var image = item.image;
          const lugar = item.address.addressLocality;
          console.log(image);
          if(Array.isArray(image)){
            image = item.image[0];
          }
          const galleryItem = `
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="gallery-item h-100">
                <div class="image-container">
                  <img src="${image}"  class="img-fluid" alt="">
                  <p class="image-name" titulo="${lugar}" id="${name}">${name}</p>
                </div>
                <div class="gallery-links d-flex align-items-center justify-content-center">
                  <a href="${image}" title="${name}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                  <a href="gallery-single.html?id=${name}" class="details-link"><i class="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div>
          `;
          // Append the gallery item to the row element
          galleryRow.innerHTML += galleryItem;
        });
      })
      .catch(error => console.error(error));  
  };