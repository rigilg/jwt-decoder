import test from 'node:test';
import assert from 'node:assert/strict';
import {decodeJWT} from '../dist/decode.js';
const enc=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
test('decodes Unicode and Bearer prefix',()=>{const result=decodeJWT(` Bearer ${enc({alg:'HS256'})}.${enc({name:'你好 🌍',exp:0})}.YWJj `);assert.equal(result.payload.name,'你好 🌍');assert.equal(result.payload.exp,0);});
test('rejects malformed tokens and encrypted tokens',()=>{for(const token of ['x','a.b.c.d.e',`${enc([])}.${enc({})}.`,`${enc({})}.!.`,`${enc({})}.${enc({})}.a`]) assert.throws(()=>decodeJWT(token));});
test('supports unsigned tokens without implying verification',()=>assert.equal(decodeJWT(`${enc({alg:'none'})}.${enc({})}.`).signature,''));
