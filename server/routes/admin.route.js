const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: 로그인
 *     description: Admin API
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: 관리자 아이디
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 관리자 비밀번호
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 로그인 실패
 */

router.post('/login', controller.login);

router.get('/community', controller.getCommunity);

module.exports = router;
