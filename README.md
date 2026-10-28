# JWT Decoder

Browser-local JWT decoder for https://jwt.rigilgilbert.com.

Static HTML, CSS and JavaScript. No application dependencies, backend, analytics, local storage or token uploads. Decodes JWT/JWS headers and payloads, accepts a Bearer prefix, displays NumericDate claims, and rejects JWE encrypted tokens. Decoding does not verify the signature or validate trust.

## Development

Use Node.js 22 or newer. Run `npm test`. Serve `dist/` with any static HTTP server.

## Hosting and continuous deployment

Cloudflare Pages project: `rigil-jwt`; production branch: `main`; published directory: `dist`.

The GitHub Actions workflow tests every push to main and every pull request. Pull requests run tests only. Every push to main, including a merged pull request, deploys automatically after tests pass. Rigil reviews each pull request in GitHub and personally clicks Merge when ready. That merge is the approval step for this solo workflow; a separate approving review is not required. Agents must work on feature branches, open pull requests and leave merging to Rigil. Main requires a pull request, passing tests and an up-to-date branch, with no administrator bypass. Direct pushes, force pushes and deletion of main are prohibited. Auto-merge stays disabled. CODEOWNERS identifies @rigilg without requiring self-review. Set the repository Actions secret `CLOUDFLARE_API_TOKEN` to a Cloudflare token scoped to this account with Account / Cloudflare Pages / Edit permission. The account ID is already configured in the workflow. Do not commit credentials.

At Porkbun, create a CNAME record: host `jwt`, answer `rigil-jwt.pages.dev`. The custom domain is registered with Cloudflare Pages; HTTPS activates after DNS validation.

An initial deployment can be performed with `npx wrangler@4 pages deploy dist --project-name=rigil-jwt --branch=main` using the same account and token environment variables.
