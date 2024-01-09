function initMenufunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}
function menufindUserID() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            return k;
        }
    }
    //ריטרן בלי כלום מחזיר אנדיפיינד
    return;
}
function menubuilderfunc(langname,langdescription) {
    startersbuilderfunc(langname, langdescription);
    mainbuilderfunc(langname, langdescription);
    drinksbuilderfunc(langname)
}
function startersbuilderfunc(langname, langdescription) {
    document.getElementById("starters_div").innerHTML = "";
    let str = "";
    for (let k in menu.starters) {
        str += `<div class="d-flex align-items-center gap-2 p-3 border-bottom menu-list">`;
        str += `<div class="fw-bold text-success non_veg">.</div>`;
        str += `<div>`;
        str += `<h6 class="mb-1">${menu.starters[k][langname]}</h6>`;
        str += `<p class="text-muted mb-0">${menu.starters[k][langdescription]}</p>`;
        str += `<p class="text-muted mb-0">${menu.starters[k].price} <span class="text-muted mb-0">${menu.starters[k].currency}</span></p>`;
        str += `</div >`;
        str += `<span class="ms-auto"><button type="button" class="btn btn-outline-secondary btn-sm" onclick="orderbuilderfunc('${menu.starters[k].name}','${menu.starters[k].price}')">ADD</button></span>`;
        str += `</div`;
        document.getElementById("starters_div").innerHTML += str;
        str = "";
    }
}

function mainbuilderfunc(langname, langdescription) {
    document.getElementById("main_dish_div").innerHTML = "";
    let str = "";
    for (let k in menu.main) {
        str += `<div class="d-flex gap-2 p-3 border-bottom gold-members">`;
        str += `<div class="fw-bold text-success non_veg">.</div>`
        str += `<div>`;
        str += `<h6 class="mb-1">${menu.main[k][langname]}</h6>`;
        str += `<p class="text-muted mb-0">${menu.main[k][langdescription]}</p>`;
        str += `<p class="text-muted mb-0">${menu.main[k].price} <span class="text-muted mb-0">${menu.main[k].currency}</span></p>`;
        str += `</div >`;
        str += `<span class="ms-auto"><button type="button" class="btn btn-outline-secondary btn-sm" onclick="orderbuilderfunc('${menu.main[k].name}','${menu.main[k].price}')"">ADD</button></span>`;
        str += `</div`;
        document.getElementById("main_dish_div").innerHTML += str;
        str = "";
    }
}

function drinksbuilderfunc(langname) {
    document.getElementById("drinks_div").innerHTML ="" ;
    let str = "";
    for (let k in menu.drinks) {
        str += `<div class="d-flex gap-2 p-3 border-bottom gold-members">`;
        str += `<div class="fw-bold text-success non_veg">.</div>`
        str += `<div>`;
        str += `<h6 class="mb-1">${menu.drinks[k][langname]}</h6>`;
        str += `<p class="text-muted mb-0">${menu.drinks[k].price} <span class="text-muted mb-0">${menu.drinks[k].currency}</span></p>`;
        str += `</div >`;
        str += `<span class="ms-auto">`
        str += `<button type="button" class="btn btn-outline-secondary btn-sm" onclick="orderbuilderfunc('${menu.drinks[k].name}','${menu.drinks[k].price}')">ADD</button></span>`;
        str += `</div`;
        document.getElementById("drinks_div").innerHTML += str;
        str = "";
    }
}

