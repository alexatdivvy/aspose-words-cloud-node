/*
* MIT License

* Copyright (c) 2018 Aspose Pty Ltd

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

import "mocha";
import "mocha-sinon";
import * as sinon from "sinon";

import { GetDocumentRequest } from "../../src/model/model";
import { wordsApiInitializer } from "../baseTest";

describe("oauth tests", () => {

    it("should be called refresh token if token is not valid", async function() {

        // Ignored because we use local server to test this feature (access token is expired in 1s)
        this.skip();
        this.timeout(30000);

        const wordsApi = wordsApiInitializer();
        wordsApi.configuration.baseUrl = "http://localhost:8081";
        // TODO: put document to storage
        // TODO: move folder name to constants
        const request = new GetDocumentRequest();
        request.documentName = "TestGetDocument.docx";
        request.folder = "Temp/SdkTests/TestData/DocumentActions/Document";

        await wordsApi.getDocument(request);

        wordsApi.configuration.debugMode = true;
        const log = sinon.spy(console, "log");
        await wordsApi.getDocument(request).then(() => {
            log.restore();
            sinon.assert.calledWith(log, sinon.match("request").and(sinon.match("refresh_token")));
        });
    });
});
