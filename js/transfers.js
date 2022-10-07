class AuthController {
	constructor() {

	}
	#guests = this.getGuestsFromLocalStorage()

	checkGuest(email, pass) { 
		const findUser = this.findGuestByEmail(email)

		if (!findUser) {
			alert("Email not exists")
			return
		} else if (findUser?.signup_password !== pass) {
			alert("Password not correct")
			return
		}

		return findUser
	}

	signUpGuest(data) {
		const findUser = this.findGuestByEmail(data.signup_email)
		if (findUser) {
			alert("Email exist!")
			return
		}

		this.#guests.push(data)
		this.setGuestsToLocalStorage([ ...this.#guests ])
	}

	setGuestsToLocalStorage(data) {
		localStorage.setItem("guests", JSON.stringify(data))
	}

	getGuestsFromLocalStorage() {
		const presistGuests = JSON.parse(localStorage.getItem("guests"))
		return presistGuests ? presistGuests : []
	}

	findGuestByEmail(email) {
		const findUser = this.#guests.find(gu => gu.signup_email === email)
		return findUser
	}
}

const authControll = new AuthController()

const formLogIn = document.querySelector(".form-login")
const formSignUp = document.querySelector(".form-signup")
const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})

formLogIn.addEventListener("submit", (e) => submit(e, "login-form-data", formLogIn))
formSignUp.addEventListener("submit", (e) => submit(e, "sign-up-form-data", formSignUp))

function submit(e, key, form){
	e.preventDefault();
	const data = {}
	const inputs = form.getElementsByTagName("input")
	Array.from(inputs).forEach((input) => {
		data[input.name] = input.value
	})
	localStorage.setItem(key, JSON.stringify(data))

	console.log(inputs);

	// set Guest
	if (key === "sign-up-form-data") {
		authControll.signUpGuest(data)
	} else {
		if (authControll.checkGuest(data["login-email"], data["login-password"])) {
			alert("OK")
		} 
	}
}


