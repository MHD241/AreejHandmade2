/* Areej Handmade — shared account code (loaded by index.html and account.html).
   Supabase Auth + data over REST, no library. Session lives in this browser (localStorage).
   Also holds the discount codes, so the shop and the account page always agree. */
const REVIEWS_CFG={url:"https://wnfchmkddbooqnuqipsd.supabase.co",key:"sb_publishable_VyJBkZLWcCAJJ046398-4A_h91b0xaW"};

/* DISCOUNT CODES. To change one, edit it here. type: "percent" (value = % off) or "fixed" (value = £ off). Only one code can be used per order.
   min = minimum basket subtotal in £ (before discount). Codes are not case-sensitive.
   member:true = only works when the customer is logged in to an account. */
const COUPONS={
  WELCOME10:{type:"percent",value:10,min:0,label:"10% off your order"},
  THANKYOU5:{type:"fixed",value:5,min:30,label:"£5 off orders over £30"},
  HOOP15:{type:"percent",value:15,min:60,label:"15% off orders over £60"},
  FAMILY20:{type:"percent",value:20,min:100,label:"20% off orders over £100"},
  MEMBER10:{type:"percent",value:10,min:0,member:true,label:"10% off for account members"},
  MEMBERPLUS:{type:"fixed",value:8,min:40,member:true,label:"£8 off orders over £40 for account members"}
};

const SESSION_KEY="areejSession",CART_KEY="areejAppleCart",WISH_KEY="areejWishlist";
let session=null,wishlist=[],myOrders=[],syncTimer=null;
const acEsc=t=>String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const accountsOn=()=>/^https:\/\/.+\.supabase\.co/.test(REVIEWS_CFG.url)&&!!REVIEWS_CFG.key;
const authHeaders=tok=>({apikey:REVIEWS_CFG.key,Authorization:"Bearer "+(tok||REVIEWS_CFG.key),"Content-Type":"application/json"});
const acNotify=()=>window.dispatchEvent(new Event("areej-account"));
function readCart(){try{const c=JSON.parse(localStorage.getItem(CART_KEY)||"[]");return Array.isArray(c)?c:[]}catch(e){return[]}}
function saveSession(x){session=x;try{x?localStorage.setItem(SESSION_KEY,JSON.stringify(x)):localStorage.removeItem(SESSION_KEY)}catch(e){}}
function toSession(d){return d&&d.access_token?{access_token:d.access_token,refresh_token:d.refresh_token,expires_at:d.expires_at||Math.floor(Date.now()/1000)+(d.expires_in||3600),user:d.user}:null}
function userName(){const u=session&&session.user;return u?((u.user_metadata&&u.user_metadata.name)||(u.email||"").split("@")[0]):""}
async function authCall(path,body,method,tok){const r=await fetch(REVIEWS_CFG.url+path,{method:method||"POST",headers:authHeaders(tok),body:body?JSON.stringify(body):undefined});let d={};try{d=await r.json()}catch(e){}if(!r.ok)throw new Error(d.msg||d.error_description||d.message||"Something went wrong. Please try again.");return d}
async function freshToken(){if(!session)return null;if(session.expires_at-60>Date.now()/1000)return session.access_token;try{const d=await authCall("/auth/v1/token?grant_type=refresh_token",{refresh_token:session.refresh_token});saveSession(toSession(d));return session.access_token}catch(e){saveSession(null);acNotify();return null}}
async function db(path,opts){const tok=await freshToken();if(!tok)throw new Error("Please log in again.");const r=await fetch(REVIEWS_CFG.url+"/rest/v1/"+path,{...opts,headers:{...authHeaders(tok),...((opts&&opts.headers)||{})}});if(!r.ok)throw new Error("Could not reach your account data.");return r}

