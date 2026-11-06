/* ---------- EDIT THIS ---------- */
const CFG={name:'Ahmed',photos:[ 'img 1.jpg','img 2.jpg','img 3.jpg','img 4.jpg' ],from:'Someone who adores you',captions:['Chapter 1: The legend begins','Chapter 2: Questionable haircut era','Chapter 3: Peak main character','Chapter 4: This year’s plot twist']};
/* ------------------------------- */
const $=id=>document.getElementById(id),rnd=(a,b)=>a+Math.random()*(b-a);
/* mobile detection: lighter effects on phones */
const MOB=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||Math.min(innerWidth,innerHeight)<600;
const COLS=['#ff5d8f','#ffb938','#4fd1c5','#9d7bff','#ff7a59'],BCOL=['#e63e78','#f2a01f','#17a99b','#7a56ee','#f2603f'];
const HEART=c=>'<svg viewBox="0 0 24 22"><path d="M12 21C-6 8 4-3 12 5C20-3 30 8 12 21Z" fill="'+c+'"/></svg>';
const BALL=c=>'<svg viewBox="0 0 24 36"><ellipse cx="12" cy="12" rx="10" ry="12" fill="'+c+'"/><path d="M12 24l-2.5 3.5h5z" fill="'+c+'"/><path d="M12 27.5q-3 4 0 8" stroke="#fff" stroke-opacity=".6" fill="none"/><ellipse cx="8" cy="8" rx="2.3" ry="4" fill="#fff" fill-opacity=".35"/></svg>';

/* hearts + balloons drifting up behind everything (fewer + single tween each) */
function floaty(){const bg=$('bg');if(document.hidden||bg.children.length>(MOB?12:34))return;const e=document.createElement('i'),h=Math.random()<.55,c=COLS[Math.floor(Math.random()*5)];
  e.className='fl';e.innerHTML=h?HEART(c):BALL(c);e.style.cssText='left:'+rnd(0,96)+'vw;width:'+rnd(18,46)+'px;opacity:'+rnd(.25,.5);bg.appendChild(e);
  gsap.to(e,{y:-(innerHeight+140),x:rnd(-40,40),duration:rnd(7,13),ease:'none',onComplete:()=>e.remove()})}
setInterval(floaty,MOB?800:420);

/* three.js */
const cv=$('gl');
const renderer=new THREE.WebGLRenderer({canvas:cv,antialias:!MOB,alpha:true,powerPreference:'high-performance',precision:MOB?'mediump':'highp'});
renderer.setPixelRatio(Math.min(devicePixelRatio,MOB?1.5:2));renderer.localClippingEnabled=true;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);let bz=14.5;const cz={o:0};let lw=0,lh=0;
scene.add(new THREE.AmbientLight(0xffffff,.85));
const key=new THREE.DirectionalLight(0xffffff,.8);key.position.set(4,6,8);scene.add(key);
const rim=new THREE.PointLight(0x9d7bff,1.2,40);rim.position.set(-6,-2,5);scene.add(rim);
function resize(){const w=innerWidth,h=innerHeight;if(w===lw&&h===lh)return;lw=w;lh=h;renderer.setSize(w,h,false);cam.aspect=w/h;bz=Math.max(13.5,7.25/cam.aspect);cam.position.set(0,0,bz+cz.o);cam.updateProjectionMatrix();if(typeof st!=='undefined'&&st===0&&!started){layoutBow();drawBow()}}

/* balloon bouquet: strings meet at one ribbon, labels always readable */
const LAB1=['Happy','Birthday',CFG.name,'💖','🎉','🎂','✨'],LAB2=['Stay','Happy',CFG.name,'💖','🎁','🌟','🥳'];
const BP=[[-1.5,2.7,0,1],[1.5,3,-.3,1],[0,.7,1.2,1.15],[-2.4,.2,-.5,.85],[2.4,.4,-.5,.85],[-1.1,-1.4,.3,.8],[1.2,-1.3,.3,.8]];
const ANCH=new THREE.Vector3(0,-4.2,0);
const TS=MOB?.5:1; /* label texture scale */
function labTex(word){const c=document.createElement('canvas');c.width=1024*TS;c.height=580*TS;const x=c.getContext('2d');x.textAlign='center';x.textBaseline='middle';
  let fs=(word.length>2?210:240)*TS;const f=()=>x.font=fs+'px "Bagel Fat One",sans-serif';f();while(x.measureText(word).width>880*TS&&fs>40*TS){fs-=6*TS;f()}
  x.lineJoin='round';x.lineWidth=28*TS;x.strokeStyle='rgba(40,6,66,.78)';x.strokeText(word,512*TS,300*TS);x.fillStyle='#fff';x.fillText(word,512*TS,300*TS);return new THREE.CanvasTexture(c)}
const balloons=new THREE.Group(),BAL=[],bodies=[];scene.add(balloons);
const SEG=MOB?24:40,SPH=new THREE.SphereGeometry(1,SEG,SEG),LABG=new THREE.CylinderGeometry(1.012,1.012,.85,24,1,true,-.75,1.5),KNOTG=new THREE.ConeGeometry(.14,.22,12);
function makeBalloons(){BP.forEach((p,i)=>{const col=BCOL[i%5],g=new THREE.Group();
  const body=new THREE.Mesh(SPH,new THREE.MeshPhongMaterial({color:col,shininess:70,specular:0x888888}));body.scale.set(1,1.22,1);
  const lab=new THREE.Mesh(LABG,new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide}));lab.position.y=.15;
  const knot=new THREE.Mesh(KNOTG,new THREE.MeshPhongMaterial({color:col}));knot.position.y=-1.3;knot.rotation.x=Math.PI;
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({length:13},()=>new THREE.Vector3())),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.6}));line.frustumCulled=false;
  g.add(body,lab,knot);g.userData={bx:p[0],x:p[0],y:p[1],z:p[2],bs:p[3],s:p[3],r:0,popped:false,col:col,g:g,lab:lab,line:line};body.userData.g=g;balloons.add(g,line);BAL.push(g);bodies.push(body)});
  const rb=new THREE.Mesh(new THREE.SphereGeometry(.2,16,16),new THREE.MeshPhongMaterial({color:0xffc94d,shininess:100}));rb.position.copy(ANCH);balloons.add(rb)}

