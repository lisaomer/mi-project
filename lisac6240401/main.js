(function () {

/* ================= DATA ================= */
const data = {
  name: "Aisha Omer",
  id: "C6240401",
  email: "lisaomer8@gmail.com",
  phone: "0618480933",
  skills: ["HTML","CSS","JavaScript","Web Design"],
  image: "in.jpeg",
  links: [
    {title:"Weather App",url:"https://github.com/dev-aniketj/WeatherApp-Android.git"},
    {title:"Online Bookstore",url:"https://github.com/shashirajraja/onlinebookstore.git"}
  ]
};

const app = document.getElementById("app") || document.body;

/* ================= HELPER ================= */
function el(tag,attrs={},...children){
  const e=document.createElement(tag);
  for(let k in attrs){
    if(k==="style") Object.assign(e.style,attrs[k]);
    else if(k.startsWith("on")) e[k]=attrs[k];
    else e.setAttribute(k,attrs[k]);
  }
  children.forEach(c=>{
    if(typeof c==="string") e.appendChild(document.createTextNode(c));
    else if(c) e.appendChild(c);
  });
  return e;
}

/* ================= BASE STYLE ================= */
app.style.cssText=`
  margin:0;
  min-height:100vh;
  font-family:Arial;
  background:#f4f6f8;
`;

/* ================= NAV ================= */
function Header(){
  const nav=el("nav",{style:{
    display:"flex",
    justifyContent:"center",
    gap:"20px",
    background:"#111",
    padding:"15px"
  }});
  ["home","about","service","contact"].forEach(id=>{
    const a=el("a",{href:"#",onclick:e=>{
      e.preventDefault();show(id);setActive(a);
    },style:{
      color:"#ff66a3",
      textDecoration:"none",
      fontWeight:"bold",
      padding:"6px 12px",
      borderRadius:"6px"
    }},id.toUpperCase());
    nav.appendChild(a);
  });
  return nav;
}
function setActive(a){
  document.querySelectorAll("nav a").forEach(x=>{
    x.style.background="transparent";
    x.style.color="#ff66a3";
  });
  a.style.background="#ff66a3";
  a.style.color="#fff";
}
function show(id){
  document.querySelectorAll("section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

/* ================= HOME ================= */
const home=el("section",{id:"home",style:{
  textAlign:"center",
  padding:"100px 20px"
}},
el("h1",{style:{color:"#ff66a3"}},"Welcome"),
el("p",{},"Pure JavaScript Portfolio")
);

/* ================= ABOUT ================= */
const about=el("section",{id:"about",style:{display:"none",padding:"40px"}},
el("div",{style:{
  maxWidth:"400px",
  margin:"auto",
  background:"#fff",
  padding:"30px",
  borderRadius:"15px",
  textAlign:"center",
  boxShadow:"0 10px 30px rgba(0,0,0,.1)"
}},
el("img",{src:data.image,style:{
  width:"150px",height:"150px",
  borderRadius:"50%",
  border:"4px solid #ff66a3"
}}),
el("h2",{style:{color:"#ff66a3"}},data.name),
el("p",{},"ID: "+data.id),
el("p",{},"Email: "+data.email),
el("p",{},"Phone: "+data.phone),
el("p",{},"Skills: "+data.skills.join(", ")),
el("h3",{},"Projects"),
...data.links.map(l=>el("a",{href:l.url,target:"_blank",style:{
  display:"block",
  margin:"8px",
  padding:"8px",
  background:"#f4f4f4",
  borderRadius:"6px",
  textDecoration:"none"
}},l.title))
)
);

/* ================= SERVICE ================= */
function makeExamples(title,arr){
  return el("div",{style:{marginBottom:"40px"}},
    el("h3",{style:{color:"#ff66a3"}},title),
    ...arr.map((f,i)=>{
      const out=el("div",{style:{
        background:"#000",color:"#0f0",
        padding:"10px",marginTop:"5px"
      }},"Output...");
      f._out=out; // Save reference for Run All
      f._btn=el("button",{onclick:()=>out.textContent=f(),style:{
        background:"#ff66a3",
        border:"none",
        color:"#fff",
        padding:"6px 12px",
        borderRadius:"5px",
        marginBottom:"5px"
      }},"RUN");
      return el("div",{style:{
        background:"#fff",
        padding:"15px",
        borderRadius:"10px",
        marginBottom:"10px"
      }},
        el("p",{},"Example "+(i+1)),
        f._btn,
        out
      );
    })
  );
}

const objEx=[...Array(15)].map((_,i)=>()=>`Object Example ${i+1}`);
const domEx=[...Array(15)].map((_,i)=>()=>`DOM Example ${i+1}`);
const evtEx=[...Array(15)].map((_,i)=>()=>`Event Example ${i+1}`);

const runAllBtn=el("button",{onclick:()=>{
  objEx.forEach(f=>f._out.textContent=f());
  domEx.forEach(f=>f._out.textContent=f());
  evtEx.forEach(f=>f._out.textContent=f());
},style:{
  background:"#111",
  color:"#ff66a3",
  padding:"10px 15px",
  border:"none",
  borderRadius:"6px",
  margin:"20px auto",
  display:"block",
  cursor:"pointer"
}},"RUN ALL EXAMPLES");

const service=el("section",{id:"service",style:{display:"none",padding:"30px"}},
el("h2",{style:{textAlign:"center"}},"JavaScript Service"),
makeExamples("Chapter 1 – Object",objEx),
makeExamples("Chapter 2 – DOM",domEx),
makeExamples("Chapter 3 – Event",evtEx),
runAllBtn
);

/* ================= CONTACT ================= */
const contact=el("section",{id:"contact",style:{display:"none",padding:"50px"}},
el("form",{onsubmit:e=>{
  e.preventDefault();
  alert("Message Sent!");
  e.target.reset();
},style:{
  maxWidth:"350px",
  margin:"auto",
  background:"#fff",
  padding:"30px",
  borderRadius:"15px"
}},
el("h2",{style:{color:"#ff66a3",textAlign:"center"}},"Contact"),
el("input",{placeholder:"Name",required:true,style:input()}),
el("input",{placeholder:"Email",type:"email",required:true,style:input()}),
el("textarea",{placeholder:"Message",required:true,style:{...input(),height:"80px"}}),
el("button",{style:{
  width:"100%",
  background:"#ff66a3",
  border:"none",
  padding:"10px",
  color:"#fff",
  borderRadius:"8px"
}},"SEND")
)
);

function input(){
  return {width:"100%",margin:"8px 0",padding:"8px",borderRadius:"6px"};
}

/* ================= INIT ================= */
app.innerHTML="";
app.append(Header(),home,about,service,contact);
show("home");
setActive(document.querySelector("nav a"));

})();