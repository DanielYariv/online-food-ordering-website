function favoriteinitfunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}

function findUserID() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            return k;
        }
    }
    //ריטרן בלי כלום מחזיר אנדיפיינד
    return;
}

function showfavoritsRestaurants() {
    let userID = findUserID();
    if (userID != undefined) {
        let restaurantsArray = users[userID]["favorit restaurants indexes array"];
        for (let i = 0; i < restaurantsArray.length; i++) {
            favoriteCardsBuilder(restaurantsArray[i]);
        }
        if (restaurantsArray.length == 0) {
            document.getElementById("restaurants_favorits_cards").getElementsByTagName("h2")[0].innerHTML = "No favorites were chosen";
        }
    }
    else {
        alert("Only registered users can see their favorites");
        window.location.href = "home.html";
    }
}
//פונקציה שתממש רק במידה וכבר קיימת מסעדה בפייבוריט ולכן אין מה לבדוק תרחישי אנדיפיינד
function removefavoritRestaurant(restaurant_index) {
    let userID = findUserID();
    let indexResInfavoritArray = users[userID]["favorit restaurants indexes array"].indexOf(restaurant_index);
    users[userID]["favorit restaurants indexes array"].splice(indexResInfavoritArray, 1);
    localStorage["cgroup58"] = JSON.stringify(users);
    //לאחר שמחקנו ליוזר ספציפי את המסעדה ממערך המסעדות המומלצות שלו נאפס את הדיב לכפי שהוא במקור וניצור מחדש קארדים של המסעדות שנשארו במערך
    document.getElementById("restaurants_favorits_cards").innerHTML = `<h2 class="fw-bold mb-3">Favorites</h2>`;
    showfavoritsRestaurants();
}

function favoriteCardsBuilder(restaurant_index) {
    let i = restaurant_index;
    let imgNumber = Math.floor(Math.random() * 18) + 1;
    let imgUrl = `"img/restaurantsimgs/img${imgNumber}.png"`;
    let str = "";
    str +=
        `<div class="col-md-4 mb-3">
                                                 <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm grid-card">
                                                                            <div class="list-card-image">
                                                                                <div class="star position-absolute">
                                                                                    <span class="badge text-bg-success">
                                                                                    <i class="feather-star"></i>${Restaurants[i]["Aggregate rating"]}
                                                                                    </span>
                                                                                </div>
                                                                                <div class="favourite-heart text-danger position-absolute rounded-circle">
                                                                                <i class="feather-delete" onclick="removefavoritRestaurant(${i})"></i>
                                                                                </div>
                                                                                <a href="restaurant.html">
                                                                                    <img alt="#" src=${imgUrl} class="img-fluid item-img w-100">
                                                                                </a>
                                                                            </div>
                                                                                <div class="p-3 position-relative">
                                                                                    <div class="list-card-body">
                                                                                    <h6 class="mb-1">
                                                                                        <p class="text-black">${Restaurants[i]["Restaurant Name"]}</p>
                                                                                    </h6>
                                                                                    <p class="text-gray mb-3">Address: ${Restaurants[i].Address}</p>
                                                                                    <p class="text-gray mb-3">Cuisines: ${Restaurants[i].Cuisines}</p>
                                                                                    <p class="text-gray mb-3">Has Table booking: ${Restaurants[i]["Has Table booking"]}</p>
                                                                                    <p class="text-gray mb-3">Has Online delivery: ${Restaurants[i]["Has Online delivery"]}</p>
                                                                                    <p class="text-gray mb-3">Rating text: ${Restaurants[i]["Rating text"]}</p>
                                                                                    <p class="text-gray mb-3">Average Cost for two:${Restaurants[i]["Average Cost for two"]}</p>
                                                                                    <p class="text-gray mb-3">Currency: ${Restaurants[i].Currency}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>`
    document.getElementById("restaurants_favorits_cards").innerHTML += str;
}
//נגיע לפייבוריטס רק אם יש משתמש מחובר לכן אין צורך לבדוק תרחישים של מישהו לא מחובר
function logOutFavoritePageFunc() {
    for (let k in users) {
        users[k]["login status"] = "false";
    }
    localStorage["cgroup58"] = JSON.stringify(users);
}