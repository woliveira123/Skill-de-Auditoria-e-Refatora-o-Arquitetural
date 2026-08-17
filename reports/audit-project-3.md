# Architecture Audit Report - Project 3

Project: task-manager-api | Stack: Python + Flask + SQLAlchemy | Files analyzed: 13

## Summary
CRITICAL: 2 | HIGH: 1 | MEDIUM: 2 | LOW: 1

### [CRITICAL] Hardcoded application secret
File: `task-manager-api/app.py:11-13`  
Recommendation: load `SECRET_KEY` from environment and exclude `.env` from Git.

### [CRITICAL] SMTP credentials embedded in service
File: `task-manager-api/services/notification_service.py:8-12`  
Recommendation: load SMTP settings from environment/secret store and rotate them.

### [HIGH] MD5 password hashing and password serialization
File: `task-manager-api/models/user.py:16-32`  
Recommendation: use Werkzeug password hashes and never return `password` in `to_dict`.

### [MEDIUM] Deprecated SQLAlchemy query API
File: `task-manager-api/routes/report_routes.py:105`  
Evidence: `Query.get` is legacy in SQLAlchemy 2.x.  
Recommendation: use `db.session.get(User, user_id)`.

### [MEDIUM] N+1 user productivity report
File: `task-manager-api/routes/report_routes.py:53-68`  
Recommendation: aggregate tasks by user in one query.

### [LOW] Broad bare exception handlers
File: `task-manager-api/routes/report_routes.py:182-188`  
Recommendation: catch expected DB errors and centralize error responses.
