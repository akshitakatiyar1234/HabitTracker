//LOGIN FUNCTIONALITY

var loginButton= document.getElementById('login-submit-button');
var loginEmail=     document.getElementById('login-email');
var loginPassword = document.getElementById('login-passsword');
var userid="";
loginButton.addEventListener('click',handleLoginClick);

//CHECKING WHETHER USER EXIST
async function handleLoginClick(){
   
    var result =await fetch("http://localhost:3000/api/login",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email : loginEmail.value , password:loginPassword.value})
});
userid=result.headers.get('userId');
localStorage.setItem('userId',userid);
var data=await result.json();
if(data.success){
    alert("Logged in successfully");
    window.location.href='file:///C:/Users/sys/Desktop/Habit%20Tracker/frontend/homepage.html';
}
else{
    alert("User do not exist plz register");
    window.location.href='file:///C:/Users/sys/Desktop/Habit%20Tracker/frontend/register.html';
}
}

