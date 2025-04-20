# My Express API

간단한 Express 기반 API 서버입니다.

## 📚 API 문서

<!-- API-DOCS:START -->

---
title: Bookshop API v1.0.0
language_tabs:
  - javascript: javascript
language_clients:
  - javascript: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="bookshop-api">Bookshop API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Bookshop 쇼핑몰에서 사용하는 API 로, 인증, 도서 검색, 주문, 결제, 장바구니, 좋아요, 주문 관리 등의 기능을 제공합니다.

Base URLs:

* <a href="http://localhost:3000">http://localhost:3000</a>

## Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="bookshop-api--">인증</h1>

## 사용자 로그인

> Code samples

```javascript
const inputBody = '{
  "email": "user@example.com",
  "password": "password123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/auth/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/login`

이메일과 비밀번호로 로그인하여 액세스 토큰과 리프레시 토큰을 발급받습니다.

> Body parameter

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

<h3 id="사용자-로그인-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "status": "success",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user123",
    "userName": "John Doe"
  }
}
```

<h3 id="사용자-로그인-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|로그인 성공|[LoginResponse](#schemaloginresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|인증 실패|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 토큰 갱신

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/auth/refresh',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/refresh`

리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.

> Example responses

> 200 Response

```json
{
  "status": "토큰이 새로 발급되었습니다.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3 id="토큰-갱신-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|토큰 갱신 성공|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|인증 실패|[Error](#schemaerror)|

<h3 id="토큰-갱신-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» accessToken|string|false|none|새로운 JWT 액세스 토큰|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 로그아웃

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/auth/logout',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/logout`

사용자 로그아웃 처리

> Example responses

> 200 Response

```json
{
  "status": "success",
  "message": "로그아웃 완료"
}
```

<h3 id="로그아웃-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|로그아웃 성공|Inline|

<h3 id="로그아웃-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» status|string|false|none|none|
|» message|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">사용자</h1>

## 회원가입

> Code samples

```javascript
const inputBody = '{
  "email": "user@example.com",
  "password": "password123",
  "userName": "John Doe"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/users/join',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /users/join`

새로운 사용자 등록

> Body parameter

```json
{
  "email": "user@example.com",
  "password": "password123",
  "userName": "John Doe"
}
```

<h3 id="회원가입-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» email|body|string(email)|true|none|
|» password|body|string(password)|true|none|
|» userName|body|string|true|none|

> Example responses

> 400 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="회원가입-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|회원가입 성공|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|잘못된 요청|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 사용자 정보 조회

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /users/{id}`

사용자 ID로 사용자 정보를 조회합니다.

<h3 id="사용자-정보-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|사용자 ID|

> Example responses

> 200 Response

```json
{
  "userId": "user123",
  "userName": "John Doe",
  "email": "user@example.com"
}
```

<h3 id="사용자-정보-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|사용자 정보 조회 성공|[User](#schemauser)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|사용자를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 사용자 삭제

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/users/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /users/{id}`

사용자 ID로 사용자를 삭제합니다.

<h3 id="사용자-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|사용자 ID|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="사용자-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|사용자 삭제 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|사용자를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 이메일 인증

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/users/reset/{email}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /users/reset/{email}`

비밀번호 재설정을 위한 이메일 인증

<h3 id="이메일-인증-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|email|path|string(email)|true|사용자 이메일|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="이메일-인증-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|이메일 인증 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|사용자를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 비밀번호 재설정

> Code samples

```javascript
const inputBody = '{
  "newPassword": "newPassword123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/users/reset/{id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /users/reset/{id}`

사용자 비밀번호를 재설정합니다.

> Body parameter

```json
{
  "newPassword": "newPassword123"
}
```

<h3 id="비밀번호-재설정-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|사용자 ID|
|body|body|object|true|none|
|» newPassword|body|string(password)|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="비밀번호-재설정-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|비밀번호 재설정 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|사용자를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">도서</h1>

## 도서 목록 조회

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/books/lists',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /books/lists`

도서 목록을 조회합니다.

