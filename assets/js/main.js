/**
* Template Name: PhotoFolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

function initMap() {
  // The location of Uluru
  const centro = { lat: 39.64174018450951, lng: 2.9394934591362105 };
  var lugares = [
    { lat: 39.50956486914154, lng: 2.533036958888994, name:'BCM' },
    { lat: 39.56275656066524, lng: 2.6272009763644006, name:'Social Club'},
    { lat: 39.434258795659346, lng: 3.022292926595627, name:'S inédit Disco'},
    { lat: 39.839637332435196, lng: 3.120276724756714, name:'Banana Club'},
    { lat: 39.554978090259205, lng: 2.623575211256261, name: 'Backstage'},
    { lat: 39.59687254244055, lng: 2.631202305535651, name: 'R33 Mallorca'},
    { lat: 39.56495654545977, lng: 2.6278469591680436, name: 'Times Square Music Club'},
    { lat: 39.72055598408456, lng: 2.911007482424907, name: 'Sa Lluna'},
    { lat: 39.600716904613684, lng: 2.6553852131065674, name: 'Pa Lante Music Club'}
  ];


  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: centro,
  });

  /*fetch('sitepro/discotecas.json')
    .then(response => response.json())
    .then(data => {
        const itemList = data.itemListElement;

        itemList.forEach((item,index) =>{
            const name = item.name;
            const latitude = item.geo.latitude;
            const longitude = item.geo.longitude;
            var marker = new google.maps.Marker({
                position = {latitude, longitude},
                map = map,
                title = name
            });
        });
    });*/
  // The marker, positioned at Uluru
  lugares.forEach(function(lugar){
      const marker = new google.maps.Marker({
            position: {lat: lugar.lat, lng: lugar.lng},
            map: map,
            title: lugar.name
        });

        marker.addListener('click', function() {
              // Redirect to the Google Maps page for the location

              window.location.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(lugar.name);   
        });
  })

  /*const marker = new google.maps.Marker({
    position: {lat: lugar.lat, lng: lugar.lng},
    map: map,
  });*/


}


window.initMap = initMap


document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});