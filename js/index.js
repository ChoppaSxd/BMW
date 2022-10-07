var mySwiper = new Swiper(".swiper-container", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});

const navbar = document.querySelector(".navbar");
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
window.addEventListener("scroll", (e) => {
  const scrollY = e.currentTarget.scrollY;
  if (scrollY > 100) {
    navbar.classList.add("bg-dark");
    // navbarnav.classList.add('bg-light');
  } else {
    navbar.classList.remove("bg-dark");
    // navbarnav.classList.remove('bg-light');
  }
});

$("#navbarNavDropdown").on("show.bs.collapse", () => {
  navbar.classList.add("bg-light");
});

$("#navbarNavDropdown").on("hide.bs.collapse", () => {
  navbar.classList.remove("bg-light");
});