<h3 id="도서-목록-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|페이지 번호|
|limit|query|integer|false|페이지당 항목 수|

> Example responses

> 200 Response

```json
{
  "books": [
    {
      "id": "book123",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A story of the fabulously wealthy Jay Gatsby...",
      "price": 15.99,
      "coverImage": "https://example.com/cover.jpg",
      "isbn": "978-0743273565",
      "publisher": "Scribner",
      "publishedDate": "2004-09-30",
      "rating": 4.5
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

<h3 id="도서-목록-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|도서 목록 조회 성공|Inline|

<h3 id="도서-목록-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» books|[[Book](#schemabook)]|false|none|none|
|»» id|string|false|none|none|
|»» title|string|false|none|none|
|»» author|string|false|none|none|
|»» description|string|false|none|none|
|»» price|number(float)|false|none|none|
|»» coverImage|string|false|none|none|
|»» isbn|string|false|none|none|
|»» publisher|string|false|none|none|
|»» publishedDate|string(date)|false|none|none|
|»» rating|number(float)|false|none|none|
|» pagination|object|false|none|none|
|»» total|integer|false|none|none|
|»» page|integer|false|none|none|
|»» limit|integer|false|none|none|
|»» pages|integer|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 도서 상세 정보 조회

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/books/details/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /books/details/{id}`

도서 ID로 도서 상세 정보를 조회합니다.

<h3 id="도서-상세-정보-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|도서 ID|

> Example responses

> 200 Response

```json
{
  "id": "book123",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A story of the fabulously wealthy Jay Gatsby...",
  "price": 15.99,
  "coverImage": "https://example.com/cover.jpg",
  "isbn": "978-0743273565",
  "publisher": "Scribner",
  "publishedDate": "2004-09-30",
  "rating": 4.5
}
```

<h3 id="도서-상세-정보-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|도서 상세 정보 조회 성공|[Book](#schemabook)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|도서를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">장바구니</h1>

