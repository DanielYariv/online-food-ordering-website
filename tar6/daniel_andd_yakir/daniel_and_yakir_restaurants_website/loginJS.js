function logininitfunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}

function loginfunc() {
    let user_name = document.getElementById("user_name_login").value;
    let password = document.getElementById("password_login").value;
    for (let k in users) {
        if (users[k]["user name"] == user_name && users[k]["password"] == password) {
            users[k]["login status"] = "true";
            localStorage["cgroup58"] = JSON.stringify(users);
            alert(`Hello ${user_name}, you will be redirected to the home page`)
            window.location.href = "home.html";
            return;
        }
    }
    alert("Wrong password/user name or you have not registered");
}