/* cake (materials + geometries shared so there is far less GPU work) */
const cutPlanes=[new THREE.Plane(new THREE.Vector3(0,1,0),1000),new THREE.Plane(new THREE.Vector3(0,1,0),1000)];
const cake=new THREE.Group();scene.add(cake);const flames=[];
const MC={};
const M=(c,m=0)=>MC[c+'_'+m]||(MC[c+'_'+m]=new THREE.MeshStandardMaterial({color:c,roughness:.45,metalness:m,clippingPlanes:cutPlanes,clipIntersection:true}));
function cyl(r,h,y,c){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,48),M(c));o.position.y=y;cake.add(o)}
function ring(r,y){const o=new THREE.Mesh(new THREE.TorusGeometry(r,.14,12,48),M(0xffffff));o.rotation.x=Math.PI/2;o.position.y=y;cake.add(o)}
function nameTex(){const c=document.createElement('canvas');c.width=2048;c.height=256;const x=c.getContext('2d');
  x.fillStyle='#ffe3b3';x.fillRect(0,0,2048,256);x.fillStyle='#f0a9c2';x.fillRect(0,0,2048,22);x.fillRect(0,234,2048,22);x.fillStyle='#e0b45e';x.fillRect(0,26,2048,4);x.fillRect(0,226,2048,4);
  x.save();x.translate(1024,132);x.scale(1.44,1);x.textAlign='center';x.textBaseline='middle';x.font='104px "Bagel Fat One",sans-serif';x.fillStyle='#c2386b';x.fillText('✦ '+CFG.name+' ✦',0,0);x.restore();
  const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;t.offset.x=.5;return t}
const nameMat=new THREE.MeshStandardMaterial({map:nameTex(),roughness:.5,clippingPlanes:cutPlanes,clipIntersection:true});
{const pl=new THREE.Mesh(new THREE.CylinderGeometry(2.9,2.9,.14,64),new THREE.MeshStandardMaterial({color:0xe0b45e,roughness:.35,metalness:.6}));pl.position.y=-1.55;cake.add(pl)}
const tier=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,1.2,64),[nameMat,M(0xffe3b3),M(0xffe3b3)]);tier.position.y=-.9;cake.add(tier);
ring(2.2,-.3);cyl(1.55,1,.2,0xff8fb1);ring(1.55,.7);
const SC=[0xff5d8f,0xffb938,0x4fd1c5,0x9d7bff,0xffffff];
const DRG=new THREE.SphereGeometry(.13,MOB?8:12,MOB?8:12),BDG=new THREE.SphereGeometry(.19,MOB?10:14,MOB?10:14),SPG=new THREE.CylinderGeometry(.025,.025,.14,6);
function drips(r,y,n){for(let i=0;i<n;i++){const a=i/n*Math.PI*2,d=new THREE.Mesh(DRG,M(0xffffff));d.scale.y=rnd(1.6,3);d.position.set(Math.cos(a)*r,y-.13*d.scale.y+.04,Math.sin(a)*r);cake.add(d)}}
drips(2.2,-.3,22);drips(1.55,.7,16);
for(let i=0;i<22;i++){const a=i/22*Math.PI*2,b=new THREE.Mesh(BDG,M(i%2?0xff8fb1:0xffffff));b.position.set(Math.cos(a)*2.3,-1.3,Math.sin(a)*2.3);cake.add(b)}
for(let i=0;i<(MOB?32:46);i++){const a=rnd(0,6.28),r=Math.sqrt(Math.random())*1.35,s=new THREE.Mesh(SPG,M(SC[i%5]));s.position.set(Math.cos(a)*r,.74,Math.sin(a)*r);s.rotation.set(Math.PI/2,0,rnd(0,3));cake.add(s)}
for(let i=0;i<6;i++){const a=i/6*Math.PI*2,cx=Math.cos(a)*.9,cz2=Math.sin(a)*.9;
  const c=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.85,12),M([0x4fd1c5,0xffffff,0x9d7bff,0xffb938,0xffffff,0xff5d8f][i]));c.position.set(cx,1.12,cz2);cake.add(c);
  const f=new THREE.Mesh(new THREE.SphereGeometry(.13,16,16),new THREE.MeshBasicMaterial({color:0xffd36b}));f.scale.y=1.7;f.position.set(cx,1.68,cz2);cake.add(f);flames.push(f)}
const cherry=new THREE.Mesh(new THREE.SphereGeometry(.24,20,20),new THREE.MeshStandardMaterial({color:0xd7193f,roughness:.2}));cherry.position.set(0,.95,0);cake.add(cherry);
const spk=new THREE.Points(new THREE.BufferGeometry().setFromPoints(Array.from({length:70},()=>new THREE.Vector3().setFromSphericalCoords(rnd(3.4,4.6),rnd(.5,2.6),rnd(0,6.28)))),new THREE.PointsMaterial({color:0xffd36b,size:.11}));cake.add(spk);
const glow=new THREE.PointLight(0xffb347,2,9);glow.position.set(0,2.4,1);cake.add(glow);
cake.rotation.x=.4;cake.position.y=-.3;

