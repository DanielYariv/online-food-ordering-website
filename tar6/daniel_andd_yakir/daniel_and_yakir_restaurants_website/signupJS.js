function signupinitfunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}

function registrationfunc() {
    let is_it_new = true;
    let id = Date.now().toString();
    let user_name = document.getElementById("user_name_signup").value;
    let password = document.getElementById("password_signup").value;

    if (user_name == "" || password == "") {
        alert("Username or password cannot be empty")
        return;
    }
    //each k is id object that contains the propertis user name  password login favorit restaurants indexes array and orders
    for (let k in users) {
        if (users[k]["user name"] == user_name) {
            is_it_new = false;
            alert("user name already taken");
            return;
        }
    }

    if (is_it_new == true) {
        user = {
            "user name": user_name,
            "password": password,
            "login status": "true",
            "favorit restaurants indexes array": [],
            "orders": []
        }
        users[id] = user;
        localStorage["cgroup58"] = JSON.stringify(users);
        users = JSON.parse(localStorage["cgroup58"]);
        alert(`Registration complete, you will be redirected to the home page `);
        window.location.href = "home.html";
    }
}