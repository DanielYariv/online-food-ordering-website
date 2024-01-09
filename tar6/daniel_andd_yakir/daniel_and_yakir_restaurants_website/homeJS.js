//< !--JS for map-- >
//first latitude then longitude (leaflet understand numbers and strings)
var map = L.map('map').setView([14.553708, 121.014101], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//part B
function initfunc() {
    //נבדוק אם קיים זיכרון שמור ואם כן אז נמיר אותו חזרה למה שהוא היה כדי שנוכל לעבוד איתו בצורה הקודמת שלו ושלא סתם יהיה סטרינג
    if (localStorage["cgroup58"] != undefined) {
        users = JSON.parse(localStorage["cgroup58"]);
    }
    //בשביל התרחיש שאין לוקל סטורג ואז ככה בעצם מקימים את היוזרס בפעם הראשונה
    else {
        users = {};
    }
}

function checkIfUserLoginfunc() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            return k;
        }
    }
    return;
}

//פונקציה שממלא את הפרופרטי (שהוא מערך) של מסעדות אהובות של כל משתמש במסעדות שהוא בחר ומשנה את האייקון לכוכב
function addToUserFavoritesfunc(restaurant_index, i_element) {
    let userID = checkIfUserLoginfunc();
    if (userID != undefined) {
        if (users[userID]["favorit restaurants indexes array"].includes(restaurant_index)) {
            alert("The restaurant is already in your favorites ");
        }
        else {
            i_element.className = "feather-star";
            users[userID]["favorit restaurants indexes array"].push(restaurant_index);
            localStorage["cgroup58"] = JSON.stringify(users);
        }
    }
    else {
        alert("Only registered users can add to favorites")
    }
}

function logHidefunc() {
    for (let k in users) {
        if (users[k]["login status"] == "true") {
            document.getElementById("login_link").style.display = "none";
            document.getElementById("logout_link").style.display = "block";
            document.getElementById("login_link_phone").style.display = "none";
            document.getElementById("logout_link_phone").style.display = "block";
            return;
        }
    }
    document.getElementById("logout_link").style.display = "none";
    document.getElementById("logout_link_phone").style.display = "none";
}
function logOutFunc() {
    for (let k in users) {
        users[k]["login status"] = "false";
    }
    localStorage["cgroup58"] = JSON.stringify(users);
    //לאחר שהמשתמש התנתק תראה רק כפתור סייגן אין
    document.getElementById("login_link").style.display = "block";
    document.getElementById("logout_link").style.display = "none";
    document.getElementById("login_link_phone").style.display = "block";
    document.getElementById("logout_link_phone").style.display = "none";

}
//end part B

//part A
//call all the filter functions
function showFiltersfunc() {
    cuisinesOptionsfunc();
    HasTablebookingfunc();
    priceRangeFilter();
}

//Cuisines filter section
function getuniqueCuisinesfunc() {
    let all_Cuisines_array = [];
    let all_Cuisines_set = new Set;
    let all_uniq_Cuisines_array;
    //אכניס את כל הקואיזינס למערך כאשר הספליט יעזור לי שכל קואזינס יהיה בתא נפרד כי יש כאלה שהם כמה קואזיניס באותו תא ורק מפריד ביניהם פסיק כי ככה הדאטה בנוי והשלוש נקודות יעזרו לי לפרק את התתי מערכים שהספליט עשה וככה ישאר לי רק מערך אחד שמכיל כל קואיזנס בא נפרד
    for (let i = 0; i < Restaurants.length; i++) {
        all_Cuisines_array.push(...Restaurants[i].Cuisines.split(','));
    }
    //יש הרבה כפילויות לכן ננקה אותם בעזרת סט כי אליו נכנסים רק ערכים ייחודיים
    for (let i = 0; i < all_Cuisines_array.length; i++) {
        all_Cuisines_set.add(all_Cuisines_array[i].trim());
    }
    //נכניס את הערכים מהסט למערך
    all_uniq_Cuisines_array = [...all_Cuisines_set];
    //נסיר את התו הריק שנוצר בגלל כאלה שאין לה קואזין
    let index_empty = all_uniq_Cuisines_array.indexOf("");
    all_uniq_Cuisines_array.splice(index_empty, 1);
    //נחזיר את המערך מסודר אלפביתי כדי שיהיה קל למשתמשים להתמצא
    return all_uniq_Cuisines_array.sort();
}

