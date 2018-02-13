var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
var storeLocation = [];

function generateRandomNumber(min, max) {
  var randomNumber = Math.random();
  var randomInteger = Math.floor(randomNumber * (max - min + 1)) + min;
  return randomInteger;
}

function tableHeader() {
  var theadEl = document.getElementById('time');
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
}

function renderStore () {
  for(var j = 0; j < storeLocation.length; j ++) {
    storeLocation[j].render();
  }
}
function CookieStand(name, idName, minCust, maxCust, avgCookies) {
  this.name = name;
  this.idName = idName;
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
  this.calcCookies(); //runs calcCookies for
  var trEl = document.getElementById(this.idName);
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
};

new CookieStand('1st and Pike','pikeStore', 23, 65, 6.3);
new CookieStand('SeaTac Airport', 'seatacStore', 3, 24, 1.2);
new CookieStand('Seattle Center', 'seattleCenterStore', 11, 38, 3.7);
new CookieStand('Capitol Hill', 'capitolHillStore', 20, 38, 2.3);
new CookieStand('Alki', 'alkiStore', 2, 16, 4.6);

tableHeader();
renderStore();

/*
//1st and Pike
var pike = {
  name: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3,
  custPerHour: [],
  calcCust: function() { //Calculates the number of customers with a random integer using a min/max
    for (var i = 0; i < hour.length; i ++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
    }
  },
  cookiesPerHour: [],
  calcCookies: function() { //Calculates the number of cookies sold (rounded down) based off of the number of customers
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.cookiesPerHour.push(Math.floor(this.avgCookies * this.custPerHour[i]));
    }
  },
  totalCookies: 0,
  calcTotalCookies: function() { //Calculates the total number of cookies sold in that day
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  },
  render: function() { //Puts the information onto the webpage
    var ulEl = document.getElementById('pikeStore');
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      var liEl = document.createElement('li');
      liEl.textContent = hour[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl2 = document.createElement('li');
    liEl2.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ulEl.appendChild(liEl2);
  }
};
pike.calcCust();
pike.calcCookies();
pike.calcTotalCookies();
pike.render();

//SeaTac Airport
var seatac = {
  name: 'SeaTac Airport',
  minCust: 3,
  maxCust: 24,
  avgCookies: 1.2,
  custPerHour: [],
  calcCust: function() {
    for (var i = 0; i < hour.length; i ++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
    }
  },
  cookiesPerHour: [],
  calcCookies: function() {
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.cookiesPerHour.push(Math.floor(this.avgCookies * this.custPerHour[i]));
    }
  },
  totalCookies: 0,
  calcTotalCookies: function() {
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  },
  render: function() {
    var ulEl = document.getElementById('seatacStore');
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      var liEl = document.createElement('li');
      liEl.textContent = hour[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl2 = document.createElement('li');
    liEl2.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ulEl.appendChild(liEl2);
  }
};
seatac.calcCust();
seatac.calcCookies();
seatac.calcTotalCookies();
seatac.render();

//Seattle Center
var seattleCenter = {
  name: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookies: 3.7,
  custPerHour: [],
  calcCust: function() {
    for (var i = 0; i < hour.length; i ++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
    }
  },
  cookiesPerHour: [],
  calcCookies: function() {
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.cookiesPerHour.push(Math.floor(this.avgCookies * this.custPerHour[i]));
    }
  },
  totalCookies: 0,
  calcTotalCookies: function() {
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  },
  render: function() {
    var ulEl = document.getElementById('seattleCenterStore');
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      var liEl = document.createElement('li');
      liEl.textContent = hour[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl2 = document.createElement('li');
    liEl2.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ulEl.appendChild(liEl2);
  }
};
seattleCenter.calcCust();
seattleCenter.calcCookies();
seattleCenter.calcTotalCookies();
seattleCenter.render();

//Capitol Hill
var capitolHill = {
  name: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookies: 2.3,
  custPerHour: [],
  calcCust: function() {
    for (var i = 0; i < hour.length; i ++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
    }
  },
  cookiesPerHour: [],
  calcCookies: function() {
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.cookiesPerHour.push(Math.floor(this.avgCookies * this.custPerHour[i]));
    }
  },
  totalCookies: 0,
  calcTotalCookies: function() {
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  },
  render: function() {
    var ulEl = document.getElementById('capitolHillStore');
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      var liEl = document.createElement('li');
      liEl.textContent = hour[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl2 = document.createElement('li');
    liEl2.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ulEl.appendChild(liEl2);
  }
};
capitolHill.calcCust();
capitolHill.calcCookies();
capitolHill.calcTotalCookies();
capitolHill.render();

//Alki
var alki = {
  name: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookies: 4.6,
  custPerHour: [],
  calcCust: function() {
    for (var i = 0; i < hour.length; i ++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
    }
  },
  cookiesPerHour: [],
  calcCookies: function() {
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.cookiesPerHour.push(Math.floor(this.avgCookies * this.custPerHour[i]));
    }
  },
  totalCookies: 0,
  calcTotalCookies: function() {
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  },
  render: function() {
    var ulEl = document.getElementById('alkiStore');
    for (var i = 0; i < this.cookiesPerHour.length; i ++) {
      var liEl = document.createElement('li');
      liEl.textContent = hour[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      ulEl.appendChild(liEl);
    }
    var liEl2 = document.createElement('li');
    liEl2.textContent = 'Total: ' + this.totalCookies + ' cookies';
    ulEl.appendChild(liEl2);
  }
};
alki.calcCust();
alki.calcCookies();
alki.calcTotalCookies();
alki.render();
*/