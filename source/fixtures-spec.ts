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
            result.failures.forEach(failure => expect(failure).to.have.property("ruleName", "ban-imports"));
        });

        it("should not effect 'ban-imports' errors for non-banned imports", () => {

            const result = lint("ban-imports", "tslint.json", "fixture-non-banned.ts");

            expect(result).to.have.property("errorCount", 0);
        });
    });

    describe.skip("no-unsafe-callback-scope", () => {
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

        console.log(path.resolve("."));
        console.log(configuration.rulesDirectory);
        console.log(fs.readdirSync(configuration.rulesDirectory[0]));

        linter.lint(fileName, content, configuration);
        return linter.getResult();
    }
});
