export function decodeJWT(input) {
  const token = input.trim().replace(/^Bearer\s+/i, '');
  const parts = token.split('.');
  if (parts.length === 5) throw new Error('This is an encrypted JWE. Its contents cannot be decoded without a decryption key.');
  if (parts.length !== 3) throw new Error('A JWT must contain three dot-separated parts.');
  const parse = (part, name) => {
    if (!part || !/^[A-Za-z0-9_-]+$/.test(part) || part.length % 4 === 1) throw new Error(`${name} is not valid base64url.`);
    try {
      const bytes = Uint8Array.from(atob(part.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4-part.length%4)%4)), c => c.charCodeAt(0));
      const value = JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(bytes));
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
      return value;
    } catch { throw new Error(`${name} must decode to a UTF-8 JSON object.`); }
  };
  if (!/^[A-Za-z0-9_-]*$/.test(parts[2]) || parts[2].length % 4 === 1) throw new Error('Signature is not valid base64url.');
  return {header:parse(parts[0], 'Header'), payload:parse(parts[1], 'Payload'), signature:parts[2]};
}
