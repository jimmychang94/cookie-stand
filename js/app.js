var hour = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

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
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  }
};
pike.calcCust();
pike.calcCookies();
pike.calcTotalCookies();

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
    for (var i = 0; i < this.custPerHour.length; i ++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  }
};
seatac.calcCust();
seatac.calcCookies();
seatac.calcTotalCookies();