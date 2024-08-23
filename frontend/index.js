
//REGISTER FUNCTIONALITY

var registerButton= document.getElementById('register-submit-button');
var registerusername=document.getElementById('register-name');
var registerEmail= document.getElementById('register-email');
var registerPassword = document.getElementById('register-password');

async function handleRegisterClick(){
   // event.preventDefault();
    alert(registerusername.value);
    var result =await fetch("http://localhost:3000/api/register",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:registerusername.value, email : registerEmail.value , password: registerPassword.value})
        //JSON.stringify()
});
const data =await result.json();

if(data.success){
    alert("Account Created successfully");
    window.location.href='file:///C:/Users/sys/Desktop/Habit%20Tracker/frontend/login.html';
}
else{
    alert("Something went wrong");
    window.location.href='file:///C:/Users/sys/Desktop/Habit%20Tracker/frontend/register.html';
}
}
registerButton.addEventListener('click',handleRegisterClick);