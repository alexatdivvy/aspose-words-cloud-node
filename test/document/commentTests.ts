/*
 * --------------------------------------------------------------------------------
 * <copyright company="Aspose" file="commentTests.ts">
 *   Copyright (c) 2020 Aspose.Words for Cloud
 * </copyright>
 * <summary>
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 * </summary>
 * --------------------------------------------------------------------------------
 */

import { expect } from "chai";
import "mocha";

import * as fs from "fs";
import * as model from "../../src/model/model";
import * as BaseTest from "../baseTest";

// Example of how to get comments from document.
describe("comment", () => {
    expect(fs);
    const remoteDataFolder = BaseTest.remoteBaseTestDataFolder + "/Comments";
    const localFile = "Common/test_multi_pages.docx";

    // Test for getting comment by specified comment's index.
    describe("getComment test", () => {
        it("should return response with code 200", () => {
            const wordsApi = BaseTest.initializeWordsApi();
            const remoteFileName = "TestGetComment.docx";

            return wordsApi.uploadFileToStorage(
                remoteDataFolder + "/" + remoteFileName,
                BaseTest.localBaseTestDataFolder + localFile
            ).then((result0) => {
                expect(result0.response.statusMessage).to.equal("OK");
                const request = new model.GetCommentRequest({
                    name: remoteFileName,
                    commentIndex: 0,
                    folder: remoteDataFolder
                });

                // Act
                return wordsApi.getComment(request)
                .then((resultApi) => {
                    // Assert
                    expect(resultApi.response.statusCode).to.equal(200);
                    expect(resultApi.body.comment).to.exist;
                    expect(resultApi.body.comment.text).to.equal("Comment 1" + "\r\n\r\n");
                });

            });

       });
    });

    // Test for getting all comments from document.
    describe("getComments test", () => {
        it("should return response with code 200", () => {
            const wordsApi = BaseTest.initializeWordsApi();
            const remoteFileName = "TestGetComments.docx";

            return wordsApi.uploadFileToStorage(
                remoteDataFolder + "/" + remoteFileName,
                BaseTest.localBaseTestDataFolder + localFile
            ).then((result0) => {
                expect(result0.response.statusMessage).to.equal("OK");
                const request = new model.GetCommentsRequest({
                    name: remoteFileName,
                    folder: remoteDataFolder
                });

                // Act
                return wordsApi.getComments(request)
                .then((resultApi) => {
                    // Assert
                    expect(resultApi.response.statusCode).to.equal(200);
                    expect(resultApi.body.comments).to.exist;
                    expect(resultApi.body.comments.commentList).to.exist;
                    expect(resultApi.body.comments.commentList).to.have.lengthOf(1);
                    expect(resultApi.body.comments.commentList[0].text).to.equal("Comment 1" + "\r\n\r\n");
                });

            });

       });
    });

    // Test for adding comment.
    describe("insertComment test", () => {
        it("should return response with code 200", () => {
            const wordsApi = BaseTest.initializeWordsApi();
            const remoteFileName = "TestInsertComment.docx";

            return wordsApi.uploadFileToStorage(
                remoteDataFolder + "/" + remoteFileName,
                BaseTest.localBaseTestDataFolder + localFile
            ).then((result0) => {
                expect(result0.response.statusMessage).to.equal("OK");
                const request = new model.InsertCommentRequest({
                    name: remoteFileName,
                    comment: new model.CommentInsert({
                        rangeStart: new model.DocumentPosition({
                            node: new model.NodeLink({
                                nodeId: "0.3.0.3"
                            }),
                            offset: 0
                        }),
                        rangeEnd: new model.DocumentPosition({
                            node: new model.NodeLink({
                                nodeId: "0.3.0.3"
                            }),
                            offset: 0
                        }),
                        initial: "IA",
                        author: "Imran Anwar",
                        text: "A new Comment"
                    }),
                    folder: remoteDataFolder
                });

                // Act
                return wordsApi.insertComment(request)
                .then((resultApi) => {
                    // Assert
                    expect(resultApi.response.statusCode).to.equal(200);
                    expect(resultApi.body.comment).to.exist;
                    expect(resultApi.body.comment.text).to.equal("A new Comment" + "\r\n");
                    expect(resultApi.body.comment.rangeStart).to.exist;
                    expect(resultApi.body.comment.rangeStart.node).to.exist;
                    expect(resultApi.body.comment.rangeStart.node.nodeId).to.equal("0.3.0.4");
                });

            });

       });
    });

    // Test for updating comment.
    describe("updateComment test", () => {
        it("should return response with code 200", () => {
            const wordsApi = BaseTest.initializeWordsApi();
            const remoteFileName = "TestUpdateComment.docx";

            return wordsApi.uploadFileToStorage(
                remoteDataFolder + "/" + remoteFileName,
                BaseTest.localBaseTestDataFolder + localFile
            ).then((result0) => {
                expect(result0.response.statusMessage).to.equal("OK");
                const request = new model.UpdateCommentRequest({
                    name: remoteFileName,
                    commentIndex: 0,
                    comment: new model.CommentUpdate({
                        rangeStart: new model.DocumentPosition({
                            node: new model.NodeLink({
                                nodeId: "0.3.0"
                            }),
                            offset: 0
                        }),
                        rangeEnd: new model.DocumentPosition({
                            node: new model.NodeLink({
                                nodeId: "0.3.0"
                            }),
                            offset: 0
                        }),
                        initial: "IA",
                        author: "Imran Anwar",
                        text: "A new Comment"
                    }),
                    folder: remoteDataFolder
                });

                // Act
                return wordsApi.updateComment(request)
                .then((resultApi) => {
                    // Assert
                    expect(resultApi.response.statusCode).to.equal(200);
                    expect(resultApi.body.comment).to.exist;
                    expect(resultApi.body.comment.text).to.equal("A new Comment" + "\r\n");
                    expect(resultApi.body.comment.rangeStart).to.exist;
                    expect(resultApi.body.comment.rangeStart.node).to.exist;
                    expect(resultApi.body.comment.rangeStart.node.nodeId).to.equal("0.3.0.1");
                });

            });

       });
    });

    // A test for DeleteComment.
    describe("deleteComment test", () => {
        it("should return response with code 200", () => {
            const wordsApi = BaseTest.initializeWordsApi();
            const remoteFileName = "TestDeleteComment.docx";

            return wordsApi.uploadFileToStorage(
                remoteDataFolder + "/" + remoteFileName,
                BaseTest.localBaseTestDataFolder + localFile
            ).then((result0) => {
                expect(result0.response.statusMessage).to.equal("OK");
                const request = new model.DeleteCommentRequest({
                    name: remoteFileName,
                    commentIndex: 0,
                    folder: remoteDataFolder,
                    destFileName: BaseTest.remoteBaseTestOutFolder + "/" + remoteFileName
                });

                // Act
                return wordsApi.deleteComment(request)
                .then((resultApi) => {
                    // Assert
                    expect(resultApi.statusCode).to.equal(200);
                });

            });

       });
    });
});
