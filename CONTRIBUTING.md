# Contributing

Thanks for helping improve MERN Auth System. Contributions should keep authentication behavior explicit, server authorization strict, and the frontend easy to operate.

## Before You Start

- Check existing issues and pull requests before starting duplicate work.
- For security vulnerabilities, do not open a public issue. Contact the project maintainer privately.
- Keep credentials, `.env` files, database dumps, and private certificates out of commits.

## Development Setup

```bash
cd server
npm install

cd ../client/authapp
npm install
```

Create `server/.env` using the variables documented in the root [README](README.md).

Run the applications in separate terminals:

```bash
# Terminal 1
cd server
npm run server

# Terminal 2
cd client/authapp
npm run dev -- --host 127.0.0.1
```

## Coding Guidelines

- Follow the existing JavaScript and React style.
- Keep frontend API calls in `client/authapp/src/helpers/apiClient.js`.
- Keep reusable UI in `components`, stateful behavior in `hooks`, and route screens in `pages`.
- Validate input at the API boundary.
- Treat server-side authentication and RBAC as authoritative.
- Never return password hashes from an API response.
- Return useful HTTP status codes and `{ success, message }` error bodies.
- Add or update documentation when endpoints, roles, or environment variables change.
- Avoid unrelated formatting or refactoring in feature pull requests.

## Testing Checklist

Run these commands before opening a pull request:

```bash
cd client/authapp
npm run lint
npm run build

cd ../../server
node --check server.js
node --check controllers/authController.js
node --check controllers/userController.js
node --check routes/authRoutes.js
node --check routes/userRoutes.js
```

Manually verify:

- Registration creates a user and sets an HTTP-only cookie.
- Login rejects missing, unknown, and invalid credentials.
- Logout clears the cookie.
- An unauthenticated user cannot access protected pages or `/api/users`.
- A non-Admin user receives `403` from every user CRUD endpoint.
- Admin CRUD requests persist and return the updated records.
- The frontend displays a clear API error and retry action when the server is unavailable.
- CORS accepts configured client origins and rejects unconfigured origins.

## Pull Requests

Pull requests should include:

- A concise description of the behavior changed.
- The API or UI surface affected.
- Tests and commands executed.
- Any environment or migration steps.
- Screenshots for visible frontend changes.

Keep pull requests focused. A reviewer should be able to understand the change without reconstructing unrelated history.

## Commit Messages

Use short, imperative messages. Examples:

```text
Add admin user deletion endpoint
Fix credentialed CORS configuration
Improve login API error state
```

## License

By contributing, you agree that your contribution is provided under the repository's [MIT License](LICENSE).
