const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));

let selectedCountries = [];
let countriesDatalist = document.querySelector("#countries");

let MyTopAppBar = document.querySelector("header.mdc-top-app-bar");
mdc.topAppBar.MDCTopAppBar.attachTo(MyTopAppBar);

let MyDrawer = document.querySelector(".mdc-drawer");
let drawer = mdc.drawer.MDCDrawer.attachTo(MyDrawer);

const hide = () => {
    let views = document.querySelectorAll("div.view");
    for(let i = 0; i<views.length; i++){
        views[i].style.display = "none";
    }
};

document.querySelector(".mdc-top-app-bar__navigation-icon").addEventListener("click", (e) => {
    drawer.open = true;
});

//
let items = document.querySelectorAll("aside.mdc-drawer a.mdc-list-item");
let firstPage = items[0].getAttribute("href");
document.querySelector(firstPage).style.display = "block";

for(let i = 0; i<items.length; i++){
    items[i].addEventListener("click", event => {
        hide();
        let target = items[i].getAttribute("href");
        document.querySelector(target).style.display = "block";
        drawer.open = false;
    });
}

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i<Object.keys(data).length; i++){
        let option = document.createElement("option");
        option.value = Object.keys(data)[i];
        countriesDatalist.append(option);
    }
    console.log(countries);
});

document.querySelector("#addToListButton").addEventListener("click", (e) => {
    let inList = false;
    for(let i = 0; i<selectedCountries.length; i++){
        if(selectedCountries[i] == document.querySelector("#countriesInput").value){
            snackbar.open();
            inList = true;
        }
    }
    if(!inList){
    selectedCountries.push(document.querySelector("#countriesInput").value);
    let li = document.createElement("li");
    li.class = "mdc-list-item";
    li.role="option";
    li.tabindex = "0";
    let span = document.createElement("span");
    span.class = "mdc-list-item__text";
    span.textContent = document.querySelector("#countriesInput").value;
    li.append(span);
    document.querySelector("#countriesList").append(li);
    }
    document.querySelector("#countriesInput").value = "";
});
