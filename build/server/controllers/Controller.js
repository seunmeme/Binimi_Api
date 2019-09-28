"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _BinimiService = _interopRequireDefault(require("../services/BinimiService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var util = new _Utils["default"]();

var PatientController =
/*#__PURE__*/
function () {
  function PatientController() {
    (0, _classCallCheck2["default"])(this, PatientController);
  }

  (0, _createClass2["default"])(PatientController, null, [{
    key: "getAllPatients",
    value: function () {
      var _getAllPatients = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var allPatients;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _BinimiService["default"].getAllPatients();

              case 3:
                allPatients = _context.sent;

                if (allPatients.length > 0) {
                  util.setSuccess(200, 'Patients retrieved', allPatients);
                } else {
                  util.setSuccess(200, 'No patient found');
                }

                return _context.abrupt("return", util.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAllPatients(_x, _x2) {
        return _getAllPatients.apply(this, arguments);
      }

      return getAllPatients;
    }()
  }, {
    key: "addPatient",
    value: function () {
      var _addPatient = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var newPatient, createdPatient;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!req.body.name || !req.body.hospital_no || !req.body.gender)) {
                  _context2.next = 3;
                  break;
                }

                util.setError(400, 'Please provide complete details');
                return _context2.abrupt("return", util.send(res));

              case 3:
                newPatient = req.body;
                _context2.prev = 4;
                _context2.next = 7;
                return _BinimiService["default"].addPatient(newPatient);

              case 7:
                createdPatient = _context2.sent;
                util.setSuccess(201, 'Patient Added!', createdPatient);
                return _context2.abrupt("return", util.send(res));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 12]]);
      }));

      function addPatient(_x3, _x4) {
        return _addPatient.apply(this, arguments);
      }

      return addPatient;
    }()
  }, {
    key: "updatedPatient",
    value: function () {
      var _updatedPatient = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var alteredPatient, id, updatePatient;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                alteredPatient = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context3.next = 5;
                  break;
                }

                util.setError(400, 'Please input a valid numeric value');
                return _context3.abrupt("return", util.send(res));

              case 5:
                _context3.prev = 5;
                _context3.next = 8;
                return _BinimiService["default"].updatePatient(id, alteredPatient);

              case 8:
                updatePatient = _context3.sent;

                if (!updatePatient) {
                  util.setError(404, "Cannot find patient with the id: ".concat(id));
                } else {
                  util.setSuccess(200, 'Patient updated', updatePatient);
                }

                return _context3.abrupt("return", util.send(res));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](5);
                util.setError(404, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 13]]);
      }));

      function updatedPatient(_x5, _x6) {
        return _updatedPatient.apply(this, arguments);
      }

      return updatedPatient;
    }()
  }, {
    key: "getAPatient",
    value: function () {
      var _getAPatient = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var id, thePatient;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context4.next = 4;
                  break;
                }

                util.setError(400, 'Please input a valid numeric value');
                return _context4.abrupt("return", util.send(res));

              case 4:
                _context4.prev = 4;
                _context4.next = 7;
                return _BinimiService["default"].getAPatient(id);

              case 7:
                thePatient = _context4.sent;

                if (!thePatient) {
                  util.setError(404, "Cannot find patient with the id ".concat(id));
                } else {
                  util.setSuccess(200, 'Found Patient', thePatient);
                }

                return _context4.abrupt("return", util.send(res));

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](4);
                util.setError(404, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 12]]);
      }));

      function getAPatient(_x7, _x8) {
        return _getAPatient.apply(this, arguments);
      }

      return getAPatient;
    }()
  }, {
    key: "deletePatient",
    value: function () {
      var _deletePatient = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var id, patientToDelete;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context5.next = 4;
                  break;
                }

                util.setError(400, 'Please provide a numeric value');
                return _context5.abrupt("return", util.send(res));

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return _BinimiService["default"].deletePatient(id);

              case 7:
                patientToDelete = _context5.sent;

                if (patientToDelete) {
                  util.setSuccess(200, 'Patient deleted');
                } else {
                  util.setError(404, "Patient with the id ".concat(id, " cannot be found"));
                }

                return _context5.abrupt("return", util.send(res));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](4);
                util.setError(400, _context5.t0);
                return _context5.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 12]]);
      }));

      function deletePatient(_x9, _x10) {
        return _deletePatient.apply(this, arguments);
      }

      return deletePatient;
    }()
  }]);
  return PatientController;
}();

var _default = PatientController;
exports["default"] = _default;
//# sourceMappingURL=Controller.js.map