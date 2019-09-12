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

import { expect } from "chai";
import "mocha";

import { DeleteFootnoteRequest, Footnote, GetFootnoteRequest, GetFootnotesRequest, UpdateFootnoteRequest, InsertFootnoteRequest } from "../../src/model/model";
import * as BaseTest from "../baseTest";

const testFolder = "DocumentElements/Footnotes";

describe("footnotes", () => {
    describe("getFootnotes function", () => {
        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localBaseTestDataFolder + testFolder + "/Footnote.doc";
            const remoteFileName = "TestGetFootnotes.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new GetFootnotesRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.nodePath = null;

                    // Act
                    return wordsApi.getFootnotes(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.footnotes).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("getFootnote function", () => {
        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localBaseTestDataFolder + testFolder + "/Footnote.doc";
            const remoteFileName = "TestGetFootnote.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new GetFootnoteRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.nodePath = null;
                    request.index = 0;

                    // Act
                    return wordsApi.getFootnote(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.footnote).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("putFootnote function", () => {
        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localBaseTestDataFolder + testFolder + "/Footnote.doc";
            const remoteFileName = "TestPutFootnote.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new InsertFootnoteRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.nodePath = null;
                    request.footnoteDto = new Footnote({
                        footnoteType: Footnote.FootnoteTypeEnum.Endnote,
                        text: "test endnote",                        
                    });

                    // Act
                    return wordsApi.insertFootnote(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.footnote).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("postFootnote function", () => {
        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localBaseTestDataFolder + testFolder + "/Footnote.doc";
            const remoteFileName = "TestPostFootnote.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new UpdateFootnoteRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.nodePath = null;
                    request.index = 0;
                    request.footnoteDto = new Footnote({ text: "new text" });

                    // Act
                    return wordsApi.updateFootnote(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.footnote).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("deleteFootnote function", () => {
        it("should return response with code 200", () => {

            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localBaseTestDataFolder + testFolder + "/Footnote.doc";
            const remoteFileName = "TestDeleteFootnote.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return wordsApi.uploadFileToStorage(remotePath + "/" + remoteFileName, localPath)
            .then((result) => {
                    expect(result.response.statusMessage).to.equal("OK");
                    const request = new DeleteFootnoteRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.nodePath = null;
                    request.index = 0;

                    // Act
                    return wordsApi.deleteFootnote(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);
                        });
                });
        });
    });
});
