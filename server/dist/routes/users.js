"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Get all users (for assignee dropdown)
router.get('/', auth_1.authenticateToken, userController_1.getAllUsers);
// Get user profile
router.get('/profile', auth_1.authenticateToken, userController_1.getUserProfile);
exports.default = router;
//# sourceMappingURL=users.js.map