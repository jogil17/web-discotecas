
  function formatPriceRange(priceRange) {
    const formattedPriceRange = priceRange.join("<br>");
    return formattedPriceRange;
  }

    function translateDayOfWeek(day) {
        const daysOfWeekEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const daysOfWeekEs = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
        const index = daysOfWeekEn.indexOf(day);
        if (index !== -1) {
        return daysOfWeekEs[index];
        }
    
        return day; // Devuelve el día sin cambios si no se encuentra la traducción
    }
    
  function formatOpeningHours(openingHours) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const formattedHours = [];
  
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const dayOpening = openingHours.find((hours) => hours.startsWith(day));
  
      if (dayOpening) {
        const [_, time] = dayOpening.split(' ');
        formattedHours.push(`${day} ${time}`);
      }
    }
  
    return formattedHours.join('<br>');
  }
    fetch('sitepro/discotecas.json')
      .then(response => response.json())
      .then(data => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const disco = data.itemListElement.find(element => element.name === id);
        
        if (disco) {
          document.getElementById("titol").innerHTML = disco.name;
          document.getElementById("titol2").innerHTML = disco.name;
          document.getElementById("direccio").innerHTML = disco.address.streetAddress;
          document.getElementById("info").innerHTML = disco.description;
          document.getElementById("precio").innerHTML = formatPriceRange(disco.priceRange);
          document.getElementById("link").setAttribute("href", disco.url);
          document.getElementById("mapa").setAttribute("src",disco.hasMap);
          document.getElementById("instagram").setAttribute("href",disco.sameAs[0]);
          document.getElementById("instagram").innerHTML = "@"+disco.name;
          document.getElementById("youtube").setAttribute("src","https://www.youtube.com/embed/"+disco.subjectOf.video);
          document.getElementById("spotify").setAttribute("src",disco.keywords);
          document.getElementById("add-review-btn").setAttribute("href","Comentario-form.html?id="+id);
          const imagenes = document.getElementById("imagenes");
          
          if(Array.isArray(disco.image)){
            disco.image.forEach((item, index) => {
              var imagen = item;
              const galleryItem = `
              <div class="swiper-slide">
                <img src="${imagen}" alt="">
              </div>`;
              // Append the gallery item to the row element
              imagenes.innerHTML += galleryItem; 
          });
          }else{
            const galleryItem = `
              <div class="swiper-slide">
                <img src="${disco.image}" alt="">
              </div>
          `;
          // Append the gallery item to the row element
           imagenes.innerHTML += galleryItem;
          }

          // EVENTOS
          const eventos = document.getElementById("eventos");
          if (Array.isArray(disco.event)) {
            disco.event.forEach((event, index) => {
              processEvent(event);
            });
          } else if (disco.event) {
            processEvent(disco.event);
          } else{
            eventoItem = '<p class="info">No se conocen eventos próximos.</p>';
            eventos.innerHTML += eventoItem;
          }

          function processEvent(event) {
            let eventoItem = '';
            if (event.keywords) {
              eventoItem = `
                <div class="swiper-slide">
                  <div class="testimonial-item">
                    <h3>${event.actor}</h3>
                    <iframe src="${event.keywords}" frameborder="0" allowtransparency="true" allow="encrypted-media" class="rec-img"></iframe>
                    <div class="info">
                      <h4>Información</h4>
                      <ul>
                        <li><strong><span>${event.name}</span></strong> </li>
                        <li><strong>Fecha:</strong> <span>${event.startDate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>`;
            } else if (event.sameAs) {
              eventoItem = `
                <div class="swiper-slide">
                  <div class="testimonial-item">
                    <h3>${event.name}</h3>
                    ${event.sameAs}
                    <div class="info">
                      <h4>Información</h4>
                      <ul>
                        <li><strong>Fecha:</strong> <span>${event.startDate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>`;
            } else if (event.image) {
              eventoItem = `
                <div class="swiper-slide">
                  <div class="testimonial-item">
                    <h3>${event.name}</h3>
                    <img src="${event.image}" alt="">
                    <div class="info">
                      <h4>Información</h4>
                      <ul>
                        <li><strong>Fecha:</strong> <span>${event.startDate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>`;
            }
            // Append the gallery item to the row element
            eventos.innerHTML += eventoItem;
          }


          //HORARIO
          let openingHoursString = '';
          if (Array.isArray(disco.openingHoursSpecification)) {
            disco.openingHoursSpecification.forEach(spec => {
              const daysOfWeek = Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek.map(day => translateDayOfWeek(day)) : translateDayOfWeek(spec.dayOfWeek);
              openingHoursString += `<div>${daysOfWeek}: ${spec.opens} - ${spec.closes}</div>`;
            });
          } else {
            const daysOfWeek = Array.isArray(disco.openingHoursSpecification.dayOfWeek) ? disco.openingHoursSpecification.dayOfWeek.map(day => translateDayOfWeek(day)) : translateDayOfWeek(disco.openingHoursSpecification.dayOfWeek);
            openingHoursString = `<div>${daysOfWeek}: ${disco.openingHoursSpecification.opens} - ${disco.openingHoursSpecification.closes}</div>`;
          }

          document.getElementById("horario").innerHTML = openingHoursString;

          //RESTAURANTES
          const codPostal = disco.address.postalCode;
          const restaurantes = document.getElementById("restaurantes");
          fetch('sitepro/restaurante.json')
          .then(response2 => response2.json())
          .then(dataRestaurantes => {
            const rest = dataRestaurantes.itemListElement;
            trobat = false;
            // Loop through the itemList and create a gallery item for each element
            rest.forEach((restaurante, index) => {
              if(codPostal==restaurante.address.postalCode){
                trobat = true;
                processRestaurante(restaurante);
              }       
            });

            if(!trobat){
              rItem = '<p class="info">No se conocen restaurantes cercanos.</p>';
              restaurantes.innerHTML += rItem;
            }
          
          })
          .catch(error => console.error(error));

          function processRestaurante(restaurante) {
            let restauranteItem = '';
            const priceRange = restaurante.priceRange.length; // Get the length of the priceRange string
          
            let dollarSigns = '';
            for (let i = 0; i < priceRange; i++) {
              dollarSigns += '$'; // Add a dollar sign for each character in the priceRange
            }
            const openingHours = formatOpeningHours(restaurante.openingHours);
          
            restauranteItem = `
              <div class="swiper-slide">
                <div class="testimonial-item">
                  <h3>${restaurante.name}</h3>
                  <img src="https://www.mllcarestaurantes.com/${restaurante.image[0].contentUrl}" class="rec-img-2" alt="">
                  <div class="info">
                    <h4>Información</h4>
                    <ul>
                      <li><strong>Dirección:</strong> <span>${restaurante.address.streetAddress}</span></li>
                      <li><strong>Horario:</strong> <span>${openingHours}</span></li>
                      <li><strong>Tipo de cocina:</strong> <span>${restaurante.servesCuisine}</span></li>
                      <li><strong>Dirección web:</strong> <a href="${restaurante.url}">${restaurante.name}</a></li>
                      <li><strong>Precio:</strong> <span>${dollarSigns}</span></li>
                    </ul>
                  </div>
                </div>
              </div>`;
          
            // Append the gallery item to the row element
            restaurantes.innerHTML += restauranteItem;
          }
          
            //HOTELES
          const hoteles = document.getElementById("hoteles");
          fetch('sitepro/hotel.json')
          .then(response2 => response2.json())
          .then(dataHoteles => {
            const rest = dataHoteles.itemListElement;
            trobat = false;
            // Loop through the itemList and create a gallery item for each element
            rest.forEach((hotel, index) => {
              if(codPostal==hotel.address.postalCode){
                trobat = true;
                processHotel(hotel);
              }       
            });

            if(!trobat){
              hItem = '<p class="info">No se conocen hoteles cercanos.</p>';
              hoteles.innerHTML += hItem;
            }
          
          })
          .catch(error => console.error(error));

          function processHotel(hotel) {
            let hotelItem = '';
          
            hotelItem = `
              <div class="swiper-slide">
                <div class="testimonial-item">
                  <h3>${hotel.name}</h3>
                  <img src="${hotel.photo[0].contentUrl}" class="rec-img-2" alt="">
                  <div class="info">
                    <h4>Información</h4>
                    <ul>
                      <li><strong>Dirección:</strong> <span>${hotel.address.streetAddress}</span></li>
                      <li><strong>Teléfono:</strong>  <span>${hotel.telephone}</span></li>
                      <li><strong>Precio:</strong> <span>${hotel.priceRange}</span></li>
                    </ul>
                  </div>
                </div>
              </div>`;
          
            // Append the gallery item to the row element
            hoteles.innerHTML += hotelItem;
          }
        
        //COMENTARIOS
          const comentarios = document.getElementById("comentarios");
          fetch('sitepro/comentarios.json')
          .then(response3 => response3.json())
          .then(dataComentarios => {
            const coment = dataComentarios.comments;
            trobat = false;
            // Loop through the itemList and create a gallery item for each element
            coment.forEach((comentario, index) => {
              if(id==comentario.nightclub){
                trobat = true;
                processComentario(comentario);
              }       
            });

            // if(!trobat){
            //   cItem = '<p class="info">No existen comentarios.</p>';
            //   comentarios.innerHTML += cItem;
            // }
          
          })
          .catch(error => console.error(error));

          function processComentario(comentario) {
            let commentItem = '';
          
            commentItem = `
              <div class="swiper-slide">
                <div class="testimonial-item">
                  <div class="stars">

                  </div>
                  <p>
                    ${comentario.comment}
                  </p>
                  <div class="profile mt-auto">
                    <img src="${comentario.picture}" class="testimonial-img" alt="">
                    <h3>${comentario.name}</h3>
                    <h4>Usuario</h4>
                  </div>
                </div>
              </div>`;
          
            // Append the gallery item to the row element
            comentarios.innerHTML += commentItem;

            // Dynamically update stars based on the number in "stars" attribute
            const starsElement = comentarios.lastElementChild.querySelector(".stars");
            const stars = comentario.stars;

            const filledStars = Math.floor(stars);
            starsElement.innerHTML = "";

            for (let i = 0; i < filledStars; i++) {
              const filledStarIcon = document.createElement("i");
              filledStarIcon.classList.add("bi", "bi-star-fill");
              starsElement.appendChild(filledStarIcon);
            }

            if (stars % 1 !== 0) {
              const halfStarIcon = document.createElement("i");
              halfStarIcon.classList.add("bi", "bi-star-half");
              starsElement.appendChild(halfStarIcon);
            }

            const emptyStars = 5 - Math.ceil(stars);
            for (let i = 0; i < emptyStars; i++) {
              const emptyStarIcon = document.createElement("i");
              emptyStarIcon.classList.add("bi", "bi-star");
              starsElement.appendChild(emptyStarIcon);
            }
          }

        } else {
          console.error(`No se encontró ningún disco con el nombre '${id}'`);
        }
      })
      .catch(error => console.error(error));  

window.onload = function(){

           /**
   * Init swiper slider with 1 slide at once in desktop view
   */
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      /**autoplay: {      //esto sirve para que el carrusel se mueva solo
        delay: 5000,
        disableOnInteraction: false
      },*/
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }); 
  
    /**
     * Init swiper slider with 3 slides at once in desktop view
     */
    new Swiper('.slides-3', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },
  
        1200: {
          slidesPerView: 3,
        }
      }
    });

      }

     