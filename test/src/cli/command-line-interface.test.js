/* import {describe, expect, test} from '@jest/globals'; */
/* const {describe, expect, test} = require('@jest/globals'); */
/* import {describe, expect, test} from '@jest/globals'; */
 
import cli from "../../../src/cli/command-line-interface.js";
import { InputType } from "../../../src/models/model.js";
 



describe('Tokenizer files params', () => {
    test("tokenize", () => {

        const input=['-command="value" \r','-command2="value2" \r','-commandN="valueN" '];
        const expected={"-command":"value","-command2":"value2","-commandN":"valueN"};
        const received=cli.tokenize(input,InputType.CLI_FILE_PARAMS);
        expect(received).toEqual(expected);

      //  expect(cli.tokenize("",InputType.CLI_FILE_PARAMS),InputType).toEqual([]);
/*         expect(tokenize("test")).toEqual(["test"]);
        expect(tokenize("test test2")).toEqual(["test", "test2"]);   */
    });
});

 