# JWT Decoder

A lightweight tool for inspecting JSON Web Tokens directly in your browser.

**[Open JWT Decoder](https://jwt.rigilgilbert.com)**

## Features

- Decode JWT headers and payloads into readable, formatted JSON.
- Accept a raw token or a token prefixed with `Bearer `.
- Decode UTF-8 claims, including Unicode characters.
- Display issued-at (`iat`), not-before (`nbf`), and expiration (`exp`) timestamps.
- Show expiration and not-yet-active indicators.
- Copy decoded header or payload JSON.
- Try a generated example token or clear the input.
- Use a responsive interface on desktop and mobile.

## Usage

1. Open the site and paste a JWT into **Encoded token**.
2. Inspect the decoded header, payload, and any timestamp details.
3. Use **Copy JSON** to copy the header or payload.

The contents update as you type. **Try an example** provides sample data without requiring a real token.

## Privacy and limitations

Token decoding happens on your device. The application does not upload tokens, store them in browser storage, or use analytics. Clipboard copying happens only when you select a copy button.

**Decoding does not verify a signature or establish trust.** The tool does not authenticate users, validate issuers or audiences, or determine whether a server will accept a token. Expiration indicators are informational and depend on your device's clock.

Supported tokens have three dot-separated JWT/JWS parts and JSON-object headers and payloads. Encrypted JWE tokens cannot be decoded by this tool. Unsigned tokens can be inspected, but their contents are not verified.

## Local development

Requires Node.js 22 or newer for tests. The application has no runtime dependencies or build step.

```sh
npm test
```

Serve the `dist/` directory with any static HTTP server, then open the local address in your browser. An HTTP localhost or HTTPS origin supports browser features such as module loading and clipboard access; clipboard availability also depends on browser permissions.

## Project structure

| Path | Purpose |
| --- | --- |
| `dist/index.html` | Page structure |
| `dist/style.css` | Responsive styling |
| `dist/decode.js` | JWT parsing and input validation |
| `dist/app.js` | Interface, timestamp display, and clipboard actions |
| `dist/_headers` | Hosting security headers |
| `tests/decode.test.js` | Decoder tests |
| `.github/workflows/deploy.yml` | Test and deployment workflow |

## Contributing and releases

Propose changes through a pull request. Tests must pass before merging, and the maintainer reviews and manually merges changes in GitHub. Direct pushes to `main` and automatic merging are disabled.

Pull requests run tests only. After an approved change is merged into `main`, the workflow tests it again and deploys the site automatically. Deployment credentials are managed through encrypted repository secrets and must never be committed.

See [AGENTS.md](AGENTS.md) for instructions for coding agents.
