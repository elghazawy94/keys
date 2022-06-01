let numKey = 28;
let filterLink = document.querySelectorAll(".nav-tabs li a");
let lockerShow = document.getElementById("lockerBox");
let numCloseLocker = document.getElementById("numLocker");
let totalLocker = document.getElementById("totalLocker");
let progresBar = document.querySelector(".progress-bar");
let scrollTop = document.getElementById("scroll-top");
let checkLocker = document.getElementsByName("checkLocker");
let addLocker = document.getElementById("addLocker");
let numberLockerAdd = document.getElementById("numberLockerAdd");
$("#createLocker").click(function (e) { 
    for (var i = 0, length = checkLocker.length; i < length; i++) {
        if (checkLocker[i].checked) {
        var filterLocker = checkLocker[i].value;
        break;
        }
    }
    checkValue(filterLocker);
    if(filterLocker === "redLocker"){
        var color = "danger";
    }else if(filterLocker === "blueLocker"){
        var color = "primary";
    }else if(filterLocker === "yellowLocker"){
        var color = "warning";
    }
    if(!isNaN(numberLockerAdd.value)){
        for(var i=1; i<=numberLockerAdd.value; i++){
            var addKey = {id : lockers[filterLocker].length+1,color : color,status  : true}
            lockers[filterLocker].push(addKey);
        }
        localStorage.setItem("lockers", JSON.stringify(lockers));
        filter(filterLocker,color);
        successMsg = document.getElementById('namesuccess').innerHTML = `<div class="alert alert-success" role="alert">Successfully added</div>`;
        createLocker.remove();
        setTimeout(function(){
            $("#addLocker").modal("hide");
            location.reload();
        },3000);
    }else{
        errorMsg = document.getElementById('nameError').innerHTML = `<div class="alert alert-danger" role="alert">The value must be numbers only, try again</div>`;
    }
});
if(localStorage.getItem("lockers") === null){
    createLockers();
    }else{
    lockers = JSON.parse(localStorage.getItem("lockers"));
    filter("redLocker","danger");
}
filterLink.forEach(function(e){;
    e.onclick = function (ele) {
        filterLink.forEach(function(element){
            element.classList.remove("active");
        });
        e.classList.add("active");
        if (e.dataset.testid === "redLocker"){
            filter("redLocker","danger");
        }else if(e.dataset.testid === "blueLocker"){
            filter("blueLocker","primary");
        }else if(e.dataset.testid === "yellowLocker"){
            filter("yellowLocker","warning");
        }
    }
});
function createLockers(){
    if(localStorage.getItem("lockers") === null){
        var lockers   = [];
        var redBox    = [];
        var blueBox   = [];
        var yellowBox = [];
    var lockers = { redLocker:"redLocker", blueLocker:"blueLocker", yellowLocker:"yellowLocker"}
    for(var i=1; i<=numKey; i++){
        var redKey = {id : i, color : "danger", status : true}
        redBox.push(redKey);
    }
    for(var i=1; i<=numKey; i++){
        var blueKey = {id : i, color : "primary", status : true}
        blueBox.push(blueKey);
    }
    for(var i=1; i<=numKey; i++){
        var yellowKey = {id : i, color : "warning", status : true}
        yellowBox.push(yellowKey);
    }
        lockers["redLocker"] = redBox;
        lockers["blueLocker"] = blueBox;
        lockers["yellowLocker"] = yellowBox;
        localStorage.setItem('lockers', JSON.stringify(lockers));
        location.reload();
    }
}
function filter(filterLocker,color){
    checkValue(filterLocker);
    checkColors(color);
    var box="";
    for(var i=0; i<=lockers[filterLocker].length-1; i++){
        if(lockers[filterLocker][i].status === true){
            box+=`
            <div class="col-md-2">
                <div class="bg-dark bg-gradient text-white p-3 mb-3 text-center border border-3 border-${color} position-relative">
                    <span class="locker-number bg-gradient bg-${color}">${lockers[filterLocker][i].id}</span>
                    <h5><i class="fa-solid fa-key fa-3x mt-5 text-${color}"></i></h5>
                    <div class="d-grid gap-2 mt-4"><button class="btn btn-secondary" type="button" onclick="closeLocker('${i}','${filterLocker}')">close</button></div>
                </div>
            </div>`;
        }else if(lockers[filterLocker][i].status === false){
            box+=`
            <div class="col-md-2">
                <div class="bg-dark bg-gradient text-white p-3 mb-3 text-center border border-3 border-secondary position-relative">
                    <span class="locker-number bg-gradient bg-secondary">${lockers[filterLocker][i].id}</span>
                    <h5><i class="fa-solid fa-lock fa-3x mt-5 text-secondary"></i></h5>
                    <div class="d-grid gap-2 mt-4"><button class="btn bg-${color} text-white" onclick="openlocker('${i}','${filterLocker}')" type="button">open</button></div>
                </div>
            </div>`;
        }
    }
    box+=`
    <div class="d-grid gap-2 my-4">
        <button class="btn btn-${color} btn-lg" onclick="clearLocker('${filterLocker}','${color}')" type="button">Clear Locker</button>
    </div>`;
    lockerBox.innerHTML = box;
    calcLocker(filterLocker,color);
}
function clearLocker(filterLocker,color){
    checkValue(filterLocker);
    checkColors(color);
        for(var i=0; i<=numKey-1; i++){
            lockers[filterLocker][i].status = true
        }
    localStorage.setItem("lockers", JSON.stringify(lockers));
    calcLocker(filterLocker,color);
    filter(filterLocker,color);
}
function restLcoker(){
    let confirmMsg = confirm("Are you sure you want to rest all locker to the default setting");
    if(confirmMsg === true){
        if(localStorage.getItem('lockers')){
            localStorage.clear();
            window.location.reload();
        }else{
            window.alert("no data saved to rest locker");
        }
    }else{
        window.location.reload();
    }
}
function calcLocker(filterLocker,color){
    checkValue(filterLocker);
    var sum =0;
    for(var i=0; i<=lockers[filterLocker].length-1; i++){
        if(lockers[filterLocker][i].status === false){
            sum +=1;
        }
    }
    numCloseLocker.innerHTML = `locker Closed : ${sum}`;
    progresBar.textContent =`${(sum / lockers[filterLocker].length *100).toFixed(0)}%`;
    progresBar.style.width =`${sum / lockers[filterLocker].length *100}%`;
    progresBar.classList.remove("bg-danger","bg-primary","bg-warning");
    progresBar.classList.add(`bg-${color}`);
    totalLocker.innerHTML = `Total : ${lockers[filterLocker].length}`;
}
function checkValue(filterLocker){
    if(filterLocker !== "redLocker" && filterLocker !== "blueLocker" && filterLocker !== "yellowLocker"){
        window.location.reload();
    }
}
function checkColors(color){
    if(color !== "danger" && color !== "primary" && color !== "warning"){
        window.location.reload();
    }
}
function openlocker(lockerIndex , filterLocker) {
    checkValue(filterLocker);
    lockers[filterLocker][lockerIndex].status = true
    localStorage.setItem("lockers", JSON.stringify(lockers));
    filter(filterLocker,lockers[filterLocker][lockerIndex].color);
}
function closeLocker(lockerIndex , filterLocker) {
    checkValue(filterLocker);
    lockers[filterLocker][lockerIndex].status = false
    localStorage.setItem("lockers", JSON.stringify(lockers));
    filter(filterLocker,lockers[filterLocker][lockerIndex].color);
}
window.onscroll = function (){
    if(window.scrollY >= 100){
        scrollTop.style.display ="block";
    }else{
        scrollTop.style.display ="none";
    }
};
scrollTop.onclick = function(){
    window.scrollTo({left:0,top:0,behavior:"smooth"});
};