orderdetails = [];
function orderbuilderfunc(name, price) {
    let delete_id = Date.now().toString();
    let userID = menufindUserID();
    if (userID != undefined) {
        let str = "";
        str += `<div id="${delete_id}" class="gold-members d-flex align-items-center justify-content-between px-3 py-2 border-bottom">`;
        str += `<div class="d-flex align-items-center">`;
        str += `<div class="me-2 text-success">&middot;</div>`;
        str += `<div class="media-body">`;
        str += `<p class="m-0">${name} <span class="feather-trash-2" onclick="deleteElementfromorderfunc(${delete_id},${price},'${name}')"></p>`
        str += `</div>`;
        str += `</div >`;
        str += `<div class="d-flex align-items-center">`;
        str += `<p class="text-gray mb-0 float-end ms-2 text-muted small">${price} ILS</p>`;
        str += `</div>`;
        str += `</div>`;
        document.getElementById("order_summery_div").innerHTML += str;
        totalpaymentfunc(price, "add");
        item = {
            name: name,
            price: price
        }
        orderdetails.push(item);
    }
    else {
        alert("Only registered users can order");
    }
}
//delete and add total payment function the flag is add or delete.
let items_payment = 0;
let is_delivery_discount_applied = false;
function totalpaymentfunc(cost, flag) {
    let totalArray = document.getElementsByClassName("total_payment");
    let bill = totalArray[0];
    let delivery = totalArray[1];
    let discount = totalArray[2];
    let total_pay = totalArray[3];
    let total_pay2 = totalArray[4];
    delivery.innerHTML = 15;
    temp_delivery = 0;
    if (flag == "add") {

        items_payment += Number(cost);
        if (items_payment >= 300 && is_delivery_discount_applied == true) {
            temp_delivery = 0;
            discount.innerHTML = 15;
        }
        if (items_payment >= 300 && is_delivery_discount_applied == false) {
            temp_delivery = 0;
            discount.innerHTML = 15;
            is_delivery_discount_applied == true;
        }
        if (items_payment < 300) {
            temp_delivery = 15;
            is_delivery_discount_applied = false;
        }
        bill.innerHTML = items_payment;
        total_pay.innerHTML = Number(items_payment) + temp_delivery;
        total_pay2.innerHTML = total_pay.innerHTML;

    }

    if (flag == "delete") {
        items_payment -= cost;

        if (items_payment >= 300) {
            temp_delivery = 0;
            discount.innerHTML = 15;
        }
        if (items_payment < 300) {
            temp_delivery = 15;
            discount.innerHTML = 0;
            is_delivery_discount_applied = false;
        }
        if (items_payment == 0) {
            temp_delivery = 0;
            total_pay.innerHTML = 0;
        }

        bill.innerHTML = items_payment;
        total_pay.innerHTML = Number(items_payment) + temp_delivery;
        total_pay2.innerHTML = total_pay.innerHTML;
    }

}

function ordersaverfunc() {
    let userID = menufindUserID();
    if (userID != undefined) {
        if (items_payment == 0) {
            alert("Your order is empty");
        }
        if (items_payment > 0) {
            users[userID]["orders"].push(orderdetails);
            localStorage["cgroup58"] = JSON.stringify(users);
            window.location.href = "successful.html"
        }
    }
    else {
        alert("Only registered users can order");
    }
}
function deleteElementfromorderfunc(delete_id, price, name) {
    let index = 0;
    for (let i = 0; i < orderdetails.length; i++) {
        if (name==orderdetails[i].name) {
            index = i;
            break;
        }
    }
    orderdetails.splice(index, 1);
    document.getElementById(delete_id).remove();
    totalpaymentfunc(price, "delete");
}

function logHideRestaurantfunc() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            document.getElementById("login_link_Restaurant").style.display = "none";
            document.getElementById("logout_link_Restaurant").style.display = "block";
            document.getElementById("login_link_phone_Restaurant").style.display = "none";
            document.getElementById("logout_link_phone_Restaurant").style.display = "block";
            return;
        }
    }
    document.getElementById("logout_link_Restaurant").style.display = "none";
    document.getElementById("logout_link_phone_Restaurant").style.display = "none";
}
function logOutRestaurantFunc() {
    for (let k in users) {
        users[k]["login status"] = "false";
    }
    localStorage["cgroup58"] = JSON.stringify(users);
    //לאחר שהמשתמש התנתק תראה רק כפתור סייגן אין
    document.getElementById("login_link_Restaurant").style.display = "block";
    document.getElementById("logout_link_Restaurant").style.display = "none";
    document.getElementById("login_link_phone_Restaurant").style.display = "block";
    document.getElementById("logout_link_phone_Restaurant").style.display = "none";

}

function likefunction(flag) {
    let userID = menufindUserID();
    if (userID!=undefined) {
        if (flag==1) {
            document.getElementById("comment_one_like").style.background = "#d92662";
            document.getElementById("comment_one_like").style.color = "#fff";
            document.getElementById("comment_one_dislike").style.background = "#fff";
            document.getElementById("comment_one_dislike").style.color = "#E23744";
        }
        if (flag == 2) {
            document.getElementById("comment_one_like").style.background = "#fff";
            document.getElementById("comment_one_like").style.color = "#E23744";
            document.getElementById("comment_one_dislike").style.background = "#d92662";
            document.getElementById("comment_one_dislike").style.color = "#fff";
        }
        if (flag == 3) {
            document.getElementById("comment_two_like").style.background = "#d92662";
            document.getElementById("comment_two_like").style.color = "#fff";
            document.getElementById("comment_two_dislike").style.background = "#fff";
            document.getElementById("comment_two_dislike").style.color = "#E23744";
        }
        if (flag == 4) {
            document.getElementById("comment_two_like").style.background = "#fff";
            document.getElementById("comment_two_like").style.color = "#E23744";
            document.getElementById("comment_two_dislike").style.background = "#d92662";
            document.getElementById("comment_two_dislike").style.color = "#fff";
        }
    }
    else {
        alert("only registered user can add likes");
    }
}
