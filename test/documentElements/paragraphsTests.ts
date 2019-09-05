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

import { DeleteParagraphRequest, GetParagraphFormatRequest, GetParagraphRequest, GetParagraphsRequest, ParagraphFormat, ParagraphInsert, UpdateParagraphFormatRequest, InsertParagraphRequest, RenderParagraphRequest } from "../../src/model/model";
import * as BaseTest from "../baseTest";

const testFolder = "DocumentElements/Paragraphs";

describe("paragraphs", () => {
    describe("getParagraphs function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestGetParagraphs.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new GetParagraphsRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;

                    // Act
                    return wordsApi.getParagraphs(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.paragraphs).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("getParagraph function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestGetParagraph.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new GetParagraphRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.index = 0;

                    // Act
                    return wordsApi.getParagraph(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.paragraph).to.exist.and.not.equal(null);
                        });
                });
        });
    });

    describe("putParagraph function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestPutParagraph.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new InsertParagraphRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.paragraph =  new ParagraphInsert ({ text: "This is a new paragraph for your document" });
                    request.nodePath = "sections/0";

                    // Act
                    return wordsApi.insertParagraph(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.paragraph).to.exist.and.not.equal(null);
                        });
                });
        });
    });   

    describe("deleteParagraph function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestDeleteParagraph.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new DeleteParagraphRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.index = 0;

                    // Act
                    return wordsApi.deleteParagraph(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);
                        });
                });
        });
    });

    describe("renderParagraph function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "test_multi_pages.docx";
            const remoteFileName = "TestRenderParagraph.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new RenderParagraphRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.index = 0;
                    request.format = "png";

                    // Act
                    return wordsApi.renderParagraph(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);
                            expect(result.body.byteLength).to.greaterThan(0);
                        });
                });
        });
    });

    describe("getParagraphFormat function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "/test_doc.docx";
            const remoteFileName = "TestGetParagraphFormat.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new GetParagraphFormatRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.index = 0;

                    // Act
                    return wordsApi.getParagraphFormat(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.paragraphFormat).to.exist.and.not.equal(null);
                        });
                });
        });
    });    

    describe("updateParagraphFormat function", () => {
        it("should return response with code 200", () => {

            const storageApi = BaseTest.initializeStorageApi();
            const wordsApi = BaseTest.initializeWordsApi();

            const localPath = BaseTest.localCommonTestDataFolder + "/test_doc.docx";
            const remoteFileName = "TestUpdateParagraphFormat.docx";
            const remotePath = BaseTest.remoteBaseTestDataFolder + testFolder;

            return new Promise((resolve) => {
                storageApi.PutCreate(remotePath + "/" + remoteFileName, null, null, localPath, (responseMessage) => {
                    expect(responseMessage.status).to.equal("OK");
                    resolve();
                });
            })
                .then(() => {
                    const request = new UpdateParagraphFormatRequest();
                    request.name = remoteFileName;
                    request.folder = remotePath;
                    request.index = 0;
                    request.nodePath = "";
                    request.dto = new ParagraphFormat(
                    {
                        alignment: ParagraphFormat.AlignmentEnum.Right,
                    });

                    // Act
                    return wordsApi.updateParagraphFormat(request)
                        .then((result) => {
                            // Assert
                            expect(result.response.statusCode).to.equal(200);

                            expect(result.body.paragraphFormat).to.exist.and.not.equal(null);
                        });
                });
        });
    });
});
