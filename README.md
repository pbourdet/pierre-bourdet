## Installation

(requires Docker & docker compose)
```
git clone https://github.com/pbourdet/pierre-bourdet.git
cd pierre-bourdet/
make up
```
The React app is up at  https://localhost:3000
The REST API is exposed at https://localhost

## Test

Set up the test database by running `make database-test`.

```
make back-test
make front-test
```
will run test on both front-end and back-end.

## Lint

```
make eslint
make code-check
```
will run linter on both front-end and back-end.