/* slice + cut walls */
const PSI0=40*Math.PI/180,PSI1=75*Math.PI/180,PSIM=(PSI0+PSI1)/2,cs={k:1,r:0,cut:false};let ph=0,cl=6,lock=0;
const lp=[new THREE.Plane(new THREE.Vector3(-Math.cos(PSI0),0,Math.sin(PSI0)),0),new THREE.Plane(new THREE.Vector3(Math.cos(PSI1),0,-Math.sin(PSI1)),0)];
function updClip(){cake.updateMatrixWorld(true);cutPlanes[0].copy(lp[0]).applyMatrix4(cake.matrixWorld);cutPlanes[1].copy(lp[1]).applyMatrix4(cake.matrixWorld)}
const slice=new THREE.Group(),walls=new THREE.Group();slice.visible=walls.visible=false;cake.add(slice,walls);
function pie(R,h,y,c){const s=new THREE.Shape(),a0=PSI0-Math.PI/2,a1=PSI1-Math.PI/2;s.moveTo(0,0);s.lineTo(R*Math.cos(a0),R*Math.sin(a0));s.absarc(0,0,R,a0,a1,false);s.lineTo(0,0);
  const g=new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:false,curveSegments:14});g.rotateX(-Math.PI/2);const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:c,roughness:.5,side:THREE.DoubleSide}));m.position.y=y;slice.add(m)}
pie(2.2,1.2,-1.5,0xffe3b3);pie(1.55,1,-.3,0xff8fb1);pie(1.55,.12,.7,0xffffff);
function wall(p,R,h,y,c){const m=new THREE.Mesh(new THREE.PlaneGeometry(R,h),new THREE.MeshStandardMaterial({color:c,roughness:.6,side:THREE.DoubleSide}));m.rotation.y=p-Math.PI/2;m.position.set(Math.sin(p)*R/2,y,Math.cos(p)*R/2);walls.add(m)}
[PSI0,PSI1].forEach(p=>{wall(p,2.2,1.2,-.9,0xf6dba8);wall(p,1.55,1,.2,0xffb3c8)});

/* kitchen knife: handle toward the viewer, blade pointing at the cake */
const K=new THREE.Group(),Kp=new THREE.Group(),kp={tx:0,ty:0,tz:0,yaw:-.9,pitch:-.05},KL=2.78*1.1;
{const bs=new THREE.Shape();bs.moveTo(.27,0);bs.lineTo(.27,2.1);bs.quadraticCurveTo(.24,2.62,-.02,2.78);bs.bezierCurveTo(-.24,2.1,-.3,1.2,-.27,.12);bs.lineTo(-.27,0);bs.lineTo(.27,0);
  const bg=new THREE.ExtrudeGeometry(bs,{depth:.05,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:1,curveSegments:20});bg.translate(0,0,-.025);
  const blade=new THREE.Mesh(bg,new THREE.MeshPhongMaterial({color:0xe3e9f1,shininess:120,specular:0xffffff}));
  const bol=new THREE.Mesh(new THREE.BoxGeometry(.58,.14,.11),new THREE.MeshPhongMaterial({color:0xc9d1dc,shininess:90}));bol.position.y=.02;
  const hd=new THREE.Mesh(new THREE.CylinderGeometry(.19,.17,1.3,16),new THREE.MeshPhongMaterial({color:0x26232c,shininess:50}));hd.scale.z=.55;hd.position.y=-.7;
  const kh=new THREE.Mesh(new THREE.BoxGeometry(2.2,4.8,1.6),new THREE.MeshBasicMaterial({visible:false}));kh.position.y=.7;
  K.add(blade,bol,hd,kh);
  const RG=new THREE.SphereGeometry(.045,10,10),RM=new THREE.MeshPhongMaterial({color:0xffc94d,shininess:100});
  [-.3,-.7,-1.1].forEach(y=>[1,-1].forEach(s=>{const r=new THREE.Mesh(RG,RM);r.position.set(0,y,s*.1);K.add(r)}))}
K.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,-1),new THREE.Vector3(-1,0,0)));
Kp.rotation.order='YXZ';Kp.add(K);Kp.scale.setScalar(1.1);Kp.visible=false;scene.add(Kp);
const _kd=new THREE.Vector3(),_ke=new THREE.Euler(0,0,0,'YXZ');
function applyK(){_ke.set(kp.pitch,kp.yaw,0,'YXZ');_kd.set(0,0,-1).applyEuler(_ke);Kp.rotation.set(kp.pitch,kp.yaw,0);Kp.position.set(kp.tx-_kd.x*KL,kp.ty-_kd.y*KL,kp.tz-_kd.z*KL)}

/* effects */
const shards=[],TG=new THREE.TetrahedronGeometry(.13);
function burst(g){const u=g.userData;for(let i=0;i<(MOB?14:24);i++){const m=new THREE.Mesh(TG,new THREE.MeshBasicMaterial({color:i%4?u.col:0xffffff,transparent:true}));
  m.position.copy(g.position);scene.add(m);shards.push({m,l:1,v:new THREE.Vector3((Math.random()-.5)*9,(Math.random()-.2)*8,(Math.random()-.5)*9)})}}
function boom(x,y,t){const e=document.createElement('span');e.className='boom';e.textContent=t||'POP!';e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  gsap.fromTo(e,{scale:.4,opacity:1,rotation:-10},{scale:1.5,opacity:0,y:-40,rotation:8,duration:.7,onComplete:()=>e.remove()})}
function confetti(){const n=MOB?30:70;for(let i=0;i<n;i++){const e=document.createElement('i');e.className='cf';e.style.cssText='left:'+Math.random()*100+'vw;background:'+COLS[i%5];document.body.appendChild(e);
  gsap.fromTo(e,{y:-20,rotation:0},{y:innerHeight+40,x:(Math.random()-.5)*160,rotation:Math.random()*720,duration:2+Math.random()*2,ease:'none',delay:Math.random()*.4,onComplete:()=>e.remove()})}}
function fw(x,y){const n=MOB?16:30;for(let i=0;i<n;i++){const e=document.createElement('i');e.className='fwd';e.style.cssText='left:'+x+'px;top:'+y+'px;background:'+COLS[i%5];document.body.appendChild(e);
  const a=i/n*6.28,d=rnd(60,150);gsap.fromTo(e,{scale:1,opacity:1},{x:Math.cos(a)*d,y:Math.sin(a)*d+30,scale:0,opacity:0,duration:rnd(.9,1.4),ease:'power2.out',onComplete:()=>e.remove()})}}
