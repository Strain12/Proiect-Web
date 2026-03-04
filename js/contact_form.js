 document.addEventListener("DOMContentLoaded",function(){
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value; 
        const email = document.getElementById("email").value.trim(); 
        const message = document.getElementById("message").value; 
        const feedback = document.getElementById("form-feedback");

        
        if(name.length < 2){
            feedback.textContent = "Numele trebuie sa aiba cel putin 2 caractere.";
            feedback.style.color = "red";
            return;
        }

        if(!email.includes('@')){
            feedback.textContent = "Emailul trebuie sa aiba @";
            feedback.style.color = "red";
            return;
        }

        if(message.length < 10){
            feedback.textContent = "Mesajul trebuie sa aiba cel putin 10 caractere";
            feedback.style.color = "red";
            return;
        }

        feedback.textContent = "Formular trimis cu succes!";
        feedback.style.color = "green";

        console.log("Nume:" + name);
        console.log("Email:" + name);
        console.log("Message:" + name);

    });


    console.warn("Stingerea!");
 })
 
 

    


function Salut(){
    const d = new Date();
    let hour = d.getHours();
    const paragraf = document.querySelector('header p');
    if (hour >=6 && hour <12){
        paragraf.textContent = "Buna Dimineata!";
    }else if(hour >=12 && hour <18){
        paragraf.textContent = "Buna Ziua!"
    }else paragraf.textContent = "seara Buna!"

}

document.addEventListener("DOMContentLoaded", Salut);