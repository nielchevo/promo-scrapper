"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var FileManager_1 = require("./FileManager");
var Solution = /** @class */ (function () {
    function Solution() {
        this.mMainURL = "https://www.bankmega.com/";
        this.DELAY_CLICK = 2000;
        this.solutionJSON = [];
    }
    /**
     * run - run the app
     */
    Solution.prototype.run = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var browser_1, page_1, promoCategory, _i, promoCategory_1, promo, ds, data, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        // const browser = await puppeteer.launch();
                        console.log('initialize app...');
                        return [4 /*yield*/, puppeteer_1.default.launch()];
                    case 1:
                        browser_1 = _b.sent();
                        return [4 /*yield*/, browser_1.newPage()];
                    case 2:
                        page_1 = _b.sent();
                        // Open promo page
                        return [4 /*yield*/, page_1.goto(this.mMainURL + "promolainnya.php#")];
                    case 3:
                        // Open promo page
                        _b.sent();
                        return [4 /*yield*/, page_1.$$eval("#contentpromolain2 div#subcatpromo div img", function (e) {
                                return e.map(function (i) {
                                    return "img#" + i.getAttribute('id');
                                });
                            })];
                    case 4:
                        promoCategory = _b.sent();
                        console.log(promoCategory);
                        _i = 0, promoCategory_1 = promoCategory;
                        _b.label = 5;
                    case 5:
                        if (!(_i < promoCategory_1.length)) return [3 /*break*/, 10];
                        promo = promoCategory_1[_i];
                        console.info("--> Current category: " + promo.toString());
                        return [4 /*yield*/, page_1.$(promo.toString())];
                    case 6:
                        ds = _b.sent();
                        (_a = ds) === null || _a === void 0 ? void 0 : _a.click().then(function () { return console.log("done !"); });
                        return [4 /*yield*/, page_1.waitFor(1500)];
                    case 7:
                        _b.sent(); // wait delay page to load
                        return [4 /*yield*/, page_1.$$eval("#contentpromolain2 table.tablepaging tr td a", function (el) {
                                // Eliminate goto: first and last in pagination
                                var pageIndex = el.filter(function (e) { return e.hasAttribute('id'); });
                                return pageIndex.map(function (e) { var _a; return (_a = e.getAttribute('title')) === null || _a === void 0 ? void 0 : _a.toString(); });
                            })
                                .then(function (pageLength) { return __awaiter(_this, void 0, void 0, function () {
                                var dataList, _loop_1, _i, pageLength_1, it;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            dataList = [];
                                            _loop_1 = function (it) {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                                                var ds, promoThumbnail;
                                                                var _this = this;
                                                                var _a;
                                                                return __generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            console.log("pagination: " + it);
                                                                            return [4 /*yield*/, page_1.$("[title=\"" + it + "\"]")];
                                                                        case 1:
                                                                            ds = _b.sent();
                                                                            (_a = ds) === null || _a === void 0 ? void 0 : _a.click().then(function () { return console.log("Done event click with selector [title=\"" + it + "\"]"); });
                                                                            return [4 /*yield*/, page_1.waitFor(this.DELAY_CLICK)];
                                                                        case 2:
                                                                            _b.sent();
                                                                            return [4 /*yield*/, page_1.$$eval("#promolain li a", function (el) {
                                                                                    return el.map(function (e) {
                                                                                        return e.getAttribute('href');
                                                                                    });
                                                                                }).then(function (urlLinks) { return __awaiter(_this, void 0, void 0, function () {
                                                                                    var _loop_2, _i, urlLinks_1, urlLink;
                                                                                    var _this = this;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                _loop_2 = function (urlLink) {
                                                                                                    var link, promoDetailPage;
                                                                                                    return __generator(this, function (_a) {
                                                                                                        switch (_a.label) {
                                                                                                            case 0:
                                                                                                                link = (_a = urlLink) === null || _a === void 0 ? void 0 : _a.toString();
                                                                                                                return [4 /*yield*/, browser_1.newPage()];
                                                                                                            case 1:
                                                                                                                promoDetailPage = _a.sent();
                                                                                                                return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                                                                                                                        var urlDetail, data;
                                                                                                                        var _a, _b;
                                                                                                                        return __generator(this, function (_c) {
                                                                                                                            switch (_c.label) {
                                                                                                                                case 0:
                                                                                                                                    console.log("Begin new page " + ((_a = link) === null || _a === void 0 ? void 0 : _a.toString()));
                                                                                                                                    urlDetail = this.mMainURL + ((_b = link) === null || _b === void 0 ? void 0 : _b.toString());
                                                                                                                                    console.log('url detail : ', urlDetail);
                                                                                                                                    return [4 /*yield*/, promoDetailPage.goto(urlDetail, { waitUntil: "load" })
                                                                                                                                            .then(function (e) { var _a; return console.log("goto response: " + ((_a = e) === null || _a === void 0 ? void 0 : _a.status)); })
                                                                                                                                            .catch(function (e) { return console.log(e); })];
                                                                                                                                case 1:
                                                                                                                                    _c.sent();
                                                                                                                                    return [4 /*yield*/, promoDetailPage.evaluate(function () {
                                                                                                                                            var _a, _b, _c, _d;
                                                                                                                                            var title = (_a = document.querySelector('div.titleinside > h3:nth-child(1)')) === null || _a === void 0 ? void 0 : _a.innerHTML;
                                                                                                                                            var area = (_b = document.querySelector('.area > b:nth-child(1)')) === null || _b === void 0 ? void 0 : _b.innerHTML;
                                                                                                                                            var dateStart = (_c = document.querySelector('.periode > b:nth-child(1)')) === null || _c === void 0 ? void 0 : _c.innerHTML;
                                                                                                                                            var dateEnd = (_d = document.querySelector('.periode > b:nth-child(2)')) === null || _d === void 0 ? void 0 : _d.innerHTML;
                                                                                                                                            var scrapData = {
                                                                                                                                                title: title,
                                                                                                                                                area: area,
                                                                                                                                                periodeBegin: dateStart,
                                                                                                                                                periodeEnd: dateEnd
                                                                                                                                            };
                                                                                                                                            return scrapData;
                                                                                                                                        })];
                                                                                                                                case 2:
                                                                                                                                    data = _c.sent();
                                                                                                                                    console.log("our scraped data: " + JSON.stringify(data));
                                                                                                                                    dataList.push(data);
                                                                                                                                    return [2 /*return*/];
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }); })().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                                                                        return __generator(this, function (_a) {
                                                                                                                            switch (_a.label) {
                                                                                                                                case 0:
                                                                                                                                    console.log("Done looping page " + link + ". we can close this page");
                                                                                                                                    return [4 /*yield*/, promoDetailPage.close()];
                                                                                                                                case 1:
                                                                                                                                    _a.sent();
                                                                                                                                    return [2 /*return*/];
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }); })];
                                                                                                            case 2:
                                                                                                                _a.sent();
                                                                                                                return [2 /*return*/];
                                                                                                        }
                                                                                                    });
                                                                                                };
                                                                                                _i = 0, urlLinks_1 = urlLinks;
                                                                                                _b.label = 1;
                                                                                            case 1:
                                                                                                if (!(_i < urlLinks_1.length)) return [3 /*break*/, 4];
                                                                                                urlLink = urlLinks_1[_i];
                                                                                                return [5 /*yield**/, _loop_2(urlLink)];
                                                                                            case 2:
                                                                                                _b.sent();
                                                                                                _b.label = 3;
                                                                                            case 3:
                                                                                                _i++;
                                                                                                return [3 /*break*/, 1];
                                                                                            case 4:
                                                                                                console.log(promoThumbnail);
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); })];
                                                                        case 3:
                                                                            promoThumbnail = _b.sent();
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); })().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    console.log('on done scrape thumbnail');
                                                                    return [2 /*return*/];
                                                                });
                                                            }); })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _i = 0, pageLength_1 = pageLength;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < pageLength_1.length)) return [3 /*break*/, 4];
                                            it = pageLength_1[_i];
                                            return [5 /*yield**/, _loop_1(it)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/, dataList];
                                    }
                                });
                            }); })];
                    case 8:
                        data = _b.sent();
                        this.solutionJSON.push({ category: promo, data: data });
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10:
                        FileManager_1.FileManager.SaveToFile(JSON.stringify(this.solutionJSON));
                        return [4 /*yield*/, page_1.close()];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, browser_1.close()];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        error_1 = _b.sent();
                        if (error_1)
                            console.log(error_1);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return Solution;
}());
exports.Solution = Solution;
// Start app
var tes = new Solution();
tes.run();