function cuisinesOptionsfunc() {
    let uniqCuisinesArray = getuniqueCuisinesfunc();
    let str = "";
    str += `<select id="cuisines">
                                                                                                    <option value=-1>Select cuisine</option> `;
    for (let i = 0; i < uniqCuisinesArray.length; i++) {
        str += `<option value="${uniqCuisinesArray[i]}">${uniqCuisinesArray[i]}</option>`;
    }
    str += `</select >`;
    str += `<br />`;
    document.getElementById("cuisines_filter").innerHTML += str;
}
//end of Cuisines filter section

//Has Table booking or Has Online delivery filter section
function HasTablebookingfunc() {
    let str = `<select id="dine_in_or_online">
                                                                                                        <option value=-1>Select a preference</option>
                                                                                                        <option value="dine in">dine in</option>
                                                                                                        <option value="delivery">delivery</option>
                                                                                                       </select >`;
    document.getElementById("dine_in_or_online_filter").innerHTML += str;
}
//end of Table booking and Has Online delivery filter section

//price range price filter section
function findPriceRangeFunc() {
    let allUniquePriceRangeSet = new Set;
    let allPriceRangeArray = [];
    for (let i = 0; i < Restaurants.length; i++) {
        allUniquePriceRangeSet.add(Restaurants[i]["Price range"]);
    }
    //נכניס את הערכים מהסט לתוך מערך
    allPriceRangeArray = [...allUniquePriceRangeSet];
    //נחזיר את המערך המספרי מסודר מקטן לגדול
    return allPriceRangeArray.sort();
}
function priceRangeFilter() {
    let priceRangeArray = findPriceRangeFunc();
    let str = "";
    let verbalPriceRangeArray = ["Inexpensive", "Moderately expensive", "Expensive", "Very Expensive"]
    str += `<select id="range_price">
                                                                                                                             <option value=-1>Select price range</option>`;
    for (let i = 0; i < priceRangeArray.length; i++) {
        str += `<option value="${priceRangeArray[i]}">${verbalPriceRangeArray[i]}</option>`;
    }
    document.getElementById("range_price_filter").innerHTML += str;
}
//end of price range filter section


//location filter function
function locationfilterfunc(city_name) {
    if (city_name == "Makati City") {
        document.getElementById("restaurants_headline").innerHTML = `Top Restaurants - Makati (⭐️⭐️⭐️⭐️+)`;
        document.getElementById("restaurants_cards").innerHTML = "";
        for (let i = 0; i < Restaurants.length; i++) {
            if (Restaurants[i].City == city_name && Restaurants[i]["Aggregate rating"] >= 4.5) {
                restaurantCardBuilderfunc(i);
            }
        }
    }
    if (city_name == "New Delhi") {
        document.getElementById("restaurants_headline").innerHTML = `Top Restaurants - New Delhi (⭐️⭐️⭐️⭐️+)`;
        document.getElementById("restaurants_cards").innerHTML = "";
        for (let i = 0; i < Restaurants.length; i++) {
            if (Restaurants[i].City == city_name && Restaurants[i]["Aggregate rating"] >= 4.5) {
                restaurantCardBuilderfunc(i);
            }
        }
    }
    if (city_name == "Albany") {
        document.getElementById("restaurants_headline").innerHTML = `Top Restaurants - Albany (⭐️⭐️⭐️+)`;
        document.getElementById("restaurants_cards").innerHTML = "";
        for (let i = 0; i < Restaurants.length; i++) {
            if (Restaurants[i].City == city_name && Restaurants[i]["Aggregate rating"] >= 3) {
                restaurantCardBuilderfunc(i);
            }
        }
    }
    if (city_name == "Orlando") {
        document.getElementById("restaurants_headline").innerHTML = `Top Restaurants - Orlando (⭐️⭐️⭐️+)`;
        document.getElementById("restaurants_cards").innerHTML = "";
        for (let i = 0; i < Restaurants.length; i++) {
            if (Restaurants[i].City == city_name && Restaurants[i]["Aggregate rating"] >= 3) {
                restaurantCardBuilderfunc(i);
            }
        }
    }
}


//filter for 4.5 stars restaurant and above base on cuasine type
function filterFourStarfunc(cuasine_name) {
    document.getElementById("restaurants_headline").innerHTML = `Top ${cuasine_name} (⭐️⭐️⭐️⭐️+)`;
    document.getElementById("restaurants_cards").innerHTML = "";
    for (let i = 0; i < Restaurants.length; i++) {
        if (Restaurants[i].Cuisines.includes(cuasine_name) && Restaurants[i]["Aggregate rating"] >= 4.5) {
            restaurantCardBuilderfunc(i);
        }
    }
}
//button section
//validation check
function validationCheckfunc() {
    cuisines_choose = document.getElementById("cuisines").value;
    dine_in_or_online_choose = document.getElementById("dine_in_or_online").value;
    range_price_choose = document.getElementById("range_price").value;
    if (cuisines_choose == -1 || dine_in_or_online_choose == -1 || range_price_choose == -1 || cuisines_choose == "") {
        return false;
    }
    return true;

}

