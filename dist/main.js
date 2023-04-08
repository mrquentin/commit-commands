"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const exec = __importStar(require("@actions/exec"));
async function run() {
    var _a, _b, _c;
    if (github.context.eventName === "push") {
        const pushPayload = github.context.payload;
        const commit = pushPayload.head_commit;
        console.log("Push detected, bumping version...");
        if ((_a = commit === null || commit === void 0 ? void 0 : commit.message) === null || _a === void 0 ? void 0 : _a.startsWith("major:")) {
            console.log("Major bump ...");
            await exec.exec("cargo", ["bump", "major"]);
        }
        else if ((_b = commit === null || commit === void 0 ? void 0 : commit.message) === null || _b === void 0 ? void 0 : _b.startsWith("minor:")) {
            console.log("Minor bump ...");
            await exec.exec("cargo", ["bump", "minor"]);
        }
        else if ((_c = commit === null || commit === void 0 ? void 0 : commit.message) === null || _c === void 0 ? void 0 : _c.startsWith("fix:")) {
            console.log("Patch bump ...");
            await exec.exec("cargo", ["bump", "patch"]);
        }
    }
}
exports.run = run;
async function main() {
    try {
        await run();
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
void main();
