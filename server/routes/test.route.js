const express = require("express");
const router = express.Router();

const {
    registTestData,
} = require("../controllers/test.controller");

/**
 * @swagger
 * tags:
 *   name: Test
 * /test/regist-data:
 *   post:
 *     summary: 테스트 데이터 삽입
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 제목을 입력하세요.
 *               content:
 *                 type: string
 *                 description: 내용을 입력하세요.
 *           example:
 *             title: Example Title
 *             content: Example Content
 *     responses:
 *       '200':
 *         description: 테스트 데이터 삽입 성공 (배열로 반환됨)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 err:
 *                   type: object
 */
router.post("/regist-data", registTestData);

module.exports = router;
