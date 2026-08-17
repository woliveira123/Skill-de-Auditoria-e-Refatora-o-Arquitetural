# MVC target and refactoring playbook

Models/repositories own persistence and entity rules. Views/routes only translate HTTP. Controllers/services coordinate use cases. The entry point is a composition root; config is environment-driven; middleware centralizes errors/auth.

1. **Hardcoded config**: `key='x'` -> `key=os.environ['KEY']`/`process.env.KEY` with `.env.example`.
2. **God route**: route with SQL/business logic -> thin route calling a controller/service.
3. **String SQL**: concatenation -> placeholders and bound parameters.
4. **Weak hash**: MD5/custom -> Werkzeug `generate_password_hash` or Node `crypto.scrypt`.
5. **N+1**: loop query -> join/eager load/aggregate repository method.
6. **Repeated validation**: inline branches -> request validator returning typed/sanitized input.
7. **Scattered errors**: per-handler broad catch -> domain errors plus centralized error middleware.
8. **Deprecated API**: old ORM/framework call -> current documented API with equivalent test.

For every transformation preserve route/method/status/body unless the old behavior is an exploitable endpoint. Add tests/requests for happy path, validation failure and authorization where applicable.
