var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
var storeLocation = [];
var salmonCookiesTable = document.getElementById('salmonCookies');
var hourlyTotalArray = [];
var absoluteTotal = 0;

function generateRandomNumber(min, max) {
  var randomNumber = Math.random();
  var randomInteger = Math.floor(randomNumber * (max - min + 1)) + min;
  return randomInteger;
}

function tableHeader() {
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
  salmonCookiesTable.appendChild(theadEl);
}

function renderStore () {
  for(var j = 0; j < storeLocation.length; j ++) {
    storeLocation[j].render();
  }
}

function calcHourlyTotal () {
  //Calculates the total amount of cookies sold that hour
  for (var i = 0; i < hour.length; i ++) {
    var hourlyTotal = 0;
    for (var j = 0; j < storeLocation.length; j ++) {
      // console.log(storeLocation[j].cookiesPerHour[i]);
      hourlyTotal += storeLocation[j].cookiesPerHour[i];
      // console.log(hourlyTotal);
    }
    hourlyTotalArray.push(hourlyTotal);
  }
  // console.log(hourlyTotalArray);
}

function calcAbsoluteTotal () {
  //Calculates the total amount of cookies sold that day
  for (var i = 0; i < storeLocation.length; i ++) {
    absoluteTotal += storeLocation[i].totalCookies;
  }
}

function renderHourlyTotal () {
  //Writes the final row of totals for each hour into the table
  calcHourlyTotal();
  calcAbsoluteTotal();
  //Calls these 2 functions to calculate the hourly and absolute total values
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
}


function CookieStand(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.custPerHour = [];
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  storeLocation.push(this);
}
CookieStand.prototype.calcCust = function() {
  //Calculates the number of customers with a random integer using a min/max
  for (var i = 0; i < hour.length; i ++) {
    var hourlyCustomers = generateRandomNumber(this.minCust, this.maxCust);
    this.custPerHour.push(hourlyCustomers);
  }
};
CookieStand.prototype.calcCookies = function() {
  //Calculates the number of cookies sold (rounded down) based off of the number of customers
  this.calcCust();
  //Because I need to have the custPerHour array filled, call the calcCust function to populate it.
  for (var i = 0; i < hour.length; i ++) {
    var hourlyCookies = Math.ceil(this.avgCookies * this.custPerHour[i]);
    this.cookiesPerHour.push(hourlyCookies);
    this.totalCookies += hourlyCookies;
    //This calculates the total number of cookies based off of the number of cookies sold per hour.
  }
};
CookieStand.prototype.render = function() { //Puts the information onto the webpage
  this.calcCookies(); //runs calcCookies to get the cookies per hour

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

new CookieStand('1st and Pike', 23, 65, 6.3);
new CookieStand('SeaTac Airport', 3, 24, 1.2);
new CookieStand('Seattle Center', 11, 38, 3.7);
new CookieStand('Capitol Hill', 20, 38, 2.3);
new CookieStand('Alki', 2, 16, 4.6);

tableHeader();
renderStore();
renderHourlyTotal();