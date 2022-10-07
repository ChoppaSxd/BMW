class AuthService {
  constructor(logIn, pass) {
    this.logIn = logIn
    this.pass = pass
    this.isValid = false
  }

  confirmIsLoh() {
    const checkAlertUserName = prompt("UserName")
    const checkAlertPass = prompt("Password")
    if (checkAlertUserName === this.logIn && checkAlertPass === this.pass) {
      this.isValid = true
    } else {
      this.isValid = false
    }
  }
}

class CarService {
  constructor() {
    this.containerCars = document.querySelector(".car_cards")
  }
  #cars = this.getCarToLocalStorage()

  setCarToLocalStorage(data) {
    localStorage.setItem("rent-cars", JSON.stringify(data))
  }

  getCarToLocalStorage() {
    const presister = JSON.parse(localStorage.getItem("rent-cars")) 
    return presister ? presister : []
  }

  clearLocalStorageCars() {
    localStorage.removeItem("rent-cars")
  }

  addNewCar(data) {
    this.#cars.push({ ...data })
    this.setCarToLocalStorage([ ...this.#cars, { ...data } ])
    this.renderCars()
  }
  
  deleteCarById(id) {
    this.#cars = this.#cars.filter(car => car.id !== id)
    this.setCarToLocalStorage(this.#cars)
    this.renderCars()
  }

  renderCars() {
    let str = ``
    this.#cars.map(({ id, title, image }) => {
        str += `
        <div class="card ${id}">
            <img
              src="${image}"
              class="card-img-top img_fixed"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">2018</p>
              <img src="./images/Vector.png" alt="" />
              <span>4 місця</span>
              <span class="text_button"><text>90€</text> / в день</span>
              <br />
              <img src="./images/Vector (1).png" alt="" />
              <span
                >Кондиціонер
                <div class="toggle" style="position: absolute;">
                  <a class="toggler" href="#">Детальніше</a>
                  <div class="content">
                    Потужність 400 л.с
                    Об’єм мотора 3.0л
                    Коробка 8АКПП
                  </div>
                </div></span
              >
              <br />
              <img src="./images/Vector (2).png" alt=""/>
              <span>2700€</span>
            </div>
          </div>`
    })
    this.containerCars.innerHTML = str
  }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  const modal = document.querySelector(".add-car-modal")
  const modalId = document.getElementById("exampleModal")
  
  const authSer = new AuthService("1", "1")
  const carSer = new CarService()
  carSer.renderCars()

  document.querySelector(".btn-modal").addEventListener("click", (e) => {
    if (!authSer.isValid) {
       authSer.confirmIsLoh()
    }
    

    if (!authSer.isValid) {
        modal.classList.remove("show")
        modalId.style.display = "none"
    } else {
      modal.classList.add("show")
      modalId.style.display = "block"
    }
  })


  document.querySelector(".btn-close-modal").addEventListener("click", (e) => {
    modal.classList.remove("show")
    modalId.style.display = "none"
  })

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      event.stopPropagation()
      
      if (form.checkValidity()) {
        const data = {}  
        const inputs = document.getElementsByTagName("input")
        Array.from(inputs).forEach(input => {
          data[input.name] = input.value
        })
        carSer.addNewCar({ id: create_UUID(), ...data })
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

const card = document.querySelector(".none_card");
function addElement() {
  document.getElementById("addElement").style.display = "inline-flex";
}
function resetElement() {
  document.getElementById("addElement").style.display = "none";
}

var base = {
  // Пошук елементів по класу
  findClass: function (str, node) {
    if (document.getElementsByClassName)
      return (node || document).getElementsByClassName(str);
    else {
      var node = node || document,
        list = node.getElementsByTagName("*"),
        length = list.length,
        Class = str.split(/\s+/),
        classes = Class.length,
        array = [],
        i,
        j,
        key;
      for (i = 0; i < length; i++) {
        key = true;
        for (j = 0; j < classes; j++)
          if (list[i].className.search("\\b" + Class[j] + "\\b") == -1)
            key = false;
        if (key) array.push(list[i]);
      }
      return array;
    }
  },
  // Добавлення обробки подій
  bind: function (node, type, listener) {
    if (node.addEventListener) node.addEventListener(type, listener, false);
    //@cc_on node.attachEvent('on' + type, function() { listener.call(node); });
  },
  // Реалізация DOMContentLoaded
  init: [],
  ready: function () {
    if (!arguments.callee.done) {
      arguments.callee.done = true;
      if (this.timer) clearInterval(this.timer);
      var i,
        length = this.init.length;
      for (i = 0; i < length; i++) this.init[i]();
      this.init = [];
    }
  },
  check: function () {
    var _this = this,
      listener = function () {
        _this.ready();
      };
    if (document.addEventListener)
      document.addEventListener("DOMContentLoaded", listener, false);
    if (/KHTML|WebKit/i.test(navigator.userAgent))
      this.timer = setInterval(function () {
        if (/loaded|complete/.test(document.readyState)) base.ready();
      }, 10);
    /*@cc_on document.write(unescape('%3CSCRIPT onreadystatechange="if(this.readyState==\'complete\') base.ready()" defer=defer src=\/\/:%3E%3C/SCRIPT%3E')); @*/
    this.bind(window, "load", listener);
  },
};

// Функції для роботи с панельками
//const plus = document.querySelector('.toggle');
var toggler = {
  process: function () {
    var i,
      list = base.findClass("toggler"),
      length = list.length;
    for (i = 0; i < length; i++) base.bind(list[i], "click", this.toggle);
    list = base.findClass("content");
    length = list.length;
    for (i = 0; i < length; i++) list[i].style.display = "none";
  },
  toggle: function () {
    var content = base.findClass("content", this.parentNode)[0],
      e = arguments[0] || window.event;
    if (content.style.display == "block") {
      content.style.display = "none";
      this.innerHTML = "Детальніше";
    } else {
      content.style.display = "block";
      this.innerHTML = "Сховати";
    }
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  },
};

// Шукаємо блоки з класом «toggle» по події DOMContentLoaded
base.init.push(function () {
  toggler.process();
});

base.check();




