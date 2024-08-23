
var userId = localStorage.getItem('userId');
document.addEventListener('DOMContentLoaded', () => {
   // var userId = localStorage.getItem('userId');
    allTodayHabits(userId);
});

// Function to fetch and display all today habits
async function allTodayHabits(userId) {
    const response = await fetch(`http://localhost:3000/todayhabit/allhabit/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const habits = await response.json();
        displayHabits(habits, userId);
    } else {
        alert("something went wrong");
    }
}

// Function to display habits and bind events
function displayHabits(habits, userId) {
    var habitList = document.getElementById('habit-list');
    habitList.innerHTML = ''; // Clear previous contents

    habits.forEach(habit => {
        const dailyHabitListDiv = document.createElement('div');
        dailyHabitListDiv.id = 'daily-habit-list';
        dailyHabitListDiv.style.marginTop = '20px';

        const habitName = document.createElement('h2');
        habitName.className = 'habit-name';
        habitName.textContent = habit.habit;

        const trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash deleteicon';
        trashIcon.style.fontSize = '30px';
        trashIcon.style.marginLeft = '27vw';
        habitName.appendChild(trashIcon);

        const tableDiv = document.createElement('div');
        const table = document.createElement('table');

        const headerRow = document.createElement('tr');
        const headers = ['Mon', 'Tues', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
        headers.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);


        const dataRow = document.createElement('tr');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    days.forEach(day => {
    const td = document.createElement('td');
    const button = document.createElement('button');
    button.classList.add('status');
    button.dataset.day = day;
    
    // Retrieve the status for the current day
    const status = habit[day];
    button.value = status;

    // Add class based on status
    if (status === 'done') {
        button.classList.add('green');
    } else if (status === 'notdone') {
        button.classList.add('red');
    } else { // default value 'none'
        button.classList.add('blue');
    }

    td.appendChild(button);
    dataRow.appendChild(td);
});
        table.appendChild(dataRow);

        tableDiv.appendChild(table);

        dailyHabitListDiv.appendChild(habitName);
        dailyHabitListDiv.appendChild(tableDiv);
        habitList.appendChild(dailyHabitListDiv);
    });

    // Bind event listeners to newly added status buttons
    const statusButtons = document.getElementsByClassName('status');
    for (let i = 0; i < statusButtons.length; i++) {
        const button = statusButtons[i];
        button.addEventListener('click', () => {
            let state = button.value;
            if (state === 'none') {
                button.value = 'done';
                button.classList.remove('blue');
                button.classList.add('green');
            } else if (state === 'done') {
                button.value = 'notdone';
                button.classList.remove('green');
                button.classList.add('red');
            } else if (state === 'notdone') {
                button.value = 'none';
                button.classList.remove('red');
                button.classList.add('blue');
            }

            const day = button.getAttribute('data-day');
            const habitSection = button.closest('#daily-habit-list');
            const habitName = habitSection.querySelector('.habit-name').textContent.trim();

            const data = {
                habit: habitName,
                day: day,
                state: button.value
            };
            updateTodayHabits(data, userId);
        });
    }
}

// Function to update habit
async function updateTodayHabits(data, userId) {
    const response = await fetch(`http://localhost:3000/todayhabit/updatehabit/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const resdata = await response.json();
    if (resdata.success) {
        alert(`Marked as ${data.state}`);
    } else {
        alert("something went wrong");
    }
}

// Function to delete habit
async function deleteTodayHabit(data, userId) {
    const response = await fetch(`http://localhost:3000/todayhabit/deletehabit/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data })
    });
    const resdata = await response.json();
    if (resdata.success) {
        alert("deleted successfully");
    } else {
        alert("something went wrong");
    }
    window.location.reload();
}

// Event listener to delete a habit
document.getElementById('habit-list').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('fa')) {
        var habitDiv = event.target.closest('.habit-name');
        var habitText = habitDiv.childNodes[0].textContent.trim();
        deleteTodayHabit(habitText, userId);
        alert("habit to be deleted" + habitText);
    }
});

