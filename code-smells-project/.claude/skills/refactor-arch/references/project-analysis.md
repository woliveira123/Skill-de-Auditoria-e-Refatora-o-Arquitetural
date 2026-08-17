# Project analysis heuristics

Detect Python from `requirements*.txt`, `pyproject.toml` and `.py`; Node from `package.json` and `.js/.ts`. Detect Flask/Express from imports and framework dependencies. Identify DBs from ORM initialization, connection strings, SQL clients and migrations. Find entry points from package scripts, `__main__`, `app.run`, `listen`, or WSGI exports. Map each source file to composition/config, route/view, controller/service, model/repository, middleware/error handling, and tests. Infer the domain from entity names and endpoint nouns.

Print: language, framework/version, dependencies, domain, architecture, source-file count, entities/tables and entry point. Count only source files, not generated dependencies.
