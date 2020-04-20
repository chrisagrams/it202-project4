const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));

let selectedCountries = [];
let countriesDatalist = document.querySelector("#countries");
let totalData;
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
    totalData=data;
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

document.querySelector("#createChartsButton").addEventListener("click", (e) => {
   let mainTable = document.querySelector("#mainTableHeader");
   let tableContent = document.querySelector("#mainTableContent");
   while (mainTable.lastElementChild) {
    mainTable.removeChild(mainTable.lastElementChild);
  }
   let mainColumnHeader = document.createElement("TH");
       mainColumnHeader.classList.add("mdc-data-table__header-cell");
       mainColumnHeader.role = "columnheader";
       mainColumnHeader.scope = "col";
       mainColumnHeader.textContent = "Date";
       mainTable.append(mainColumnHeader);
    
      
   for(let i = 0; i<selectedCountries.length; i++){
       console.log(totalData[selectedCountries[i]]);
       let columnHeader = document.createElement("TH");
       columnHeader.classList.add("mdc-data-table__header-cell");
       columnHeader.role = "columnheader";
       columnHeader.scope = "col";
       columnHeader.textContent = selectedCountries[i];
       document.querySelector("#mainTableHeader").append(columnHeader);
   }
    let currentCountry = totalData[selectedCountries[0]];
   for(let x = 0; x<currentCountry.length; x++){
       let currentDate = currentCountry[x];
       let tableRow = document.createElement("TR");
       tableRow.classList.add("mdc-data-table__row");
       
       let dateContent = document.createElement("TD");
       dateContent.classList.add("mdc-data-table__cell");
       dateContent.textContent = currentDate.date;
       tableRow.append(dateContent);
           
       for(let y = 0; y<selectedCountries.length; y++){
          let deaths = document.createElement("TD");
          deaths.classList.add("mdc-data-table__cell");
          deaths.classList.add("mdc-data-table__cell--numeric");
          deaths.textContent = totalData[selectedCountries[y]][x].deaths;
          tableRow.append(deaths);
       }
       tableContent.append(tableRow);

   } 

});

