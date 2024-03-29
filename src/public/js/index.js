var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var signin_form = document.querySelector("#signin-form");
var signup_form = document.querySelector("#signup-form");
var logout_btn = document.querySelector("#btn-logout");
var edit_form = document.querySelector("#edit-form");
var edit_password_form = document.querySelector("#edit-password-form");
var forgot_password_form = document.querySelector("#forgot-password-form");
var reset_password_form = document.querySelector("#reset-password-form");
var baseUrl = "https://node-auth-otpd.onrender.com";
// const baseUrl = "http://localhost:3000";
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Error"] = 0] = "Error";
    AlertType[AlertType["Success"] = 1] = "Success";
})(AlertType || (AlertType = {}));
var login = function (email, password) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/signin"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                if ((_a.sent()).status === "success") {
                    alert("Login successful!");
                    setTimeout(function () {
                        window.location.assign("/");
                    }, 1000);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                alert(error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
if (signin_form) {
    signin_form.addEventListener("submit", function (e) {
        var _a, _b;
        e.preventDefault();
        var email = (_a = document.querySelector("#email")) === null || _a === void 0 ? void 0 : _a.value;
        var password = (_b = document.querySelector("#password")) === null || _b === void 0 ? void 0 : _b.value;
        if (email && password) {
            login(email, password);
        }
    });
}
var register = function (_a) {
    var email = _a.email, name = _a.name, password = _a.password;
    return __awaiter(_this, void 0, void 0, function () {
        var res, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/signup"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: email,
                                name: name,
                                password: password,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    if ((_b.sent()).status === "success") {
                        alert("Register successful!");
                        setTimeout(function () {
                            window.location.assign("/");
                        }, 1000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    alert(error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
if (signup_form) {
    signup_form.addEventListener("submit", function (e) {
        var _a, _b, _c;
        e.preventDefault();
        var email = (_a = document.querySelector("#email")) === null || _a === void 0 ? void 0 : _a.value;
        var password = (_b = document.querySelector("#password")) === null || _b === void 0 ? void 0 : _b.value;
        var name = (_c = document.querySelector("#name")) === null || _c === void 0 ? void 0 : _c.value;
        if (email && password && name) {
            register({ email: email, name: name, password: password });
        }
    });
}
var logout = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/signout"))];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                if ((_a.sent()).status === "success") {
                    alert("Logout successful!");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                alert(error_3.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
if (logout_btn) {
    logout_btn.addEventListener("click", function () {
        logout();
    });
}
var update = function (_a) {
    var name = _a.name;
    return __awaiter(_this, void 0, void 0, function () {
        var res, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/user/me"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: name,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    if ((_b.sent()).status === "success") {
                        alert("Update successful!");
                        setTimeout(function () {
                            window.location.assign("/");
                        }, 1000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    alert(error_4.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
if (edit_form) {
    edit_form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();
        var name = (_a = document.querySelector("#name")) === null || _a === void 0 ? void 0 : _a.value;
        if (name) {
            update({ name: name });
        }
    });
}
var updatePassword = function (_a) {
    var oldPassword = _a.oldPassword, newPassword = _a.newPassword;
    return __awaiter(_this, void 0, void 0, function () {
        var res, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/update-password"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                oldPassword: oldPassword,
                                newPassword: newPassword,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    if ((_b.sent()).status === "success") {
                        alert("Update successful!");
                        setTimeout(function () {
                            window.location.assign("/");
                        }, 1000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    alert(error_5.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
if (edit_password_form) {
    edit_password_form.addEventListener("submit", function (e) {
        var _a, _b;
        e.preventDefault();
        var oldPassword = (_a = document.querySelector("#old-password")) === null || _a === void 0 ? void 0 : _a.value;
        var newPassword = (_b = document.querySelector("#new-password")) === null || _b === void 0 ? void 0 : _b.value;
        if (oldPassword && newPassword) {
            updatePassword({ oldPassword: oldPassword, newPassword: newPassword });
        }
    });
}
var forgotPassword = function (_a) {
    var email = _a.email;
    return __awaiter(_this, void 0, void 0, function () {
        var res, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/forgot-password"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: email,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    if ((_b.sent()).status === "success") {
                        alert("Check your email inbox!");
                        setTimeout(function () {
                            window.location.assign("/");
                        }, 1000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    alert(error_6.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
if (forgot_password_form) {
    forgot_password_form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();
        var email = (_a = document.querySelector("#email")) === null || _a === void 0 ? void 0 : _a.value;
        if (email) {
            forgotPassword({ email: email });
        }
    });
}
console.log();
var resetPassword = function (_a) {
    var password = _a.password, token = _a.token;
    return __awaiter(_this, void 0, void 0, function () {
        var res, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/auth/reset-password/").concat(token), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                password: password,
                            }),
                        })];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    if ((_b.sent()).status === "success") {
                        alert("Password reset!");
                        setTimeout(function () {
                            window.location.assign("/");
                        }, 1000);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    alert(error_7.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
if (reset_password_form) {
    reset_password_form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();
        var password = (_a = document.querySelector("#password")) === null || _a === void 0 ? void 0 : _a.value;
        var token = window.location.pathname.split("/")[2];
        if (password) {
            resetPassword({ password: password, token: token });
        }
    });
}
