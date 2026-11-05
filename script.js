// ---------- Data ----------
const EVENTS = [
  {id:1,img:"images/event-1.svg",feat:true,name:"CodeSprint 24h Hackathon",cat:"Tech",date:"2026-11-21T09:00",venue:"Innovation Lab, Block C",icon:"💻",c:["#4a3ee0","#8f86ff"],desc:"Team up, pick a problem and build a working prototype overnight.",long:"Teams of up to four choose a problem statement on the morning of the event, build through the night and present to a panel of mentors. Meals are provided and the top three teams win prizes."},
  {id:2,img:"images/event-2.svg",feat:false,name:"Intro to UI Design Workshop",cat:"Workshop",date:"2026-11-14T14:00",venue:"Seminar Hall 2",icon:"🎨",c:["#ff6b6b","#ffc933"],desc:"Learn layout, colour and typography by redesigning a real page in Figma.",long:"Bring a laptop. You will redesign a real landing page from scratch and leave with a portfolio-ready case study."},
  {id:3,hero:true,img:"images/event-3.svg",feat:true,name:"Winter Acoustic Night",cat:"Music",date:"2026-12-05T18:30",venue:"Open Air Amphitheatre",icon:"🎸",c:["#0f9d8a","#7be0c3"],desc:"Student bands and solo singers perform live in the open air.",long:"Doors open at 6 pm. Performances run until 10 pm. Bring a jacket, a friend and your favourite song requests."},
  {id:4,img:"images/event-4.svg",feat:true,name:"Startup Founders Talk",cat:"Talks",date:"2026-11-28T11:00",venue:"Main Auditorium",icon:"🚀",c:["#f2994a","#ffd37a"],desc:"Three young founders talk about early mistakes and what they learned.",long:"A 90-minute panel followed by open Q&A and networking. Great for anyone thinking about starting something."},
  {id:5,img:"images/event-5.svg",feat:false,name:"Inter-College Quiz League",cat:"Competition",date:"2026-12-12T10:00",venue:"Library Conference Room",icon:"🧠",c:["#6a4cff","#c5b8ff"],desc:"General knowledge, science and pop culture rounds in teams of three.",long:"Preliminary written round followed by a buzzer final on stage. Certificates for all finalists."},
  {id:6,img:"images/event-6.svg",feat:false,name:"Photography Walk: Old Town",cat:"Workshop",date:"2026-11-09T06:30",venue:"Meet at Main Gate",icon:"📷",c:["#3a86ff","#9ad0ff"],desc:"Golden-hour street photography with a professional guide.",long:"A relaxed two-hour walk covering composition, light and candid portraits. Phone cameras are welcome."},
  {id:7,img:"images/event-7.svg",feat:false,name:"AI in Everyday Life",cat:"Talks",date:"2026-12-18T15:00",venue:"Room 301, CS Block",icon:"🤖",c:["#e5389b","#ffa0d2"],desc:"A beginner-friendly talk on how AI tools are used in study and work.",long:"Live demos, honest limits and a Q&A. No technical background needed."},
  {id:8,img:"images/event-8.svg",feat:false,name:"Cultural Fest Dance Battle",cat:"Competition",date:"2027-01-10T17:00",venue:"Sports Complex Stage",icon:"💃",c:["#d62839","#ff9aa2"],desc:"Solo and crew categories across freestyle and choreographed rounds.",long:"Judged on technique, energy and stage presence. Register as a participant or come to cheer."}
];
const $ = s => document.querySelector(s);
const KEY = "eventify-regs";
let cat = "All", term = "", current = null;

// ---------- Helpers ----------
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
const fmt = d => new Date(d).toLocaleString("en-IN",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit"});
const art = e => `<div class="art" style="background:linear-gradient(135deg,${e.c[0]},${e.c[1]})"><span class="fb">${e.icon}</span><img src="${e.img}" alt="${e.name} illustration" loading="lazy" onerror="this.remove()"><em>${e.cat}</em>${e.feat?'<em class="star">★ Featured</em>':''}</div>`;
const upcoming = () => EVENTS.filter(e => new Date(e.date) > new Date()).sort((a,b) => new Date(a.date)-new Date(b.date));

// ---------- Event grid ----------
function renderChips(){
  const em = {All:"✨",Tech:"💻",Workshop:"🛠️",Music:"🎵",Talks:"🎤",Competition:"🏆"};
  const cats = ["All",...new Set(EVENTS.map(e => e.cat))];
  $("#chips").innerHTML = cats.map(c => `<button class="chip" aria-pressed="${c===cat}" data-c="${c}">${em[c]||""} ${c}</button>`).join("");
}
function cardHTML(e){return `<button class="card" data-id="${e.id}" style="--c:${e.c[0]}">${art(e)}<div class="body"><span class="meta">📅 ${fmt(e.date)}</span><span class="cd" data-d="${e.date}"></span><h3>${e.name}</h3><p class="venue">📍 ${e.venue}</p><p>${e.desc}</p></div></button>`;}
function renderFeatured(){$("#fgrid").innerHTML = upcoming().filter(e => e.feat).slice(0,3).map(cardHTML).join("");}
function cardTimers(){document.querySelectorAll(".cd").forEach(el=>{let s=Math.max(0,Math.floor((new Date(el.dataset.d)-new Date())/1000));const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);el.textContent="⏳ Starts in "+(d?d+"d ":"")+h+"h "+m+"m";});}
function renderGrid(){
  const list = upcoming().filter(e => (cat==="All"||e.cat===cat) && (e.name+e.venue+e.desc+e.cat).toLowerCase().includes(term));
  $("#grid").innerHTML = list.map(cardHTML).join(""); cardTimers();
  $("#empty").hidden = list.length > 0;
}
$("#chips").onclick = e => { const c = e.target.dataset.c; if(c){cat=c;renderChips();renderGrid();} };
$("#search").oninput = e => { term = e.target.value.trim().toLowerCase(); renderGrid(); };
document.addEventListener("click", e => { const c = e.target.closest(".card"); if(c) openEvent(+c.dataset.id); });

