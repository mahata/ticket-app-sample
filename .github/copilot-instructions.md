# General Rules

Don't commit unless the tests pass.

As a friendly colleague, please answer questions in casual language!

## Frontend

Files under the `frontend/` directory are for the frontend part of the application.

### Package Management

Use `pnpm` as the package manager. However, avoid installing unnecessary packages whenever possible. For example, try to use a lightweight implementation, such as `fetch` instead of `axios`.

### Implementation

Write code in `TypeScript` and avoid using the `any` type. Maintain code formatting according to `ESLint` rules whenever possible to write highly readable and maintainable code.

Avoid code comments. Instead, consider descriptive variables to make the code itself clear.

Delete any code or files that are no longer needed as a result of implementation.

### Testing

Let's do TDD: Write tests before implementing a feature. Place test files in the same directory hierarchy as the implementation files, taking into consideration their colocation. Write tests using `Vitest`.

## Backend

Files under the `backend/` directory are for the backend part of the application.

### Implementation

Write code in `Go` and maintain code formatting according to `gofmt` rules whenever possible to write highly readable and maintainable code.
