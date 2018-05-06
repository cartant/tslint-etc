/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/tslint-etc
 */

import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import { Configuration, Linter, LintResult } from "tslint";
import * as ts from "typescript";

describe("fixtures", function (): void {

    /*tslint:disable-next-line:no-invalid-this*/
    this.timeout(5000);

    describe("ban-imports", () => {

        it("should effect 'ban-imports' errors for banned imports", () => {

            const result = lint("ban-imports", "tslint.json", "fixture-banned.ts");

            expect(result).to.have.property("errorCount", 2);
            result.failures.forEach(failure => {
                expect(failure).to.have.property("ruleName", "ban-imports");
                const message = failure.getFailure();
                if (/: a/.test(message)) {
                    expect(message).to.contain("'a' matches /^a$/");
                    expect(message).to.match(/Explanation for a/);
                }
            });
        });

        it("should not effect 'ban-imports' errors for non-banned imports", () => {

            const result = lint("ban-imports", "tslint.json", "fixture-non-banned.ts");

            expect(result).to.have.property("errorCount", 0);
        });
    });

    describe("no-unsafe-callback-scope", () => {

        it("should effect 'no-unsafe-callback-scope' errors", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json");

            expect(result).to.have.property("errorCount", 1);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unsafe-callback-scope"));
        });

        it("should effect 'no-unsafe-callback-scope' errors for non-arrow functions", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-functions.ts");

            expect(result).to.have.property("errorCount", 1);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unsafe-callback-scope"));
        });

        it("should not effect 'no-unsafe-callback-scope' errors for safe usage", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-safe.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should not effect 'no-unsafe-callback-scope' errors for globals", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-globals.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should not effect 'no-unsafe-callback-scope' errors for Math", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-math.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should not effect 'no-unsafe-callback-scope' errors for constants", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-constants.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should not effect 'no-unsafe-callback-scope' errors for enums", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-enums.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should effect 'no-unsafe-callback-scope' errors for this", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-this.ts");

            expect(result).to.have.property("errorCount", 1);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unsafe-callback-scope"));
        });

        it("should not effect 'no-unsafe-callback-scope' errors for parameters", () => {

            const result = lint("no-unsafe-callback-scope", "tslint.json", "fixture-parameters.ts");

            expect(result).to.have.property("errorCount", 0);
        });
    });

    describe("no-unused-declaration", () => {

        it("should effect 'no-unused-declaration' errors for unused variables", () => {

            const result = lint("no-unused-declaration", "tslint.json");

            expect(result).to.have.property("errorCount", 3);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });

        it("should not effect 'no-unused-declaration' errors for used variables", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-used-variables.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should effect 'no-unused-declaration' errors for unused imports", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-unused-imports.ts");

            expect(result).to.have.property("errorCount", 3);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });

        it("should not effect 'no-unused-declaration' errors for used imports", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-used-imports.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should effect 'no-unused-declaration' errors for unused functions", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-unused-functions.ts");

            expect(result).to.have.property("errorCount", 2);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });

        it("should not effect 'no-unused-declaration' errors for used functions", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-used-functions.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should not effect 'no-unused-declaration' errors for exports", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-exports.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should effect 'no-unused-declaration' errors for unused destructuring", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-unused-destructuring.ts");

            expect(result).to.have.property("errorCount", 2);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });

        it("should not effect 'no-unused-declaration' errors for used destructuring", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-used-destructuring.ts");

            expect(result).to.have.property("errorCount", 0);
        });

        it("should effect 'no-unused-declaration' errors for shadowed unused variables", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-shadowed.ts");

            expect(result).to.have.property("errorCount", 2);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });

        it("should effect 'no-unused-declaration' errors for unused reassigned variables", () => {

            const result = lint("no-unused-declaration", "tslint.json", "fixture-reassigned.ts");

            expect(result).to.have.property("errorCount", 2);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "no-unused-declaration"));
        });
    });

    describe("throw-error", () => {

        it("should effect 'throw-error' errors for thrown non-errors", () => {

            const result = lint("throw-error", "tslint.json", "fixture.ts");

            expect(result).to.have.property("errorCount", 1);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "throw-error"));
        });

        it("should effect 'throw-error' errors for rejected non-errors", () => {

            const result = lint("throw-error", "tslint.json", "fixture-rejected.ts");

            expect(result).to.have.property("errorCount", 3);
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "throw-error"));
        });
    });

    function lint(dir: string, configFileName?: string, fixtureFileName?: string): LintResult {

        const fixturesDir = path.resolve("./fixtures");
        const fixtureDir = `${fixturesDir}/${dir}`;
        const fileName = `${fixtureDir}/${fixtureFileName || "fixture.ts"}`;
        const content = fs.readFileSync(fileName, "utf8");
        const program = Linter.createProgram(`${fixtureDir}/tsconfig.json`);
        const linter = new Linter({ fix: false }, program);

        const configuration = Configuration.findConfiguration(
            configFileName ?
                `${fixtureDir}/${configFileName}` :
                `${fixturesDir}/tslint.json`,
            fileName
        ).results;

        linter.lint(fileName, content, configuration);
        return linter.getResult();
    }
});
