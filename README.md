# JWT Decoder

Browser-local JWT decoder for https://jwt.rigilgilbert.com.

Static HTML, CSS and JavaScript. No application dependencies, backend, analytics, local storage or token uploads. Decodes JWT/JWS headers and payloads, accepts a Bearer prefix, displays NumericDate claims, and rejects JWE encrypted tokens. Decoding does not verify the signature or validate trust.

## Development

Use Node.js 22 or newer. Run `npm test`. Serve `dist/` with any static HTTP server.

## Hosting and continuous deployment

Cloudflare Pages project: `rigil-jwt`; production branch: `main`; published directory: `dist`.

The GitHub Actions workflow tests every push to main and every pull request. Pull requests run tests only. Every push to main, including a merged pull request, deploys automatically after tests pass. Rigil must review and approve changes in GitHub before they enter main. Agents must create pull requests and leave approval and merging to Rigil. CODEOWNERS names @rigilg for all files. The repository is public so GitHub can enforce main branch protection: required pull requests, one approval, required code owner review, stale approval dismissal, passing tests, and no administrator bypass. Direct pushes, force pushes and deletion of main are prohibited. GitHub does not allow a PR author to approve their own PR; use a separate contributor account for agent-authored pull requests so @rigilg can review them. Set the repository Actions secret `CLOUDFLARE_API_TOKEN` to a Cloudflare token scoped to this account with Account / Cloudflare Pages / Edit permission. The account ID is already configured in the workflow. Do not commit credentials.

At Porkbun, create a CNAME record: host `jwt`, answer `rigil-jwt.pages.dev`. The custom domain is registered with Cloudflare Pages; HTTPS activates after DNS validation.

An initial deployment can be performed with `npx wrangler@4 pages deploy dist --project-name=rigil-jwt --branch=main` using the same account and token environment variables.