function heartBurst(x,y,n){n=n||14;if(MOB)n=Math.min(n,Math.ceil(n*.6));for(let i=0;i<n;i++){const e=document.createElement('i');e.className='hb';e.innerHTML=HEART(COLS[i%5]);e.style.left=x+'px';e.style.top=y+'px';document.body.appendChild(e);
  const a=i/n*6.28+rnd(-.2,.2),d=rnd(70,170);gsap.fromTo(e,{scale:.3,opacity:1},{x:Math.cos(a)*d,y:Math.sin(a)*d-40,scale:rnd(.8,1.5),opacity:0,duration:1.1,ease:'power2.out',onComplete:()=>e.remove()})}}
const _sv=new THREE.Vector3();
function scr(o){o.getWorldPosition(_sv);_sv.project(cam);return[(_sv.x+1)/2*innerWidth,(1-_sv.y)/2*innerHeight]}
function nameSpans(el,txt){el.innerHTML='';[...txt].forEach(ch=>{const s=document.createElement('span');s.textContent=ch;el.appendChild(s)});el.style.fontSize=Math.min(innerWidth*.17,innerWidth*.9/(txt.length*.62))+'px'}

/* stage controller: 0 intro, 1 balloons, 2 cake, 3 party, 4 photos, 5 quiz, 6 curtain, 7 final balloons, 8 end */
let st=-1,left=7,started=false;
const IDS=['uI','u0','u2','u5','u1','uQ','uR','u0','uE'];
function go(n){st=n;const id=IDS[n];document.querySelectorAll('.st').forEach(e=>e.style.display=e.id===id?'flex':'none');
  cv.style.visibility=(n===1||n===2||n===3||n===7)?'visible':'hidden';balloons.visible=n===1||n===7;cake.visible=n===2||n===3;
  /* stop the endless deco tweens when the bunting is not shown (they used to keep running) */
  if(n<3||n>5){gsap.killTweensOf('#deco .fo,#deco .flag');}
  if(n<3)$('deco').innerHTML='';gsap.to('#deco',{opacity:(n>=3&&n<=5)?1:0,duration:.6});
  gsap.fromTo('#'+id,{opacity:0},{opacity:1,duration:.6});[enterIntro,()=>enterBalloons(0),enterCake,enterParty,enterCards,enterQuiz,enterReveal,()=>enterBalloons(1),enterEnd][n]()}
addEventListener('resize',resize);

/* 0 intro: pull the bow, hit the heart */
const bw={cx:0,cy:0,hx:0,hy:0,th:0,pull:0,sc:1};let drag=null;
function layoutBow(){const w=innerWidth,h=innerHeight;$('bowSvg').setAttribute('viewBox','0 0 '+w+' '+h);
  bw.sc=Math.min(1.25,Math.max(.8,Math.min(w,h)/420));bw.cx=Math.max(78*bw.sc,w*.2);bw.cy=h-Math.max(150,h*.19);
  const r=$('heartBox').getBoundingClientRect();bw.hx=r.left+r.width/2;bw.hy=r.top+r.height/2;bw.th=Math.atan2(bw.hy-bw.cy,bw.hx-bw.cx);
  const hd=$('hand');hd.style.left=(bw.cx-Math.cos(bw.th)*18*bw.sc-10)+'px';hd.style.top=(bw.cy-Math.sin(bw.th)*18*bw.sc-4)+'px'}
function drawBow(ho){const s=bw.sc,c=Math.cos(bw.th),d=Math.sin(bw.th),u=[c,d],n=[-d,c],H=66*s,L=120*s,B=[bw.cx,bw.cy];
  const pt=(o,v,k)=>[o[0]+v[0]*k,o[1]+v[1]*k],base=pt(B,u,-18*s);
  const T1=pt(base,n,H),T2=pt(base,n,-H),Pc=pt(B,u,44*s),N=pt(B,u,-(18*s+bw.pull*s)),head=ho||pt(N,u,L),tail=ho?pt(ho,u,-L):N;
  const set=(id,o)=>{const e=$(id);for(const k in o)e.setAttribute(k,o[k])};
  set('bowA',{d:'M'+T1+' Q'+Pc+' '+T2});set('bowB',{d:'M'+T1+' Q'+Pc+' '+T2});set('str',{d:'M'+T1+' L'+N+' L'+T2});
  const sh=pt(head,u,-8);set('shaft',{x1:tail[0],y1:tail[1],x2:sh[0],y2:sh[1]});
  const hb=pt(head,u,-16);set('head',{d:'M'+head+' L'+pt(hb,n,6)+' L'+pt(hb,n,-6)+'Z'});
  set('fl1',{d:'M'+tail+' L'+pt(pt(tail,u,22),n,9)+' L'+pt(tail,u,30)+'Z'});set('fl2',{d:'M'+tail+' L'+pt(pt(tail,u,22),n,-9)+' L'+pt(tail,u,30)+'Z'});
  set('aim',{x1:head[0],y1:head[1],x2:bw.hx,y2:bw.hy})}
function buildBow(){$('bowSvg').innerHTML='<defs><linearGradient id="bwg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd36b"/><stop offset="1" stop-color="#b8651b"/></linearGradient></defs>'
  +'<line id="aim" stroke="#ffe9a8" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round" opacity="0"/>'
  +'<path id="bowA" fill="none" stroke="url(#bwg)" stroke-width="8" stroke-linecap="round"/><path id="bowB" fill="none" stroke="#fff3c4" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>'
  +'<path id="str" fill="none" stroke="#f5efe0" stroke-width="2"/><line id="shaft" stroke="#e8c98c" stroke-width="4" stroke-linecap="round"/>'
  +'<path id="head" fill="#dfe6ee" stroke="#9aa6b5" stroke-width="1"/><path id="fl1" fill="#ff5d8f"/><path id="fl2" fill="#4fd1c5"/>'}
