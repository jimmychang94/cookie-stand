'use strict';

var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
var storeLocation = [];
var salmonCookiesTable = document.getElementById('salmonCookies');
var salmonTosserTable = document.getElementById('salmonTossers');
var cookieForm = document.getElementById('cookieForm');
var hourlyTotalArray = [];
var absoluteTotal = 0;

// ------------------------------------------------------------------------
function CookieStand(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.custPerHour = [];
  this.cookieTosserPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  this.totalTosser = 0;
  this.calcCust();
  this.calcCookies();
  this.calcTosser();
  storeLocation.push(this);
}
CookieStand.prototype.calcCust = function() {
  //Calculates the number of customers with a random integer using a min/max
  this.custPerHour = [];
  for (var i = 0; i < hour.length; i ++) {
    var hourlyCustomers = CookieStand.generateRandomNumber(this.minCust, this.maxCust);
    this.custPerHour.push(hourlyCustomers);
  }
};
CookieStand.prototype.calcTosser = function() {
  this.cookieTosserPerHour = [];
  this.totalTosser = 0;
  for (var i = 0; i < hour.length; i ++) {
    var cookieTosserNeeded = Math.ceil(this.custPerHour[i] / 20);
    if (cookieTosserNeeded < 2) {
      cookieTosserNeeded = 2;
    }
    this.cookieTosserPerHour.push(cookieTosserNeeded);

    this.totalTosser += cookieTosserNeeded;
  }
};
CookieStand.prototype.calcCookies = function() {
  //Calculates the number of cookies sold (rounded down) based off of the number of customers
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  //Because I need to have the custPerHour array filled, call the calcCust function to populate it.
  for (var i = 0; i < hour.length; i ++) {
    var hourlyCookies = Math.ceil(this.avgCookies * this.custPerHour[i]);
    this.cookiesPerHour.push(hourlyCookies);
    this.totalCookies += hourlyCookies;
    //This calculates the total number of cookies based off of the number of cookies sold per hour.
  }
};
CookieStand.prototype.render = function() { //Puts the information onto the webpage

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
  for (var i = 0; i < hour.length; i ++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.className = 'total';
  tdEl.textContent = this.totalCookies;
  trEl.appendChild(tdEl);
  salmonCookiesTable.appendChild(trEl);
};

// ------------------------------------------------------------------------
CookieStand.generateRandomNumber = function(min, max) {
  var randomNumber = Math.random();
  var randomInteger = Math.floor(randomNumber * (max - min + 1)) + min;
  return randomInteger;
};

// ------------------------------------------------------------------------
CookieStand.calcHourlyTotal = function() {
  //Calculates the total amount of cookies sold that hour
  absoluteTotal = 0;
  hourlyTotalArray = [];
  for (var i = 0; i < hour.length; i ++) {
    var hourlyTotal = 0;
    for (var j = 0; j < storeLocation.length; j ++) {
      hourlyTotal += storeLocation[j].cookiesPerHour[i];
    }
    hourlyTotalArray.push(hourlyTotal);
  }
  //Calculate the total amount of cookies sold that day
  for (i = 0; i < storeLocation.length; i ++) {
    absoluteTotal += storeLocation[i].totalCookies;
  }
};

// ------------------------------------------------------------------------
CookieStand.renderHourlyTotal = function() {
  //Writes the final row of totals for each hour into the table
  CookieStand.calcHourlyTotal();
  //Calls this function to calculate the hourly and absolute total values
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Hourly Totals';
  trEl.appendChild(tdEl);
  for (var i = 0; i < hour.length; i ++) {
    tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotalArray[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.className = 'total';
  tdEl.textContent = absoluteTotal;
  trEl.appendChild(tdEl);
  salmonCookiesTable.appendChild(trEl);
};

// -----------------------------------------------------------------------
CookieStand.renderHourlyTosserTotal = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Hourly Totals';
  trEl.appendChild(tdEl);
  for (var i = 0; i < hour.length; i ++) {
    tdEl = document.createElement('td');
    var hourlyTotal = 0;
    for (var j = 0; j < storeLocation.length; j ++) {
      hourlyTotal += storeLocation[j].cookieTosserPerHour[i];
    }
    tdEl.textContent = hourlyTotal;
    trEl.appendChild(tdEl);
  }
  var absoluteTotalTosser = 0;
  for (i = 0; i < storeLocation.length; i ++) {
    absoluteTotalTosser += storeLocation[i].totalTosser;
  }
  tdEl = document.createElement('td');
  tdEl.textContent = absoluteTotalTosser;
  tdEl.className = 'total';
  trEl.appendChild(tdEl);
  salmonTosserTable.appendChild(trEl);
};

// ------------------------------------------------------------------------
CookieStand.tableHeader = function(id) {
  var theadEl = document.createElement('thead');
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  theadEl.appendChild(thEl);
  for (var i = 0; i < hour.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hour[i];
    theadEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Location Totals';
  theadEl.appendChild(thEl);
  id.appendChild(theadEl);
};

// ------------------------------------------------------------------------
CookieStand.renderStore = function() {
  salmonCookiesTable.textContent = '';
  CookieStand.tableHeader(salmonCookiesTable);
  for(var j = 0; j < storeLocation.length; j ++) {
    storeLocation[j].render();
  }
  CookieStand.renderHourlyTotal();
};

// ------------------------------------------------------------------------
CookieStand.renderTosser = function() {
  salmonTosserTable.textContent = '';
  CookieStand.tableHeader(salmonTosserTable);
  for (var i = 0; i < storeLocation.length; i ++) {

    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = storeLocation[i].name;
    trEl.appendChild(tdEl);
    for (var j = 0; j < hour.length; j ++) {
      tdEl = document.createElement('td');
      tdEl.textContent = storeLocation[i].cookieTosserPerHour[j];
      if (storeLocation[i].cookieTosserPerHour[j] > 2) {
        tdEl.className = 'extraTossers';
      }
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.className = 'total';
    tdEl.textContent = storeLocation[i].totalTosser;
    trEl.appendChild(tdEl);
    salmonTosserTable.appendChild(trEl);
  }
  CookieStand.renderHourlyTosserTotal();
};

// ------------------------------------------------------------------------
function storeSubmit(event) {

  event.preventDefault();

  //Validation to prevent empty form fields
  var storeName = event.target.storeName.value;
  var minimumCustomers = parseInt(event.target.minimumCustomers.value);
  var maximumCustomers = parseInt(event.target.maximumCustomers.value);
  var averageCookies = Number(event.target.averageCookies.value);

  //Validation to prevent empty form fields or not giving numerical values for the last 3 form fields
  if (!storeName || !minimumCustomers || !maximumCustomers || !averageCookies) {
    alert('Fields cannot be empty!');
    return;
  }

  //Validation for logic (minimum value cannot be larger than maximum value)
  if (minimumCustomers > maximumCustomers) {
    alert('The minimum customers cannot be more than the maximum customers!');
    return;
  }

  for (var i = 0; i < storeLocation.length; i ++) {
    if (storeName === storeLocation[i].name) {
      storeLocation[i].minCust = minimumCustomers;
      storeLocation[i].maxCust = maximumCustomers;
      storeLocation[i].avgCookies = averageCookies;
      storeLocation[i].calcCust();
      storeLocation[i].calcCookies();
      storeLocation[i].calcTosser();
      CookieStand.renderStore();
      CookieStand.renderTosser();
      event.target.reset();
      return;
    }
  }
  new CookieStand(storeName, minimumCustomers, maximumCustomers, averageCookies);

  CookieStand.renderTosser();
  CookieStand.renderStore();
  // This empties the form fields after the data has been grabbed
  event.target.reset();

}

// ------------------------------------------------------------------------
new CookieStand('1st and Pike', 23, 65, 6.3);
new CookieStand('SeaTac Airport', 3, 24, 1.2);
new CookieStand('Seattle Center', 11, 38, 3.7);
new CookieStand('Capitol Hill', 20, 38, 2.3);
new CookieStand('Alki', 2, 16, 4.6);

cookieForm.addEventListener('submit', storeSubmit);
// ------------------------------------------------------------------------

CookieStand.renderStore();
CookieStand.renderTosser();