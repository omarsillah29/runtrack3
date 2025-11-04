document.getElementById("formConnexion").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  document.getElementById("error-email").textContent =
    /\S+@\S+\.\S+/.test(email) ? "" : "Email invalide";

  document.getElementById("error-password").textContent =
    password.length >= 6 ? "" : "Mot de passe trop court";
});

const email = document.getElementById("email");
const errorEmail = document.getElementById("error-email");
email.addEventListener("input" , function(){
  if(!/\S+@\S+\.\S+/.test(email.value)) {
    errorEmail.textContent = 'Email invalide';
  }else {
    errorEmail.textContent = '';
  }
});

const password = document.getElementById("password");
const errorPassword = document.getElementById("error-password");
password.addEventListener("input" , function(){
  if(password.value.length < 6) {
    errorPassword.textContent = 'le mot de passe doit avoir au moins 6 charactères';
  }else {
    errorPassword.textContent = '';
  }
});