function successfulinitfunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}

function changingnamefunc() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            document.getElementById("name_changer").innerHTML = `${users[k]["user name"]}, Your order has been successful`;
        }
    }
}