/* wishlist: array of {id,name,img,price}; works for guests too (kept in this browser) */
const isFav=id=>wishlist.some(x=>x.id===id);
function saveWishlistLocal(){try{localStorage.setItem(WISH_KEY,JSON.stringify(wishlist))}catch(e){}}
function toggleFavItem(item){const on=!isFav(item.id);wishlist=on?[{id:item.id,name:String(item.name).slice(0,120),img:String(item.img||"").slice(0,300),price:Number(item.price)||0},...wishlist].slice(0,100):wishlist.filter(x=>x.id!==item.id);saveWishlistLocal();syncUp();acNotify();return on}
function syncUp(){if(!session)return;clearTimeout(syncTimer);syncTimer=setTimeout(async()=>{try{await db("user_data?on_conflict=user_id",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({user_id:session.user.id,wishlist:wishlist.slice(0,100),basket:readCart().slice(0,50),updated_at:new Date().toISOString()})})}catch(e){}},900)}
async function pullAccount(){if(!session)return false;try{const r=await db("user_data?select=wishlist,basket&user_id=eq."+session.user.id),d=(await r.json())[0];if(d){const seen=new Set(wishlist.map(x=>x.id));(Array.isArray(d.wishlist)?d.wishlist:[]).forEach(x=>{if(x&&x.id&&!seen.has(x.id)){seen.add(x.id);wishlist.push(x)}});wishlist=wishlist.slice(0,100);saveWishlistLocal();if(!readCart().length&&Array.isArray(d.basket)&&d.basket.length){try{localStorage.setItem(CART_KEY,JSON.stringify(d.basket))}catch(e){}}}const o=await db("orders?select=id,created_at,items,total,code&order=created_at.desc&limit=30");myOrders=await o.json();syncUp();acNotify();return true}catch(e){return false}}
function logOrder(o){if(!session)return;db("orders",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify(o)}).then(()=>{myOrders.unshift({created_at:new Date().toISOString(),items:o.items,total:o.total,code:o.code});acNotify()}).catch(()=>{})}

const redirectTo=()=>/^https?:/.test(location.protocol)?"?redirect_to="+encodeURIComponent(location.origin+"/account.html"):"";
async function acSignUp(name,email,pass){const d=await authCall("/auth/v1/signup"+redirectTo(),{email,password:pass,data:{name}});const s=toSession(d);if(s){saveSession(s);await pullAccount();acNotify();return"in"}return"confirm"}
async function acLogIn(email,pass){const d=await authCall("/auth/v1/token?grant_type=password",{email,password:pass});saveSession(toSession(d));await pullAccount();acNotify()}
async function acReset(email){await authCall("/auth/v1/recover"+redirectTo(),{email})}
async function acUpdate(fields){const tok=await freshToken();const u=await authCall("/auth/v1/user",fields,"PUT",tok);if(session){session.user=u;saveSession(session)}acNotify()}
function acLogOut(){const tok=session&&session.access_token;saveSession(null);wishlist=[];myOrders=[];try{localStorage.removeItem(WISH_KEY)}catch(e){}if(tok)fetch(REVIEWS_CFG.url+"/auth/v1/logout",{method:"POST",headers:authHeaders(tok)}).catch(()=>{});acNotify()}
/* Email-confirmation and password-reset links arrive with the login in the URL after "#". */
async function acHandleHash(){const raw=location.hash.slice(1);if(!/access_token=|error_description=/.test(raw))return null;const p=new URLSearchParams(raw);history.replaceState(null,"",location.pathname+location.search);if(p.get("error_description"))return{error:(p.get("error_description")||"").replace(/\+/g," ")};try{const tok=p.get("access_token"),u=await authCall("/auth/v1/user",null,"GET",tok);saveSession({access_token:tok,refresh_token:p.get("refresh_token"),expires_at:Number(p.get("expires_at"))||Math.floor(Date.now()/1000)+(Number(p.get("expires_in"))||3600),user:u});await pullAccount();acNotify();return{type:p.get("type")||"signup"}}catch(e){return{error:"That link has expired. Please request a new one."}}}
function initAccounts(){try{session=JSON.parse(localStorage.getItem(SESSION_KEY)||"null")}catch(e){session=null}try{const w=JSON.parse(localStorage.getItem(WISH_KEY)||"[]");wishlist=Array.isArray(w)?w.filter(x=>x&&typeof x==="object"&&x.id):[]}catch(e){wishlist=[]}}
initAccounts();
