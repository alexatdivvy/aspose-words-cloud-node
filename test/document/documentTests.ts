/*
* MIT License

* Copyright (c) 2019 Aspose Pty Ltd

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

import { expect } from "chai";
import "mocha";

import { GetDocumentRequest, CreateDocumentRequest } from "../../src/model/model";
import * as BaseTest from "../baseTest";

const testFolder = "document";

describe("getDocument function", () => {

  it("should return response with code 200", () => {

    const wordsApi = BaseTest.initializeWordsApi();

    const localPath = BaseTest.localCommonTestDataFolder;
    const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;
    const filename = "test_doc.docx";

    return wordsApi.uploadFileToStorage(remotePath + "/" + filename, localPath + filename)
      .then((result) => {
        expect(result.response.statusMessage).to.equal("OK");

        const request = new GetDocumentRequest();
        request.documentName = filename;
        request.folder = remotePath;

        // Act
        return wordsApi.getDocument(request)
          .then((result) => {
            // Assert
            expect(result.response.statusCode).to.equal(200);

            // Check document is not signed
            expect(result.body.document.isSigned).to.equal(false);
          });
      });
  });
});

describe("createDocument function", () => {

  it("should return response with code 200", () => {

    const wordsApi = BaseTest.initializeWordsApi();

    const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;
    const filename = "TestPutCreateDocument.doc";

    const request = new CreateDocumentRequest();
    request.fileName = filename;
    request.folder = remotePath;

    // Act
    return wordsApi.createDocument(request)
      .then((result) => {
        // Assert
        expect(result.response.statusCode).to.equal(200);

        expect(result.body.document.fileName).to.equal(filename);
      });
  });
});
