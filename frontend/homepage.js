//import {userid} from "./login.js";
var newHabit="";
var count=0;
// var userId = localStorage.getItem('userId');
//ON LOAD HOW WEBSITE SHOULD BEHAVE
var userId="";
document.addEventListener('DOMContentLoaded', () => {
    var userId = localStorage.getItem('userId');
    fetchHabits(userId);

    //TO ADD EVENT LISTENER ON ADD HABIT BUTTON
    document.getElementById('add-button').addEventListener('click',()=>{
        newHabit =prompt("Enter new habit");
        addHabit(newHabit,userId);
    });
    

    //To handle daily button

    document.getElementById('habit-list').addEventListener('click', function(event) {
        // Check if the clicked element is a `.daily-button`
        if (event.target && event.target.classList.contains('daily-button')) {
            // Find the parent `.habit` of the clicked `.daily-button`
            var habitDiv = event.target.closest('.habit');
            
            // Get the habit text
            var habitText = habitDiv.childNodes[0].textContent.trim();
            
            //call the add habit to today's list
            addTodayHabit(habitText,userId);
            // Output the habit text
            console.log('Habit associated with the button:', habitText);
            
        }
        else if (event.target && event.target.classList.contains('fa')) {
            // Find the parent `.habit` of the clicked `.daily-button`
            var habitDiv = event.target.closest('.habit');
            
            // Get the habit text
            var habitText = habitDiv.childNodes[0].textContent.trim();
            
            //call the add habit to today's list
            deleteTodayHabit(habitText,userId);
            // Output the habit texts
            console.log('Habit associated with the button:', habitText);

            alert("habit to be deleted"+habitText);
            
        }

    });
});

// TO FETCH ALL THE HABITS ASSOCIATED WITH THE USER
async function fetchHabits(userId) {
    try {
        //console.log("1st statement");
        const response = await fetch(`http://localhost:3000/habit/allhabit/${userId}`);
       //console.log(response);
        if (response.ok) {
            const habits = await response.json();
            displayHabits(habits);
        } else {
            console.log('Failed to fetch habits');
        }
    } catch (error) {
        console.log('Error fetching habits:', error);
    }
}
//To display Habit On the Basis Of User
function displayHabits(habits) {
    
    var habitlist=document.getElementById('habit-list');
    
    habits.map((habit) => {
        var habitdiv=document.createElement('div');
        habitdiv.classList.add('habit');
        var dailybutton=document.createElement('button');
        dailybutton.classList.add('daily-button');
        dailybutton.innerHTML="Today";
        var deleteicon=document.createElement('i');
        deleteicon.classList.add('fa','fa-trash');
        habitdiv.innerHTML =habit.habit;
        habitdiv.appendChild(dailybutton);
        habitdiv.appendChild(deleteicon);
        habitlist.appendChild(habitdiv);
    });
}

//TO ADD NEW HABIT

async function addHabit(newHabit,userId){
    
    var result =await fetch(`http://localhost:3000/habit/addhabit/${userId}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({newHabit : newHabit})
});
var data=await result.json();
//alert(data);
if(data.success){
    var habitlist=document.getElementById('habit-list');
    var habitdiv=document.createElement('div');
        habitdiv.classList.add('habit');
        var dailybutton=document.createElement('button');
        dailybutton.classList.add('daily-button');
        dailybutton.innerHTML="Today";
        var deleteicon=document.createElement('i');
        deleteicon.classList.add('fa','fa-trash');
        habitdiv.innerHTML =newHabit;
        habitdiv.appendChild(dailybutton);
        habitdiv.appendChild(deleteicon);
        habitlist.appendChild(habitdiv);
}
else{
    alert("Habit Exists Already");
}
}

//To add habit to daily list
async function addTodayHabit(habit,userId){
    var result =await fetch(`http://localhost:3000/todayhabit/addhabit/${userId}`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({newHabit : habit})
});

      var data=await result.json();
       //console.log(data);//alert(data);
       if(data.success){
        alert("Succesfully Added Habit to Today's List");
       }
       else{
        alert('Habit Already Exist in Todays List');
       }

}

//DELETE A HABIT

async function deleteTodayHabit(habit,userId){
    var result =await fetch(`http://localhost:3000/habit/deletehabit/${userId}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({habit : habit})
});

      var data=await result.json();
//alert(data);
       if(data.success){
        alert("Succesfully Deleted Habit from the List");
       }
       else{
        alert('Something went wrong');
       }
       window.location.reload();

}

