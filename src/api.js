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
var BASE_URL = "http://localhost:3001";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
var JoblyApi = /** @class */ (function () {
    function JoblyApi() {
    }
    JoblyApi.request = function (endpoint, data, method) {
        if (data === void 0) { data = {}; }
        if (method === void 0) { method = "get"; }
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, body, resp, jsonResp, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.debug("API Call:", endpoint, data, method);
                        url = new URL("".concat(BASE_URL, "/").concat(endpoint));
                        headers = {
                            Authorization: "Bearer ".concat(JoblyApi.token),
                            "Content-Type": "application/json"
                        };
                        url.search = method === "get"
                            ? url.search = new URLSearchParams(data).toString()
                            : url.search = "";
                        body = method !== "get"
                            ? JSON.stringify(data)
                            : undefined;
                        return [4 /*yield*/, fetch(url, { method: method, body: body, headers: headers })];
                    case 1:
                        resp = _a.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        console.log("Error", resp);
                        console.error("API Error:", resp.statusText, resp.status);
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        jsonResp = _a.sent();
                        console.log("jsonresp", jsonResp);
                        message = "API Error: ".concat(resp.statusText, " ").concat(resp.status);
                        throw Array.isArray(message) ? message : [message];
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Individual API routes
    /** Get the current user. */
    JoblyApi.getCurrentUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("users/".concat(username))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.user];
                }
            });
        });
    };
    /** Get companies (filtered by name if not undefined) */
    JoblyApi.getCompanies = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("companies", filters)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.companies];
                }
            });
        });
    };
    /** Get details on a company by handle. */
    JoblyApi.getCompany = function (handle) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("companies/".concat(handle))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.company];
                }
            });
        });
    };
    /** Get list of jobs (filtered by title if not undefined) */
    JoblyApi.getJobs = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("jobs", { title: title })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.jobs];
                }
            });
        });
    };
    /** Apply to a job */
    JoblyApi.applyToJob = function (username, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("users/".concat(username, "/jobs/").concat(id), {}, "post")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Get token for login from username, password. */
    JoblyApi.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("auth/token", data, "post")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.token];
                }
            });
        });
    };
    /** Signup for site. */
    JoblyApi.signup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("auth/register", data, "post")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.token];
                }
            });
        });
    };
    /** Save user profile page. */
    JoblyApi.saveProfile = function (username, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("users/".concat(username), data, "patch")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.user];
                }
            });
        });
    };
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFuIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4NTE2NzIxN30.rEBjBEhZPROkHYAD71q6rOvu-dCjtJxfIM0kKeJAGt0";
    return JoblyApi;
}());