// ---------- Hero countdown ----------
function tick(){
  cardTimers();
  const n = upcoming().find(e => e.hero) || upcoming()[0]; if(!n) return;
  $("#nextName").textContent = n.name;
  $("#nextMeta").textContent = fmt(n.date)+" · "+n.venue;
  $("#nextBtn").onclick = () => openEvent(n.id);
  let s = Math.max(0,Math.floor((new Date(n.date)-new Date())/1000));
  const p = [["days",86400],["hrs",3600],["min",60],["sec",1]].map(([l,v]) => { const x=Math.floor(s/v); s%=v; return `<div>${String(x).padStart(2,"0")}<small>${l}</small></div>`; });
  $("#clock").innerHTML = p.join("");
}
tick(); setInterval(tick,1000);

// ---------- Modal + form ----------
const modal = $("#modal"), form = $("#form");
function openEvent(id){
  current = EVENTS.find(e => e.id===id);
  $("#detail").innerHTML = `${art(current)}<div class="body"><h2>${current.name}</h2><ul><li>📅 ${fmt(current.date)}</li><li>📍 ${current.venue}</li></ul><p>${current.long}</p></div>`;
  form.elements.event.innerHTML = upcoming().map(e => `<option value="${e.id}" ${e.id===id?"selected":""}>${e.name}</option>`).join("");
  form.reset(); form.elements.event.value = id; clearErrors();
  form.hidden = false; $("#done").hidden = true;
  modal.showModal();
}
$("#close").onclick = () => modal.close();
modal.onclick = e => { if(e.target===modal) modal.close(); };
form.elements.event.onchange = e => openEvent(+e.target.value);

function clearErrors(){ form.querySelectorAll("small").forEach(s => s.textContent=""); form.querySelectorAll(".bad").forEach(i => i.classList.remove("bad")); }
function validate(){
  const f = form.elements, v = {name:f.name.value.trim(),email:f.email.value.trim(),phone:f.phone.value.replace(/[\s-]/g,""),event:f.event.value};
  const err = {};
  if(!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(v.name)) err.name = "Enter your full name using letters only (2–50 characters).";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) err.email = "Enter a valid email, like name@example.com.";
  if(!/^(\+91)?[6-9]\d{9}$/.test(v.phone)) err.phone = "Enter a 10-digit mobile number starting with 6–9.";
  if(!v.event) err.event = "Choose an event.";
  else if(load().some(r => r.eventId==v.event && r.email.toLowerCase()===v.email.toLowerCase())) err.email = "This email is already registered for the event.";
  return {v,err};
}
form.onsubmit = e => {
  e.preventDefault(); clearErrors();
  const {v,err} = validate();
  Object.entries(err).forEach(([k,m]) => { form.elements[k].classList.add("bad"); form.elements[k].parentElement.querySelector("small").textContent = m; });
  if(Object.keys(err).length){ form.querySelector(".bad").focus(); return; }
  const ev = EVENTS.find(x => x.id==v.event);
  save([...load(),{id:Date.now(),eventId:ev.id,name:v.name,email:v.email,phone:v.phone}]);
  form.hidden = true; $("#done").hidden = false;
  $("#done").innerHTML = `<div class="tick">✓</div><h3>You’re registered, ${v.name.split(" ")[0]}!</h3><p class="muted">${ev.name}<br>${fmt(ev.date)} · ${ev.venue}<br>A confirmation will be sent to ${v.email}.</p><button class="btn" onclick="modal.close()">Done</button>`;
  renderRegs();
};

// ---------- My registrations ----------
function renderRegs(){
  const r = load();
  $("#count").textContent = r.length;
  $("#regs").innerHTML = r.map(x => { const e = EVENTS.find(y => y.id===x.eventId); return `<li><span><b>${e.name}</b><br><span class="muted">${x.name} · ${x.email} · ${fmt(e.date)}</span></span><button data-id="${x.id}">Cancel</button></li>`; }).join("");
}
$("#regs").onclick = e => { const id = e.target.dataset.id; if(id){ save(load().filter(r => r.id!=id)); renderRegs(); } };

// ---------- Theme ----------
const root = document.documentElement;
let saved = null; try { saved = localStorage.getItem("eventify-theme"); } catch {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
$("#theme").onclick = () => { root.dataset.theme = root.dataset.theme==="dark" ? "light" : "dark"; try{localStorage.setItem("eventify-theme",root.dataset.theme);}catch{} };

renderChips(); renderFeatured(); renderGrid(); renderRegs(); cardTimers();