function enterIntro(){started=false;drag=null;bw.pull=0;gsap.set('#heartBox',{clearProps:'all'});gsap.set('#bowSvg',{opacity:1});gsap.set('#iHint,#iTop',{opacity:1});
  $('iHint').textContent='Pull the bow back and aim for the heart';gsap.set('#i1,#i2',{opacity:0,scale:1});nameSpans($('iName'),CFG.name.toUpperCase());gsap.set('#iName span',{opacity:0});
  $('htName').textContent=CFG.name.toUpperCase();buildBow();layoutBow();drawBow();$('hand').style.display='block'}
$('uI').addEventListener('pointerdown',e=>{if(st!==0||started)return;drag={x:e.clientX,y:e.clientY};$('uI').setPointerCapture(e.pointerId);$('hand').style.display='none'});
$('uI').addEventListener('pointermove',e=>{if(!drag)return;bw.pull=Math.min(Math.hypot(e.clientX-drag.x,e.clientY-drag.y),130);
  $('aim').setAttribute('opacity',bw.pull>12?.6:0);$('iHint').textContent=bw.pull>45?'Release!':'Keep pulling…';drawBow()});
function endDrag(){if(!drag)return;drag=null;if(bw.pull>45){fire()}else{$('iHint').textContent='Pull the bow back and aim for the heart';gsap.to(bw,{pull:0,duration:.4,ease:'elastic.out(1,.5)',onUpdate:()=>drawBow()});$('aim').setAttribute('opacity',0)}}
$('uI').addEventListener('pointerup',endDrag);$('uI').addEventListener('pointercancel',endDrag);
function fire(){started=true;$('aim').setAttribute('opacity',0);gsap.to('#iHint',{opacity:0,duration:.2});
  const s=bw.sc,u=[Math.cos(bw.th),Math.sin(bw.th)],L=120*s,sh=[bw.cx-u[0]*(18*s+bw.pull*s)+u[0]*L,bw.cy-u[1]*(18*s+bw.pull*s)+u[1]*L],o={t:0};
  gsap.to(bw,{pull:0,duration:.15,ease:'power3.out'});
  gsap.to(o,{t:1,duration:.5,ease:'power1.in',onUpdate:()=>drawBow([sh[0]+(bw.hx-sh[0])*o.t,sh[1]+(bw.hy-sh[1])*o.t]),onComplete:hit})}
function hit(){const x=bw.hx,y=bw.hy,w=innerWidth,h=innerHeight;
  gsap.timeline().to('#heartBox',{scale:1.18,duration:.12}).add(()=>{heartBurst(x,y,30);fw(x,y);confetti()}).to('#heartBox',{scale:0,opacity:0,duration:.2}).to('#bowSvg',{opacity:0,duration:.5},'<').to('#iTop',{opacity:0,duration:.3},'<')
   .fromTo('#i1',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.7,ease:'back.out(2)'})
   .fromTo('#iName span',{y:90,rotationX:-90,opacity:0},{y:0,rotationX:0,opacity:1,stagger:.14,duration:.7,ease:'back.out(2)'},'<.3')
   .add(()=>{fw(w*.3,h*.3);fw(w*.72,h*.28);fw(w/2,h*.65)}).fromTo('#i2',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.7,ease:'back.out(2)'})
   .to('#uI',{opacity:0,duration:.7},'+=1.8').add(()=>go(1))}

/* 1 + 7 balloons */
function enterBalloons(fin){const W=fin?LAB2:LAB1,hw=bz*.414*cam.aspect*.92,kx=Math.min(1,hw/3.3),kb=Math.min(1,kx+.12);
  left=BAL.length;$('left').textContent=left;
  BAL.forEach((g,i)=>{const u=g.userData;if(u.lab.material.map)u.lab.material.map.dispose();u.lab.material.map=labTex(W[i]);u.lab.material.needsUpdate=true;u.popped=false;u.r=0;u.x=u.bx*kx;u.s=u.bs*kb;g.visible=true;u.line.visible=true;g.scale.setScalar(.01);
    gsap.to(g.scale,{x:u.s,y:u.s,z:u.s,duration:.9,delay:i*.12,ease:'back.out(1.6)'});gsap.to(u,{r:1,duration:1.5,delay:i*.12,ease:'power3.out'})})}
function pop(g,e){const u=g.userData;if(u.popped)return;u.popped=true;u.line.visible=false;
  gsap.to(g.scale,{x:u.s*1.3,y:u.s*1.3,z:u.s*1.3,duration:.1,onComplete:()=>g.visible=false});burst(g);boom(e.clientX,e.clientY);
  $('left').textContent=--left;if(!left){const fin=st===7;setTimeout(()=>{confetti();go(fin?8:2)},1100)}}

/* 2 cake: candles, knife, cut */
function enterCake(){ph=0;cl=6;cs.k=1;cs.r=0;cs.cut=false;cz.o=0;cutPlanes.forEach(p=>p.set(new THREE.Vector3(0,1,0),1000));walls.visible=slice.visible=false;slice.position.set(0,0,0);
  gsap.killTweensOf(kp);gsap.killTweensOf(Kp.scale);Kp.visible=false;Kp.scale.setScalar(1.1);
  const hw=(bz-4)*.414*cam.aspect;Object.assign(kp,{tx:Math.max(.9,3.5-(hw-.3)),ty:-3.3,tz:1.2,yaw:-.9,pitch:-.05});applyK();
  flames.forEach(f=>f.scale.set(1,1.7,1));$('cakeH').textContent='Don’t blow — just tap!';$('cakeS').textContent='Tap every candle on the cake · 6 left';mkBadges();
  cake.scale.setScalar(.01);gsap.to(cake.scale,{x:1,y:1,z:1,duration:1,ease:'back.out(1.5)'})}
