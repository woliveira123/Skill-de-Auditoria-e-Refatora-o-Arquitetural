# Anti-pattern catalog

| Severity | Pattern | Detection signal | Recommendation |
|---|---|---|---|
| CRITICAL | Exposed secret | key/password/token literal or response/log | use environment variables; rotate exposed value |
| CRITICAL | SQL injection/admin SQL | string-built query or public arbitrary SQL endpoint | parameterize and remove/admin-authorize endpoint |
| HIGH | God module/controller | routes, persistence, business rules and formatting together | split route, controller/service and repository/model |
| HIGH | Weak password hashing | MD5, SHA1, reversible/custom hash | use framework password hashing or scrypt/argon2/bcrypt |
| HIGH | Broken authorization | destructive/sensitive route has no identity/role check | authenticate and authorize server-side |
| MEDIUM | N+1 queries | query inside iteration over entities | join/eager load or aggregate query |
| MEDIUM | Missing validation/error boundary | unvalidated request data or repeated broad catch | validate input and centralize error translation |
| MEDIUM | Deprecated API | deprecated framework/ORM method such as `Query.get` | use documented current equivalent (`db.session.get`) |
| LOW | Magic values | repeated statuses, ports, limits | named constants/config |
| LOW | Debug/log leakage | debug enabled or sensitive/verbose logs | environment-controlled logging and redaction |

Classify by impact, not merely a keyword match. Include line ranges and a modern replacement for deprecated APIs.
