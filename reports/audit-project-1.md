# Architecture Audit Report - Project 1

Project: code-smells-project | Stack: Python + Flask | Files analyzed: 4

## Summary
CRITICAL: 3 | HIGH: 1 | MEDIUM: 2 | LOW: 1

### [CRITICAL] Hardcoded secret exposed by health endpoint
File: `code-smells-project/controllers.py:264-290`  
Evidence: the response returned the configured secret and debug flag.  
Recommendation: remove secret fields from responses and load configuration from environment.

### [CRITICAL] Arbitrary SQL execution endpoint
File: `code-smells-project/app.py:59-78`  
Evidence: client-supplied SQL was passed directly to `cursor.execute`.  
Recommendation: remove the endpoint; privileged maintenance must not accept raw SQL over HTTP.

### [CRITICAL] SQL injection in persistence functions
File: `code-smells-project/models.py:24-50`  
Evidence: SQL is assembled by concatenating request-derived values.  
Recommendation: use bound SQLite parameters in repository/model methods.

### [HIGH] God controller mixes HTTP, validation, orchestration and notifications
File: `code-smells-project/controllers.py:24-262`  
Recommendation: keep request adapters thin and move use cases/notifications to services.

### [MEDIUM] Repeated inline validation and error translation
File: `code-smells-project/controllers.py:24-109`  
Recommendation: introduce request validators and centralized Flask error handling.

### [MEDIUM] Debug mode enabled in source
File: `code-smells-project/app.py:6-9`  
Recommendation: use environment-based configuration with production-safe defaults.

### [LOW] Sensitive operational details logged and returned
File: `code-smells-project/controllers.py:208-210`  
Recommendation: use structured, redacted logging.