function mkBadges(){document.querySelectorAll('.tapb').forEach(e=>e.remove());flames.forEach(f=>{const b=document.createElement('span');b.className='tapb';b.textContent='TAP';b._d='none';document.body.appendChild(b);f.userData.b=b})}
function showKnife(){ph=1;gsap.to(glow,{intensity:0,duration:.6});$('cakeH').textContent='Time to cut!';$('cakeS').textContent='Pick the knife';Kp.visible=true;
  const x0=kp.tx;gsap.fromTo(kp,{tx:x0-5},{tx:x0,duration:.8,ease:'back.out(1.3)'});gsap.to(kp,{ty:-3.05,yoyo:true,repeat:-1,duration:.7,ease:'sine.inOut',delay:.8})}
function pickKnife(){if(ph!==1)return;lock=Date.now();ph=2;gsap.killTweensOf(kp);$('cakeS').textContent='Click the knife';
  gsap.to(cs,{k:0,r:-PSIM,duration:1.1,ease:'power2.inOut'});gsap.to(kp,{tx:-.3,ty:.9,tz:1.3,yaw:-.3,pitch:-.5,duration:1,ease:'power2.inOut'})}
function doCut(){if(ph!==2||Date.now()-lock<900)return;ph=3;$('cakeS').textContent='';
  const tl=gsap.timeline({defaults:{ease:'power2.inOut'}});
  tl.to(cz,{o:-2.4,duration:1.3})
    .to(kp,{ty:-.35,tz:.95,pitch:-.62,duration:.85},0.2)
    .to(kp,{ty:.9,tz:1.3,pitch:-.5,duration:.55})
    .to(kp,{tx:.35,duration:.5})
    .to(kp,{ty:-.35,tz:.95,pitch:-.62,duration:.85})
    .add(()=>{cs.cut=true;updClip();walls.visible=true;slice.visible=true;boom(innerWidth/2,innerHeight*.45,'SLICE!');$('cakeH').textContent='Perfect cut!'})
    .to(kp,{tx:.9,ty:2.8,tz:2.6,duration:.7,ease:'power2.in'})
    .to(slice.position,{x:Math.sin(PSIM)*1.9,y:.45,z:Math.cos(PSIM)*1.9,duration:1.4,ease:'power3.out'},'<')
    .to(cz,{o:0,duration:1.3},'<+.2')
    .add(()=>{confetti();gsap.to(Kp.scale,{x:0,y:0,z:0,duration:.3})}).add(()=>go(3),'+=1')}
const hr=new THREE.Raycaster(),hv=new THREE.Vector2(),_nk=new THREE.Vector3();
function nearK(e){_nk.set(0,.8,0);K.localToWorld(_nk);_nk.project(cam);return Math.hypot((_nk.x+1)/2*innerWidth-e.clientX,(1-_nk.y)/2*innerHeight-e.clientY)<130}
function cakeTap(e){hv.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);hr.setFromCamera(hv,cam);
  if(ph===0){let bi=-1,bd=62;flames.forEach((f,i)=>{if(f.scale.x===0)return;const p=scr(f),d=Math.hypot(p[0]-e.clientX,p[1]-e.clientY);if(d<bd){bd=d;bi=i}});if(bi<0)return;
    gsap.to(flames[bi].scale,{x:0,y:0,z:0,duration:.2});boom(e.clientX,e.clientY,'puff');cl--;$('cakeS').textContent=cl?'Tap every candle on the cake · '+cl+' left':'';
    if(!cl)setTimeout(()=>{confetti();showKnife()},900)}
  else if(ph===1){if(hr.intersectObject(Kp,true)[0]||nearK(e))pickKnife()}
  else if(ph===2){if(hr.intersectObject(Kp,true)[0]||nearK(e))doCut()}}
$('cakeS').onclick=()=>{if(ph===1)pickKnife();else if(ph===2)doCut()};

/* 3 party: balloons, stickers, bunting, foil fringe */
function deco(){const d=$('deco'),W=innerWidth;gsap.killTweensOf('#deco .fo,#deco .flag');d.innerHTML='';
  const step=MOB?16:9,nf=Math.ceil(W/step);for(let i=0;i<nf;i++){const f=document.createElement('i');f.className='fo';f.style.left=i*step+'px';if(MOB)f.style.width='10px';f.style.height=rnd(26,60)+'px';f.style.background='linear-gradient(180deg,'+['#ffd36b','#ff8fb1','#b79bff'][i%3]+','+['#ff5d8f','#ffb938','#9d7bff'][i%3]+')';d.appendChild(f)}
  [[20,40],[46,28]].forEach((r,ri)=>{const oy=r[0],sag=r[1],n=Math.ceil(W/42);
    d.insertAdjacentHTML('beforeend','<svg width="'+W+'" height="'+(oy+sag+20)+'" style="position:absolute;left:0;top:0"><path d="M0 '+(oy+6)+' Q'+W/2+' '+(oy+6+sag*2)+' '+W+' '+(oy+6)+'" stroke="#ffe9a8" stroke-width="2" fill="none" opacity=".85"/></svg>');
    for(let i=0;i<n;i++){const t=(i+.5)/n,f=document.createElement('i');f.className='flag';f.style.left=(W*t-17)+'px';f.style.top=(oy+6+4*sag*t*(1-t))+'px';f.style.background=COLS[(i+ri*2)%5];d.appendChild(f)}});
  gsap.from('#deco .fo',{scaleY:0,duration:.8,stagger:.012,ease:'back.out(2)'});gsap.from('#deco .flag',{y:-170,opacity:0,duration:1,stagger:.03,ease:'bounce.out',delay:.3});
  gsap.to('#deco .fo',{rotation:3,yoyo:true,repeat:-1,duration:1.3,ease:'sine.inOut',stagger:{each:.03,from:'random'}});
  gsap.to('#deco .flag',{rotation:7,yoyo:true,repeat:-1,duration:1.1,ease:'sine.inOut',stagger:{each:.05,from:'random'}})}
