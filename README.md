# JWT Decoder

Private, browser-local JWT decoder for https://jwt.rigilgilbert.com.

Static HTML, CSS and JavaScript. No application dependencies, backend, analytics, local storage or token uploads. Decodes JWT/JWS headers and payloads, accepts a Bearer prefix, displays NumericDate claims, and rejects JWE encrypted tokens. Decoding does not verify the signature or validate trust.

## Development

Use Node.js 22 or newer. Run `npm test`. Serve `dist/` with any static HTTP server.

## Hosting and continuous deployment

Cloudflare Pages project: `rigil-jwt`; production branch: `main`; published directory: `dist`.

The GitHub Actions workflow tests every push to main and every pull request. Passing main builds deploy immediately to Pages. Set the repository Actions secret `CLOUDFLARE_API_TOKEN` to a Cloudflare token scoped to this account with Account / Cloudflare Pages / Edit permission. The account ID is already configured in the workflow. Do not commit credentials.

At Porkbun, create a CNAME record: host `jwt`, answer `rigil-jwt.pages.dev`. The custom domain is registered with Cloudflare Pages; HTTPS activates after DNS validation.

An initial deployment can be performed with `npx wrangler@4 pages deploy dist --project-name=rigil-jwt --branch=main` using the same account and token environment variables.
