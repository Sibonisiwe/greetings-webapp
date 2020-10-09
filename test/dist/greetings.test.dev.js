"use strict";

var assert = require("assert");

var Greetings = require("../greetings"); //const greetings = require('./greetings');


var pg = require("pg");

var greetings = Greetings();
var Pool = pg.Pool;
var connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings_test';
var pool = new Pool({
  connectionString: connectionString
});
beforeEach(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pool.query("delete from greeting"));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
describe("The Greeted function", function () {
  it("should be able to insert a namme Linda and increment the counter", function _callee2() {
    var greetings;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            greetings = Greetings(pool);
            _context2.next = 3;
            return regeneratorRuntime.awrap(greetings.greeted("Linda"));

          case 3:
            _context2.t0 = assert;
            _context2.t1 = [{
              name: "Linda"
            }];
            _context2.next = 7;
            return regeneratorRuntime.awrap(greetings.getGreetedNames("Linda"));

          case 7:
            _context2.t2 = _context2.sent;

            _context2.t0.deepEqual.call(_context2.t0, _context2.t1, _context2.t2);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});
describe("The LanguageChecked function", function () {
  it("Should be able to greet in Isixhosa", function _callee3() {
    var greetings;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            greetings = Greetings(pool);
            _context3.next = 3;
            return regeneratorRuntime.awrap(greetings.languageChecked('Xhosa', 'Linda'));

          case 3:
            _context3.t0 = assert;
            _context3.next = 6;
            return regeneratorRuntime.awrap(greetings.languageChecked('Xhosa', 'Linda'));

          case 6:
            _context3.t1 = _context3.sent;

            _context3.t0.equal.call(_context3.t0, 'Molo, Linda', _context3.t1);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("Should be able to greet in English", function _callee4() {
    var greetings;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            greetings = Greetings(pool);
            _context4.next = 3;
            return regeneratorRuntime.awrap(greetings.languageChecked('English', 'Linda'));

          case 3:
            _context4.t0 = assert;
            _context4.next = 6;
            return regeneratorRuntime.awrap(greetings.languageChecked('English', 'Linda'));

          case 6:
            _context4.t1 = _context4.sent;

            _context4.t0.equal.call(_context4.t0, 'Hellow, Linda', _context4.t1);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it("Should be able to greet in Afrikaans", function _callee5() {
    var greetings;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            greetings = Greetings(pool);
            _context5.next = 3;
            return regeneratorRuntime.awrap(greetings.languageChecked('Hallo', 'linda'));

          case 3:
            _context5.t0 = assert;
            _context5.next = 6;
            return regeneratorRuntime.awrap(greetings.languageChecked('Afrikaans', 'linda'));

          case 6:
            _context5.t1 = _context5.sent;

            _context5.t0.equal.call(_context5.t0, 'Hallo, linda', _context5.t1);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
});
describe("The getCounter function", function () {
  it("Should be able to count 2 names entered", function _callee6() {
    var greetings;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            greetings = Greetings(pool);
            _context6.next = 3;
            return regeneratorRuntime.awrap(greetings.greeted('Siwe'));

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(greetings.greeted('Lisa'));

          case 5:
            _context6.t0 = assert;
            _context6.next = 8;
            return regeneratorRuntime.awrap(greetings.getCounter());

          case 8:
            _context6.t1 = _context6.sent;

            _context6.t0.equal.call(_context6.t0, 2, _context6.t1);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it("Should be able to count 4 names entered", function _callee7() {
    var greetings;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            greetings = Greetings(pool);
            _context7.next = 3;
            return regeneratorRuntime.awrap(greetings.greeted('Sibo'));

          case 3:
            _context7.next = 5;
            return regeneratorRuntime.awrap(greetings.greeted('Sinazo'));

          case 5:
            _context7.next = 7;
            return regeneratorRuntime.awrap(greetings.greeted('mzi'));

          case 7:
            _context7.next = 9;
            return regeneratorRuntime.awrap(greetings.greeted('Bonolo'));

          case 9:
            _context7.t0 = assert;
            _context7.next = 12;
            return regeneratorRuntime.awrap(greetings.getCounter());

          case 12:
            _context7.t1 = _context7.sent;

            _context7.t0.equal.call(_context7.t0, 4, _context7.t1);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});
describe("The getGreetedNames function", function () {
  it("should be able to return all the greeted names as an object", function _callee8() {
    var greetings;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            greetings = Greetings(pool);
            _context8.next = 3;
            return regeneratorRuntime.awrap(greetings.greeted('Sibo'));

          case 3:
            _context8.next = 5;
            return regeneratorRuntime.awrap(greetings.greeted('Sinazo'));

          case 5:
            _context8.next = 7;
            return regeneratorRuntime.awrap(greetings.greeted('Mzi'));

          case 7:
            _context8.next = 9;
            return regeneratorRuntime.awrap(greetings.greeted('Bonolo'));

          case 9:
            _context8.t0 = assert;
            _context8.t1 = [{
              name: 'Sibo'
            }, {
              name: 'Sinazo'
            }, {
              name: 'Mzi'
            }, {
              name: 'Bonolo'
            }];
            _context8.next = 13;
            return regeneratorRuntime.awrap(greetings.getGreetedNames());

          case 13:
            _context8.t2 = _context8.sent;

            _context8.t0.deepEqual.call(_context8.t0, _context8.t1, _context8.t2);

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  after(function () {
    pool.end();
  });
});