const PBG=new THREE.SphereGeometry(.55,MOB?16:24,MOB?16:24),PSG=new THREE.CylinderGeometry(.01,.01,1.3),PBM=BCOL.map(c=>new THREE.MeshPhongMaterial({color:c,shininess:30,specular:0x333333})),PSM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5});
function enterParty(){const E=['🎈','🎉','🎊','🥳','🎁','✨','🧁','💖','🍰','⭐'];confetti();deco();
  const NB=MOB?8:16,NS=MOB?12:26;
  for(let i=0;i<NB;i++){const side=i%2?1:-1,g=new THREE.Group(),b=new THREE.Mesh(PBG,PBM[i%5]),s=new THREE.Mesh(PSG,PSM);
    b.scale.y=1.22;s.position.y=-1.3;g.add(b,s);g.position.set(side*rnd(2.4,3.2),-7.5,rnd(-1,2.5));scene.add(g);
    gsap.to(g.position,{y:7.5,x:side*rnd(.2,2.4),duration:rnd(3.5,5.5),delay:i*(MOB?.4:.2),ease:'none',onComplete:()=>scene.remove(g)})}
  for(let i=0;i<NS;i++){const e=document.createElement('i'),L=i%2;e.className='stk';e.textContent=E[i%10];e.style.cssText='left:'+(L?'auto':'-10px')+';right:'+(L?'-10px':'auto')+';top:'+rnd(40,90)+'vh';document.body.appendChild(e);
    gsap.timeline({delay:i*(MOB?.36:.18),onComplete:()=>e.remove()}).fromTo(e,{scale:0,rotation:0},{scale:rnd(.8,1.5),rotation:rnd(-40,40),duration:.4,ease:'back.out(2)'}).to(e,{x:(L?-1:1)*rnd(innerWidth*.25,innerWidth*.8),y:-rnd(innerHeight*.3,innerHeight*.7),rotation:rnd(-200,200),duration:rnd(2,3.2),ease:'power1.out'},'<.1').to(e,{opacity:0,duration:.5})}
  setTimeout(confetti,1800);setTimeout(()=>go(4),5800)}

/* 4 photos: stack, tap the top one and it flies left */
function art(i){const P=[['#ff9a8b','#ff6a88','#2b1055'],['#fddb92','#d1fdff','#3a7bd5'],['#a18cd1','#fbc2eb','#2d1b69'],['#84fab0','#8fd3f4','#0f5e6b']][i%4];
  const s="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 480'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='"+P[0]+"'/><stop offset='1' stop-color='"+P[1]+"'/></linearGradient></defs><rect width='400' height='480' fill='url(#g)'/><circle cx='"+(130+i*45)+"' cy='190' r='60' fill='#fff' opacity='.85'/><path d='M0 340Q100 "+(270+i*12)+" 210 330T400 300V480H0Z' fill='"+P[2]+"' opacity='.55'/><path d='M0 400Q120 340 240 395T400 370V480H0Z' fill='"+P[2]+"'/></svg>";
  return 'data:image/svg+xml,'+encodeURIComponent(s)}
let ci=0;
function layout(inst){[...$('cards').children].forEach((d,i)=>{const k=i-ci;if(k<0)return;const p={y:k*14,scale:1-k*.05,rotation:k%2?4:-3,rotationX:0,rotationY:0,zIndex:10-k};if(inst)gsap.set(d,p);else gsap.to(d,Object.assign(p,{duration:.4}))})}
function setCnt(){const N=CFG.captions.length;$('cnt').textContent='👆 Tap the photo for the next memory · '+Math.min(ci+1,N)+' / '+N}
function enterCards(){ci=0;const b=$('cards');b.innerHTML='';CFG.captions.forEach((c,i)=>{const d=document.createElement('div');d.className='card';d.innerHTML='<img alt="" decoding="async" src="'+(CFG.photos[i]||art(i))+'"><p>'+c+'</p>';b.appendChild(d);gsap.set(d,{transformPerspective:700})});
  layout(true);gsap.from(b.children,{y:80,opacity:0,stagger:.1,duration:.6});setCnt()}
$('cards').onclick=()=>{const b=$('cards'),d=b.children[ci];if(!d)return;gsap.to(d,{x:-innerWidth*.9,rotation:-28,opacity:0,duration:.6,ease:'power2.in'});ci++;
  if(ci>=CFG.captions.length){$('cnt').textContent='♥';setTimeout(()=>go(5),650);return}layout(false);setCnt()};
$('cards').onpointermove=e=>{const d=$('cards').children[ci];if(!d)return;const r=$('cards').getBoundingClientRect();
  gsap.to(d,{rotationY:((e.clientX-r.left)/r.width-.5)*26,rotationX:-((e.clientY-r.top)/r.height-.5)*26,duration:.3,overwrite:'auto'})};

/* 5 quiz: every answer wins */
const QZ=[
 {q:'Did you enjoy this surprise?',y:'Of course you did! +100 points 🏆',n:'Wrong answer detected… we’re giving you +100 points anyway 😎'},
 {q:'Is cake a valid breakfast, lunch and dinner?',y:'Correct. Cake is a food group. You win! 🍰',n:'Wrong… but the cake forgives you. You win! 🍰'},
 {q:'Ready for the final surprise?',y:'Let’s go! 🎁 You win!',n:'Too late, it’s already coming! 🎁 You win!'}];
let qi=0,wins=0,qlock=false;
function enterQuiz(){qi=0;wins=0;qlock=false;showQ()}
function showQ(){const Q=QZ[qi];$('qq').textContent=Q.q;$('qr').textContent='';$('qn').textContent='Question '+(qi+1)+' / '+QZ.length;$('qs').textContent='Wins: '+wins+' 🏆';
  gsap.fromTo('.qwrap',{y:24,opacity:0},{y:0,opacity:1,duration:.5});gsap.from('.yn button',{y:16,opacity:0,stagger:.1,delay:.2,duration:.4})}
