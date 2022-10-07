document.addEventListener("DOMContentLoaded", function () {
  const _ = new Swiper(".swiper", {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  })
});
