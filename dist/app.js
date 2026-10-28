import {decodeJWT} from './decode.js';
const $ = id => document.getElementById(id);
let decoded;
function render(){
  decoded = undefined; $('error').textContent=''; $('claims').replaceChildren();
  for(const key of ['header','payload']) $(key).textContent='{ '+(key==='header'?'algorithm & token type':'claims & token data')+' }';
  document.querySelectorAll('[data-copy]').forEach(b=>b.disabled=true);
  $('status').textContent='WAITING FOR TOKEN';
  if(!$('token').value.trim()) return;
  try{
    decoded=decodeJWT($('token').value);
    for(const key of ['header','payload']) $(key).textContent=JSON.stringify(decoded[key],null,2);
    $('status').textContent='DECODED · UNVERIFIED';
    document.querySelectorAll('[data-copy]').forEach(b=>b.disabled=false);
    for(const key of ['iat','nbf','exp']) if(Object.hasOwn(decoded.payload,key)){
      const row=document.createElement('div');row.className='claim';
      const label=document.createElement('strong');label.textContent=key.toUpperCase();row.append(label);
      const value=decoded.payload[key];const date=new Date(value*1000);
      let text=typeof value==='number'&&Number.isFinite(value)&&!isNaN(date)?date.toISOString()+' · '+date.toLocaleString():'Invalid NumericDate';
      if(key==='exp'&&typeof value==='number'&&!isNaN(date)) text+=' · '+(value<=Date.now()/1000?'Expired':'Not expired');
      if(key==='nbf'&&typeof value==='number'&&!isNaN(date)&&value>Date.now()/1000) text+=' · Not active yet';
      row.append(document.createTextNode(text));$('claims').append(row);
    }
  }catch(error){$('error').textContent=error.message;$('status').textContent='CHECK TOKEN FORMAT';}
}
$('token').addEventListener('input',render);
$('clear').onclick=()=>{$('token').value='';render();$('token').focus();};
$('example').onclick=()=>{const encode=x=>btoa(JSON.stringify(x)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');const now=Math.floor(Date.now()/1000);$('token').value=encode({alg:'HS256',typ:'JWT'})+'.'+encode({sub:'1234567890',name:'Alex Morgan',role:'developer',iat:now,exp:now+3600})+'.ZXhhbXBsZS1zaWduYXR1cmU';render();};
document.querySelectorAll('[data-copy]').forEach(button=>button.onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(decoded[button.dataset.copy],null,2));button.textContent='Copied';}catch{button.textContent='Copy unavailable';}setTimeout(()=>button.textContent='Copy JSON',1500);});
setInterval(()=>{if(decoded)render();},30000);
