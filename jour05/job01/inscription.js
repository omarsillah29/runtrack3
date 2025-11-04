document.getElementById("formInscription").addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    { id: "nom", message: "Nom requis" , validate: val=> val.length >=2},
    { id: "prenom", message: "Prénom requis" , validate: val=> val.length >=2},
    { id: "email", message: "Email invalide", validate: val => /\S+@\S+\.\S+/.test(val) },
    { id: "password", message: "Mot de passe requis", validate: val => val.length >= 6 },
    { id: "confirm", message: "Confirmation incorrecte", validate: val => val === document.getElementById("password").value }
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorDiv = document.getElementById("error-" + field.id);
    const value = input.value.trim();

    let isValid = value !== "";
    if (field.validate) {
      isValid = field.validate(value);
    }

    errorDiv.textContent = isValid ? "" : field.message;
  });
});

const nom = document.getElementById("nom");
const errorNom = document.getElementById("error-nom");
nom.addEventListener("input" , function(){
  if(nom.value.length < 2) {
    errorNom.textContent = 'le nom doit avoir au moins 2 charactères'
  }else {
    errorNom.textContent = '';
  }
})
const prenom = document.getElementById("prenom");
const errorPrenom = document.getElementById("error-prenom");
prenom.addEventListener("input" , function(){
  if(prenom.value.length < 2) {
    errorPrenom.textContent = 'le prenom doit avoir au moins 2 charactères'
  }else {
    errorPrenom.textContent = '';
  }
})

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
const confirm = document.getElementById("confirm");
const errorConfirm = document.getElementById("error-confirm");
confirm.addEventListener("input" , function(){
  if(confirm.value !== password.value) {
    errorConfirm.textContent = 'la confirmation ne correspond pas';
  }else {
    errorConfirm.textContent = '';
  }
});
