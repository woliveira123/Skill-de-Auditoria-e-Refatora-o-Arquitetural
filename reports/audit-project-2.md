# Architecture Audit Report - Project 2

Project: ecommerce-api-legacy | Stack: Node.js + Express + SQLite | Files analyzed: 3

## Summary
CRITICAL: 1 | HIGH: 2 | MEDIUM: 2 | LOW: 1

### [CRITICAL] Production-like credentials hardcoded in source
File: `ecommerce-api-legacy/src/utils.js:1-8`  
Evidence: DB, SMTP and payment gateway values were literals.  
Recommendation: environment configuration and rotation of exposed values.

### [HIGH] Insecure custom password hashing
File: `ecommerce-api-legacy/src/utils.js:19-25`  
Evidence: deterministic base64 fragments were used as a password hash.  
Recommendation: use scrypt/argon2/bcrypt with a per-password salt.

### [HIGH] Checkout controller is a God method
File: `ecommerce-api-legacy/src/AppManager.js:20-79`  
Recommendation: separate route, checkout service, payment gateway adapter and repositories.

### [MEDIUM] N+1 report queries
File: `ecommerce-api-legacy/src/AppManager.js:91-127`  
Recommendation: use joined/aggregated SQL in a report repository.

### [MEDIUM] Delete leaves orphaned records
File: `ecommerce-api-legacy/src/AppManager.js:135-140`  
Recommendation: enforce foreign keys and transactional delete policy.

### [LOW] Ambiguous request field names
File: `ecommerce-api-legacy/src/AppManager.js:22-26`  
Recommendation: validate a named checkout DTO.

## Validação da Fase 3

Dependências instaladas com `npm ci`. A aplicação iniciou com `node src/app.js` e `GET /api/admin/financial-report` respondeu HTTP 200.
