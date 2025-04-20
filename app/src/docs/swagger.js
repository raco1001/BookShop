/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인하여 액세스 토큰과 리프레시 토큰을 발급받습니다.
 *     tags: [인증]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 accessToken:
 *                   type: string
 *                   description: JWT 액세스 토큰
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     userName:
 *                       type: string
 *       401:
 *         description: 인증 실패
 *
 * /auth/refresh:
 *   post:
 *     summary: 토큰 갱신
 *     description: 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.
 *     tags: [인증]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 토큰 갱신 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 토큰이 새로 발급되었습니다.
 *                 accessToken:
 *                   type: string
 *                   description: 새로운 JWT 액세스 토큰
 *       401:
 *         description: 인증 실패
 *
 * /auth/logout:
 *   post:
 *     summary: 로그아웃
 *     description: 사용자 로그아웃 처리
 *     tags: [인증]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 로그아웃 완료
 *
 * /users/join:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자 등록
 *     tags: [사용자]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - userName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               userName:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *
 * /users/{id}:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 사용자 ID로 사용자 정보를 조회합니다.
 *     tags: [사용자]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *
 *   delete:
 *     summary: 사용자 삭제
 *     description: 사용자 ID로 사용자를 삭제합니다.
 *     tags: [사용자]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 사용자 삭제 성공
 *
 * /users/reset/{email}:
 *   get:
 *     summary: 이메일 인증
 *     description: 비밀번호 재설정을 위한 이메일 인증
 *     tags: [사용자]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: 사용자 이메일
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *
 * /users/reset/{id}:
 *   put:
 *     summary: 비밀번호 재설정
 *     description: 사용자 비밀번호를 재설정합니다.
 *     tags: [사용자]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 성공
 *
 * /books/lists:
 *   get:
 *     summary: 도서 목록 조회
 *     description: 도서 목록을 조회합니다.
 *     tags: [도서]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 도서 목록 조회 성공
 *
 * /books/details/{id}:
 *   get:
 *     summary: 도서 상세 정보 조회
 *     description: 도서 ID로 도서 상세 정보를 조회합니다.
 *     tags: [도서]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 도서 ID
 *     responses:
 *       200:
 *         description: 도서 상세 정보 조회 성공
 *
 * /carts/{userId}:
 *   get:
 *     summary: 장바구니 조회
 *     description: 사용자의 장바구니 항목을 조회합니다.
 *     tags: [장바구니]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 장바구니 조회 성공
 *
 *   post:
 *     summary: 장바구니에 추가
 *     description: 장바구니에 도서를 추가합니다.
 *     tags: [장바구니]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - quantity
 *             properties:
 *               bookId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 장바구니 추가 성공
 *
 *   put:
 *     summary: 장바구니 항목 수정
 *     description: 장바구니 항목의 수량을 수정합니다.
 *     tags: [장바구니]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - quantity
 *             properties:
 *               bookId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 장바구니 수정 성공
 *
 *   delete:
 *     summary: 장바구니 항목 삭제
 *     description: 장바구니에서 항목을 삭제합니다.
 *     tags: [장바구니]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 장바구니 삭제 성공
 *
 * /orders:
 *   put:
 *     summary: 주문 상태 업데이트
 *     description: 주문 상태를 업데이트합니다.
 *     tags: [주문]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: 주문 상태 업데이트 성공
 *
 * /orders/order-items:
 *   get:
 *     summary: 주문 항목 조회
 *     description: 사용자의 주문 항목을 조회합니다.
 *     tags: [주문]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 항목 조회 성공
 *
 * /likes/{userId}:
 *   post:
 *     summary: 좋아요 추가
 *     description: 도서에 좋아요를 추가합니다.
 *     tags: [좋아요]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공
 *
 *   delete:
 *     summary: 좋아요 삭제
 *     description: 도서의 좋아요를 삭제합니다.
 *     tags: [좋아요]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 좋아요 삭제 성공
 *
 * /payments:
 *   post:
 *     summary: 결제 생성
 *     description: 새로운 결제를 생성합니다.
 *     tags: [결제]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: 결제 생성 성공
 *
 * /payments/providers:
 *   post:
 *     summary: 결제 제공자 추가
 *     description: 새로운 결제 제공자를 추가합니다.
 *     tags: [결제]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: 결제 제공자 추가 성공
 */

module.exports = {}