function ans(yes,e){if(qlock)return;qlock=true;wins++;$('qs').textContent='Wins: '+wins+' 🏆';$('qr').textContent=yes?QZ[qi].y:QZ[qi].n;heartBurst(e.clientX,e.clientY,12);boom(e.clientX,e.clientY-30,'WIN!');
  gsap.fromTo('#qr',{scale:.7,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2)'});
  setTimeout(()=>{qlock=false;qi++;if(qi>=QZ.length){confetti();go(6)}else showQ()},1900)}
$('bYes').onclick=e=>ans(true,e);$('bNo').onclick=e=>ans(false,e);

/* 6 curtain + heart reveal, then one last round of balloons */
let rOpen=false;
function enterReveal(){rOpen=false;gsap.set('#curL,#curR,#rh',{clearProps:'all'});gsap.set('#rHint',{opacity:1});$('hb').textContent='Happy Birthday, '+CFG.name+'! 💖';$('sig').textContent='With love, '+CFG.from;
  gsap.set('#msg',{opacity:0});$('msg').style.visibility='hidden'}
$('rh').onclick=()=>{if(rOpen)return;rOpen=true;const r=$('rh').getBoundingClientRect();heartBurst(r.left+r.width/2,r.top+r.height/2,22);
  gsap.timeline().to('#rh',{scale:1.5,duration:.25}).to('#rh',{scale:0,opacity:0,duration:.3}).to('#rHint',{opacity:0,duration:.2},0)
   .to('#curL',{xPercent:-104,duration:1.6,ease:'power3.inOut'},.4).to('#curR',{xPercent:104,duration:1.6,ease:'power3.inOut'},.4)
   .add(()=>{confetti();$('msg').style.visibility='visible'},1.2)
   .fromTo('#msg',{y:40,opacity:0,scale:.92},{y:0,opacity:1,scale:1,duration:.8,ease:'back.out(1.4)'},1.2)
   .from('#msg .ln',{opacity:0,y:14,stagger:.7,duration:.5},1.9).from('#msg .fin',{opacity:0,y:14,stagger:.4,duration:.5},'>')};
$('more').onclick=()=>go(7);

/* 8 the end */
function enterEnd(){nameSpans($('eName'),CFG.name.toUpperCase());gsap.from('#eName span',{y:80,rotationX:-90,opacity:0,stagger:.14,duration:.7,ease:'back.out(2)'});
  confetti();fw(innerWidth*.25,innerHeight*.3);fw(innerWidth*.75,innerHeight*.3);setTimeout(()=>{confetti();fw(innerWidth/2,innerHeight*.5)},1200)}
$('again').onclick=()=>go(0);

/* input + loop */
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
addEventListener('pointerdown',e=>{if(st===2){cakeTap(e);return}if(st!==1&&st!==7)return;
  mv.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(mv,cam);
  const h=ray.intersectObjects(bodies.filter(b=>!b.userData.g.userData.popped))[0];if(h)pop(h.object.userData.g,e)});
const clock=new THREE.Clock(),_p0=new THREE.Vector3(),_mid=new THREE.Vector3();
function loop(){requestAnimationFrame(loop);if(document.hidden)return;const dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;cam.position.z=bz+cz.o;
  if(st===1||st===7)BAL.forEach((g,i)=>{const u=g.userData;if(u.popped)return;
    g.position.set(u.x,u.y-(1-u.r)*10+Math.sin(t*1.1+i*1.7)*.2,u.z);g.rotation.y=Math.sin(t*.8+i)*.25;g.rotation.z=Math.sin(t*.6+i*2)*.05;
    _p0.set(g.position.x,g.position.y-1.35*g.scale.y,g.position.z);_mid.copy(_p0).lerp(ANCH,.5);_mid.x+=Math.sin(t*1.3+i)*.35;
    const pa=u.line.geometry.attributes.position;
    for(let j=0;j<=12;j++){const s=j/12,a=(1-s)*(1-s),b=2*(1-s)*s,c=s*s;pa.setXYZ(j,a*_p0.x+b*_mid.x+c*ANCH.x,a*_p0.y+b*_mid.y+c*ANCH.y,a*_p0.z+b*_mid.z+c*ANCH.z)}
    pa.needsUpdate=true});
  if(st===2||st===3){cake.rotation.y=cs.k*Math.sin(t*.7)*.5+cs.r;spk.rotation.y+=dt*.3;if(cs.cut)updClip();if(ph===0)glow.intensity=(.35*cl+.1)*(1+Math.sin(t*14)*.15);
    if(Kp.visible)applyK();
    const showB=st===2&&ph===0;
    flames.forEach(f=>{const b=f.userData.b;if(!b)return;
      if(showB&&f.scale.x>.05){const p=scr(f);b.style.left=p[0]+'px';b.style.top=p[1]+'px';if(b._d!=='block'){b.style.display='block';b._d='block'}}
      else if(b._d!=='none'){b.style.display='none';b._d='none'}})}
  for(let i=shards.length-1;i>=0;i--){const s=shards[i];s.l-=dt*1.1;s.v.y-=9*dt;s.m.position.addScaledVector(s.v,dt);s.m.rotation.x+=dt*8;s.m.rotation.y+=dt*6;s.m.material.opacity=Math.max(s.l,0);
    if(s.l<=0){scene.remove(s.m);s.m.material.dispose();shards.splice(i,1)}}
  if(st===1||st===2||st===3||st===7||shards.length)renderer.render(scene,cam)}

resize();
Promise.all([document.fonts.load('100px "Bagel Fat One"'),document.fonts.load('800 16px Nunito')]).catch(()=>{}).then(()=>{nameMat.map=nameTex();nameMat.needsUpdate=true;makeBalloons();go(0);loop()});
