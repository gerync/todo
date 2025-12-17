# API Endpoints (summary)

Base URL: `http://localhost:${PORT}` (default `3000`)

Authentication: cookie-based (`auth` JWT). Protected endpoints require a valid `auth` cookie.

## Auth
| Method | Path | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/auth/register` | `{ "username": string (3-20), "password": string (>=6), "email": string, "birthdate": YYYY-MM-DD }` | 201 `{ message }` | 400 validation, 409 duplicate, 500 server |
| POST | `/auth/login` | `{ "username": string, "password": string }` | 200 `{ message, username }` + `auth` cookie | 401 invalid creds, 500 server |
| POST | `/auth/logout` | (none) | 200 `{ message }` | 400 not logged in, 500 server |

## User (requires auth)
| Method | Path | Body | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/user` | (none) | 200 `{ user: { id, username, email, birthdate, type, createdat } }` | 401 no/invalid token, 404 not found, 500 server |
| PATCH | `/user/changeinfo` | `{ username?, email?, birthdate? }` | 200 `{ message }` | 400 validation/duplicate, 401 no token, 404 not found, 500 server |
| PATCH | `/user/changepassword` | `{ oldPassword, newPassword, confirmNewPassword }` | 200 `{ message }` | 400 validation/old mismatch, 401 no token, 404 not found, 500 server |
| DELETE | `/user/delete` | (none) | 200 `{ message }` | 401 no token, 404 not found, 500 server |

## Categories (user)
| Method | Path | Body / Params | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/categories/add` | `{ "name": string, "description"?: string }` | 201 `{ message }` | 400 validation/duplicate, 401 no token, 500 server |
| GET | `/categories/list` | (none) | 200 `{ categories: [...] }` | 401 no token, 404 none found, 500 server |
| PATCH | `/categories/edit` | `{ "categoryid": number, "name"?: string, "description"?: string }` | 200 `{ message }` | 400 validation/duplicate, 401 no token, 404 not found, 500 server |
| DELETE | `/categories/delete?categoryid=ID` | query `categoryid` | 200 `{ message }` | 400 invalid id, 401 no token, 404 not found, 500 server |

## Tasks (user)
| Method | Path | Body / Params | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/tasks/add` | `{ category: string, title: string, description?, dueDate: YYYY-MM-DD }` (creates category if needed) | 201 `{ message }` | 400 validation, 401 no token, 500 server |
| GET | `/tasks/list` | (none) | 200 `{ tasks: [{ id, title, description, dueto, iscompleted }] }` | 401 no token, 500 server |
| GET | `/tasks/list/:categoryid` | `categoryid` path param | 200 `{ tasks: [...] }` | 401 no token, 500 server |
| PATCH | `/tasks/edit` | `{ id, title?, description?, dueDate?, isCompleted?, category? }` (id can be in body or query `?id=`) | 200 `{ message }` | 400 validation/invalid id, 401 no token, 404/500 on update fail |
| DELETE | `/tasks/delete?id=` | query `id` | 200 `{ message }` | 400 invalid id, 401 no token, 404/500 on delete fail |

## Admin (requires auth + admin role)
| Method | Path | Body / Params | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/admin/category/add` | `{ name, description?, userid }` | 200 `{ message }` | 400 validation, 401/403 auth, 500 server |
| GET | `/admin/category/list?userid=` | query `userid` | 200 `{ categories: [...] }` | 400 invalid id, 401/403, 500 server |
| PATCH | `/admin/category/edit` | `{ categoryid, name?, description? }` | 200 `{ message }` | 400 validation, 401/403, 500 server |
| DELETE | `/admin/category/delete?categoryid=` | query `categoryid` | 200 `{ message }` | 400 invalid id, 401/403, 500 server |
| POST | `/admin/task/add` | `{ title, description?, duedate: YYYY-MM-DD, categoryid, userid }` | 201 `{ message }` | 400 validation, 401/403, 500 server (FK failures if ids invalid) |
| PATCH | `/admin/task/edit` | `{ taskid, title?, description?, duedate?, iscompleted?, categoryid? }` | 200 `{ message }` | 400 validation, 401/403, 500 server |
| DELETE | `/admin/task/delete?taskid=` | query `taskid` | 200 `{ message }` | 400 invalid id, 401/403, 500 server |
| GET | `/admin/task/list?categoryid=` | query `categoryid` | 200 `{ tasks: [...] }` | 400 invalid id, 401/403, 500 server |
| PATCH | `/admin/user/edit?userid=` | query `userid`; body `{ username?, email?, birthdate?, password? }` | 200 `{ message }` | 400 validation, 401/403, 500 server |
| DELETE | `/admin/user/delete?userid=` | query `userid` | 200 `{ message }` | 400 invalid id, 401/403, 500 server |
| POST | `/admin/user/suspend?userid=` | query `userid` | 200 `{ message }` | 400 invalid id, 401/403, 500 server |
| POST | `/admin/user/reactivate?userid=` | query `userid` | 200 `{ message }` | 400 invalid id, 401/403, 500 server |
| GET | `/admin/user/list` | (none) | 200 `{ users: [...] }` | 401/403, 500 server |
| GET | `/admin/user?userid=` | query `userid` | 200 `{ user }` | 400 invalid id, 401/403, 404 not found, 500 server |

## Notes
- Dates: use `YYYY-MM-DD` (server normalizes inputs to this format).
- Auth cookie: returned by `/auth/login` as `auth` (JWT). Include it for all protected routes.
- Admin routes additionally require the user’s `type` to be `admin` (checked server-side).
- FK constraints: `tasks.userid` and `tasks.categoryid` must reference existing rows.
- Unknown routes return `404 { message: "Nem található" }`.