## 장바구니 조회

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/carts/{userId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /carts/{userId}`

사용자의 장바구니 항목을 조회합니다.

<h3 id="장바구니-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|

> Example responses

> 200 Response

```json
{
  "items": [
    {
      "bookId": "book123",
      "title": "The Great Gatsby",
      "price": 15.99,
      "quantity": 2,
      "subtotal": 31.98
    }
  ],
  "total": 31.98
}
```

<h3 id="장바구니-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|장바구니 조회 성공|Inline|

<h3 id="장바구니-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» items|[[CartItem](#schemacartitem)]|false|none|none|
|»» bookId|string|false|none|none|
|»» title|string|false|none|none|
|»» price|number(float)|false|none|none|
|»» quantity|integer|false|none|none|
|»» subtotal|number(float)|false|none|none|
|» total|number(float)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 장바구니에 추가

> Code samples

```javascript
const inputBody = '{
  "bookId": "book123",
  "quantity": 2
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/carts/{userId}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /carts/{userId}`

장바구니에 도서를 추가합니다.

> Body parameter

```json
{
  "bookId": "book123",
  "quantity": 2
}
```

<h3 id="장바구니에-추가-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|
|body|body|object|true|none|
|» bookId|body|string|true|none|
|» quantity|body|integer|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="장바구니에-추가-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|장바구니 추가 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|도서를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 장바구니 항목 수정

> Code samples

```javascript
const inputBody = '{
  "bookId": "book123",
  "quantity": 3
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/carts/{userId}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /carts/{userId}`

장바구니 항목의 수량을 수정합니다.

> Body parameter

```json
{
  "bookId": "book123",
  "quantity": 3
}
```

<h3 id="장바구니-항목-수정-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|
|body|body|object|true|none|
|» bookId|body|string|true|none|
|» quantity|body|integer|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="장바구니-항목-수정-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|장바구니 수정 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|장바구니 항목을 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 장바구니 항목 삭제

> Code samples

```javascript
const inputBody = '{
  "bookId": "book123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/carts/{userId}',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /carts/{userId}`

장바구니에서 항목을 삭제합니다.

> Body parameter

```json
{
  "bookId": "book123"
}
```

<h3 id="장바구니-항목-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|
|body|body|object|true|none|
|» bookId|body|string|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="장바구니-항목-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|장바구니 삭제 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|장바구니 항목을 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">주문</h1>

## 주문 상태 업데이트

> Code samples

```javascript
const inputBody = '{
  "orderId": "order123",
  "status": "shipped"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/orders',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /orders`

주문 상태를 업데이트합니다.

> Body parameter

```json
{
  "orderId": "order123",
  "status": "shipped"
}
```

<h3 id="주문-상태-업데이트-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» orderId|body|string|true|none|
|» status|body|string|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|pending|
|» status|processing|
|» status|shipped|
|» status|delivered|
|» status|cancelled|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="주문-상태-업데이트-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|주문 상태 업데이트 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|주문을 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 주문 항목 조회

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/orders/order-items',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /orders/order-items`

사용자의 주문 항목을 조회합니다.

> Example responses

> 200 Response

```json
{
  "orders": [
    {
      "orderId": "order123",
      "date": "2023-04-06T12:00:00Z",
      "status": "shipped",
      "items": [
        {
          "bookId": "book123",
          "title": "The Great Gatsby",
          "price": 15.99,
          "quantity": 2,
          "subtotal": 31.98
        }
      ],
      "total": 31.98,
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      }
    }
  ]
}
```

<h3 id="주문-항목-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|주문 항목 조회 성공|Inline|

<h3 id="주문-항목-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» orders|[[Order](#schemaorder)]|false|none|none|
|»» orderId|string|false|none|none|
|»» date|string(date-time)|false|none|none|
|»» status|string|false|none|none|
|»» items|[[CartItem](#schemacartitem)]|false|none|none|
|»»» bookId|string|false|none|none|
|»»» title|string|false|none|none|
|»»» price|number(float)|false|none|none|
|»»» quantity|integer|false|none|none|
|»»» subtotal|number(float)|false|none|none|
|»» total|number(float)|false|none|none|
|»» shippingAddress|object|false|none|none|
|»»» street|string|false|none|none|
|»»» city|string|false|none|none|
|»»» state|string|false|none|none|
|»»» zipCode|string|false|none|none|
|»»» country|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|processing|
|status|shipped|
|status|delivered|
|status|cancelled|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">좋아요</h1>

## 좋아요 추가

> Code samples

```javascript
const inputBody = '{
  "bookId": "book123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/likes/{userId}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /likes/{userId}`

도서에 좋아요를 추가합니다.

> Body parameter

```json
{
  "bookId": "book123"
}
```

<h3 id="좋아요-추가-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|
|body|body|object|true|none|
|» bookId|body|string|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="좋아요-추가-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|좋아요 추가 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|도서를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 좋아요 삭제

> Code samples

```javascript
const inputBody = '{
  "bookId": "book123"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/likes/{userId}',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /likes/{userId}`

도서의 좋아요를 삭제합니다.

> Body parameter

```json
{
  "bookId": "book123"
}
```

<h3 id="좋아요-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string|true|사용자 ID|
|body|body|object|true|none|
|» bookId|body|string|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="좋아요-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|좋아요 삭제 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|좋아요를 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="bookshop-api--">결제</h1>

## 결제 생성

> Code samples

```javascript
const inputBody = '{
  "orderId": "order123",
  "amount": 31.98,
  "paymentMethod": "credit_card"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/payments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /payments`

새로운 결제를 생성합니다.

> Body parameter

```json
{
  "orderId": "order123",
  "amount": 31.98,
  "paymentMethod": "credit_card"
}
```

<h3 id="결제-생성-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» orderId|body|string|true|none|
|» amount|body|number(float)|true|none|
|» paymentMethod|body|string|true|none|

> Example responses

> 404 Response

```json
{
  "status": "error",
  "message": "Error description"
}
```

<h3 id="결제-생성-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|결제 생성 성공|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|주문을 찾을 수 없음|[Error](#schemaerror)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## 결제 제공자 추가

> Code samples

```javascript
const inputBody = '{
  "name": "Stripe",
  "description": "Stripe payment processing"
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/payments/providers',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /payments/providers`

새로운 결제 제공자를 추가합니다.

> Body parameter

```json
{
  "name": "Stripe",
  "description": "Stripe payment processing"
}
```

<h3 id="결제-제공자-추가-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» name|body|string|true|none|
|» description|body|string|true|none|

<h3 id="결제-제공자-추가-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|결제 제공자 추가 성공|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## Schemas

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "status": "error",
  "message": "Error description"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|
|message|string|false|none|none|

<h2 id="tocS_LoginRequest">LoginRequest</h2>
<!-- backwards compatibility -->
<a id="schemaloginrequest"></a>
<a id="schema_LoginRequest"></a>
<a id="tocSloginrequest"></a>
<a id="tocsloginrequest"></a>

```json
{
  "email": "user@example.com",
  "password": "password123"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|true|none|none|
|password|string(password)|true|none|none|

<h2 id="tocS_LoginResponse">LoginResponse</h2>
<!-- backwards compatibility -->
<a id="schemaloginresponse"></a>
<a id="schema_LoginResponse"></a>
<a id="tocSloginresponse"></a>
<a id="tocsloginresponse"></a>

```json
{
  "status": "success",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user123",
    "userName": "John Doe"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|false|none|none|
|accessToken|string|false|none|none|
|user|object|false|none|none|
|» userId|string|false|none|none|
|» userName|string|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "userId": "user123",
  "userName": "John Doe",
  "email": "user@example.com"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|userId|string|false|none|none|
|userName|string|false|none|none|
|email|string(email)|false|none|none|

<h2 id="tocS_Book">Book</h2>
<!-- backwards compatibility -->
<a id="schemabook"></a>
<a id="schema_Book"></a>
<a id="tocSbook"></a>
<a id="tocsbook"></a>

```json
{
  "id": "book123",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A story of the fabulously wealthy Jay Gatsby...",
  "price": 15.99,
  "coverImage": "https://example.com/cover.jpg",
  "isbn": "978-0743273565",
  "publisher": "Scribner",
  "publishedDate": "2004-09-30",
  "rating": 4.5
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|title|string|false|none|none|
|author|string|false|none|none|
|description|string|false|none|none|
|price|number(float)|false|none|none|
|coverImage|string|false|none|none|
|isbn|string|false|none|none|
|publisher|string|false|none|none|
|publishedDate|string(date)|false|none|none|
|rating|number(float)|false|none|none|

<h2 id="tocS_CartItem">CartItem</h2>
<!-- backwards compatibility -->
<a id="schemacartitem"></a>
<a id="schema_CartItem"></a>
<a id="tocScartitem"></a>
<a id="tocscartitem"></a>

```json
{
  "bookId": "book123",
  "title": "The Great Gatsby",
  "price": 15.99,
  "quantity": 2,
  "subtotal": 31.98
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bookId|string|false|none|none|
|title|string|false|none|none|
|price|number(float)|false|none|none|
|quantity|integer|false|none|none|
|subtotal|number(float)|false|none|none|

<h2 id="tocS_Order">Order</h2>
<!-- backwards compatibility -->
<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "orderId": "order123",
  "date": "2023-04-06T12:00:00Z",
  "status": "shipped",
  "items": [
    {
      "bookId": "book123",
      "title": "The Great Gatsby",
      "price": 15.99,
      "quantity": 2,
      "subtotal": 31.98
    }
  ],
  "total": 31.98,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|orderId|string|false|none|none|
|date|string(date-time)|false|none|none|
|status|string|false|none|none|
|items|[[CartItem](#schemacartitem)]|false|none|none|
|total|number(float)|false|none|none|
|shippingAddress|object|false|none|none|
|» street|string|false|none|none|
|» city|string|false|none|none|
|» state|string|false|none|none|
|» zipCode|string|false|none|none|
|» country|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|processing|
|status|shipped|
|status|delivered|
|status|cancelled|

<!-- API-DOCS:END -->

## 💡 기타 정보

- Node.js
- Express
