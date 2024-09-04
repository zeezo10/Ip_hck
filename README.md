# IP-HCK73

> Deployment Link: 

# API Documentation

## Endpoints

List of available endpoints:
- `POST /register`
- `POST /login`
- `POST /auth/google`

Routes below need authentication:
- `GET /user/:id`

- `GET /recipes`
- `POST /recipes`
- `GET /recipes/user`
- `GET /recipes/:id`
- `PUT /recipes/:id`
- `DELETE /recipes/:id`

- `POST /ai`
`

## 1. POST /register
Description:
- Register a new user into the system

#### Request:
- body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

*Response (201 - Created)*
```json
{
  "name": "string",
  "email": "string",
}
```

*Response (400 - Bad Request)*
```json
{
  "message": "Email is required"
}
```
OR
```json
{
  "message": "Password is required"
}
```
OR
```json
{
  "message": "Validation error message"
}
```

*Response (500 - Internal Server Error)*
```json
{
  "message": "Internal server error"
}
```

## 2. POST /login
Description:
- Login into the system

#### Request:
- body:
```json
{
  "email": "string",
  "password": "string"
}
```

*Response (200 - OK)*
```json
{
  "access_token": "string"
}
```

*Response (400 - Bad Request)*
```json
{
  "message": "Email is required"
}
```
OR
```json
{
  "message": "Password is required"
}
```


*Response (401 - Unauthorized)*
```json
{
  "message": "invalid email or password"
}
```

*Response (500 - Internal Server Error)*
```json
{
  "message": "Internal server error"
}
```

## 3. POST /auth/google
Description:
- Login into the system using google account

#### Request:
- body:
```json
{
  "googleToken": "string"
}
```

*Response (200 - OK)*
```json
{
  "access_token": "string"
}
```

*Response (201 - Created)*
```json
{
  "access_token": "string"
}
```

*Response (401 - Unauthorized)*
```json
{
  "message": "Error authentication"
}
```

*Response (500 - Internal Server Error)*
```json
{
  "message": "Internal server error"
}
```
## 4. GET /user/:id
Description:
- Get user info that logged in

- headers:
```json
{
    "Authorization": "Bearer <accessToken>"
}
```

*Response (200 - OK)*
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "password": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

*Response (401 - Unauthorized)*
```json
{
  "message": "Error authentication"
}
```

*Response (500 - Internal Server Error)*
```json
{
  "message": "Internal server error"
}
```
