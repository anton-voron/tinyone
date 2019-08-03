const slideBtn = Array.from(document.querySelectorAll('input[name="slide-btn"]'));
const contentList = document.querySelectorAll('.content-list');
const ipad = document.querySelector('.ipad-section');
let currentSlide = 0;
const windowWidth = document.documentElement.clientWidth;

if(windowWidth <= 700) {
	ipad.remove();
}
slideBtn.forEach(btn => {
	btn.addEventListener('click', getSlide);
});


function getSlide (evt) {
	const idx = slideBtn.findIndex(btn => {
		return btn.id === evt.target.id 
	});

	contentList.forEach((item, index) => {
		item.classList.remove('show');
		currentSlide = idx;
		clearInterval(timerId);	
		(index == idx) && item.classList.toggle('show');
	});
	timerId = setInterval(nextSlide, 2000);
}

function nextSlide () {
	currentSlide = (currentSlide+1)%contentList.length;
	contentList.forEach((item, index) => {
		item.classList.remove('show');
		(index == currentSlide) && item.classList.toggle('show');	
	});
}

let timerId = setInterval(nextSlide, 2000);


const email = document.getElementById('email');
const warning = document.createElement('span');
let res = false;

email.after(warning);
email.addEventListener('input', validator);

function validator (evt) {
	const value  = evt.target.value;
	const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	warning.className = "warning";
	if(value.match(regexp)) {
			warning.innerHTML = "Email is correct";
			warning.style.color = "#fcdb00";
			res = true;
		} else {
			warning.innerHTML = "Invalid email";
			warning.style.color = "#e1e1e1";
			res = false;
		}
}

const formElem = document.getElementById('formElem');


const onSubmit = async (evt) => {
	evt.preventDefault();
	if(res) {
	await fetch(`https://formspree.io/email@domain.tld`, {
		method: "POST"
        });
	} else { alert("At first you have to input your correct email")}
}

formElem.addEventListener('submit', onSubmit);