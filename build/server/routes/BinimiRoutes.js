"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Controller = _interopRequireDefault(require("../controllers/Controller"));

var router = (0, _express.Router)();
router.get('/', _Controller["default"].getAllPatients);
router.post('/', _Controller["default"].addPatient);
router.get('/:id', _Controller["default"].getAPatient);
router.put('/:id', _Controller["default"].updatedPatient);
router["delete"]('/:id', _Controller["default"].deletePatient);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=BinimiRoutes.js.map