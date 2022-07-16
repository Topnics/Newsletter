const asideSection = document.querySelector("aside");
const mainSection = document.querySelector("main");

const signInBtn = document.getElementById("sign-in-btn");
const signUpBtn = document.getElementById("sign-up-btn");

// const inputFeilds = document.querySelectorAll("input");
// const validInputs = Array.from(inputFeilds).filter( input => input.value !== "");

// console.log(validInputs.length)
// if (validInputs.length === 0){
//   alert("input your details");
//   };
signInBtn.addEventListener("click", () => {
  mainSection.classList.add("slideRight");
  asideSection.classList.add("slideLeft");
});

signUpBtn.addEventListener("click", () => {
  // e.preventDefault()
  mainSection.classList.remove("slideRight");
  asideSection.classList.remove("slideLeft");
});