//on button click function
function filterActivatedfunc() {
    let validation = validationCheckfunc();
    if (validation === false) {
        alert("please choose all the filters ");
    }
    if (validation === true) {
        showFilterdResturantsfunc();
    }

}

function checkIfDineInOrOnlinefunc() {
    dine_in_or_online_choose = document.getElementById("dine_in_or_online").value;
    if (dine_in_or_online_choose === "dine in") {
        return 1;
    }
    if (dine_in_or_online_choose === "delivery") {
        return 2;
    }
    //לעולם לא נגיע לפה
    return;
}

function showFilterdResturantsfunc() {
    document.getElementById("restaurants_cards").innerHTML = "";
    let findRestaurants = false;
    user_choose = checkIfDineInOrOnlinefunc();
    cuisine_choose = document.getElementById("cuisines").value;
    range_price_choose = document.getElementById("range_price").value;
    for (let i = 0; i < Restaurants.length; i++) {
        if (Restaurants[i].Cuisines.includes(cuisine_choose) === true && Restaurants[i]["Price range"] == range_price_choose) {
            if (user_choose === 1 && Restaurants[i]["Has Table booking"] === "Yes") {
                restaurantCardBuilderfunc(i);
                findRestaurants = true;
            }
            if (user_choose === 2 && Restaurants[i]["Has Online delivery"] === "Yes") {
                restaurantCardBuilderfunc(i);
                findRestaurants = true;
            }
        }
    }
    document.getElementById("restaurants_headline").innerHTML = "Custom Filterd Restaurants";
    if (findRestaurants === false) {
        document.getElementById("restaurants_cards").innerHTML = "<p>There are no restaurants matching your filters</p>";
    }
}
//פונקצית עזר בשביל שבבנית הקארדים של המסעדות אוכל לבדוק אם מדובר במסעדה שכבר בפייבוריטים
function findUserIDIfExists() {
    if (users != undefined) {
        for (let k in users) {
            if (users[k]["login status"] == "true") {
                return k;
            }
        }
    }
    //ריטרן בלי כלום מחזיר אנדיפיינד
    return;
}
//האיף משמש אותי כדי שאדע איזה אייקון לשים של מסעדה שכבר בפייבוריטים או של מסעדה שעדיין לא
function restaurantCardBuilderfunc(restaurant_index) {
    let userID = findUserIDIfExists();
    let str = "";
    let i = restaurant_index;
    let imgNumber = Math.floor(Math.random() * 18) + 1;
    let imgUrl = `"img/restaurantsimgs/img${imgNumber}.png"`;
    str +=
        `<div class="osahan-slider-item col-6 col-md-4 pb-3" >
                                                                             <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                                                                <div class="list-card-image">
                                                                                    <div class="star position-absolute">
                                                                                        <span class="badge text-bg-success">
                                                                                        <i class="feather-star"></i>${Restaurants[i]["Aggregate rating"]}
                                                                                        </span>
                                                                                    </div>`;
    if (userID != undefined && users[userID]["favorit restaurants indexes array"].includes(i) == true) {
        str += `<div class="favourite-heart text-danger position-absolute rounded-circle">
                                                                                            <i class="feather-star" onclick="addToUserFavoritesfunc(${i},this)"></i>
                                                                                    </div>`;

    }
    else {
        str += `<div class="favourite-heart text-danger position-absolute rounded-circle">
                                                                                            <i class="feather-heart" onclick="addToUserFavoritesfunc(${i},this)"></i>
                                                                                    </div>`;
    }

    str += `<div class="member-plan position-absolute">
                                                                                        <button class="badge text-bg-dark" value="${i}" onclick="markRestaurantsfunc(this.value)">mark on the map</button>
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
    document.getElementById("restaurants_cards").innerHTML += str;
}
//bonus function mark restaurant on the map

function markRestaurantsfunc(restaurant_index) {
    let i = restaurant_index;
    if (Restaurants[i].Latitude == 0 && Restaurants[i].Longitude == 0) {
        alert(`the Restaurant "${Restaurants[i]["Restaurant Name"]}" did not provide a location`);
    }
    else {
        let marker = L.marker([Restaurants[i].Latitude, Restaurants[i].Longitude]).addTo(map);
        marker.bindPopup(`Name: ${Restaurants[i]["Restaurant Name"]},<br> Address: ${Restaurants[i].Address}`).openPopup();
        map.panTo([Restaurants[i].Latitude, Restaurants[i].Longitude]);
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    }

}
            //end of buttons section
            //end part A
