# Knowledge base

Detect stacks from manifests/imports, DB from clients/connection strings, entry points from scripts and route registration. Map config, routes/views, controllers/services and models/repositories.

Audit exact lines for: CRITICAL exposed secrets and arbitrary/string-built SQL; HIGH god modules, weak hashes, missing authorization; MEDIUM N+1 queries, missing validation/error boundary, deprecated APIs (recommend current replacement); LOW magic values and debug/log leakage. Report each as severity, path:line range, evidence, impact and recommendation, sorted by severity.

Target MVC: routes translate HTTP only; controllers/services coordinate use cases; models/repositories own persistence; a config module reads environment values; middleware centralizes errors/auth; a composition root wires dependencies. Transform literals to env vars, concatenated SQL to parameters, MD5/custom hashes to Werkzeug/scrypt/argon2/bcrypt, loops of queries to joins/eager loading, inline validations to validators, scattered catches to error middleware, and obsolete APIs to documented modern equivalents. Validate boot, health and all original endpoints after explicit approval.
