var hour = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

//1st and Pike
var pike = {
  name: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3,
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
  }
};
seatac.calcCust();
seatac.calcCookies();
seatac.calcTotalCookies();

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
  }
};
seattleCenter.calcCust();
seattleCenter.calcCookies();
seattleCenter.calcTotalCookies();

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
  }
};
capitolHill.calcCust();
capitolHill.calcCookies();
capitolHill.calcTotalCookies();

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
  }
};
alki.calcCust();
alki.calcCookies();
alki.calcTotalCookies();