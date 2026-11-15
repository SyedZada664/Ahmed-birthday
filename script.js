(function(){
var NAME=(function(){try{return decodeURIComponent(location.hash.slice(1))}catch(e){return ''}})().slice(0,14)||'Alishba';
// Apni photos yahan lagao: src me image URL/data dena; khali ho to pyaari placeholder ban jaati hai
var PHOTOS=[{src:'',e:'🥰',cap:'Hamari pehli yaad',a:'#ff8fb8',b:'#7a3cff'},{src:'',e:'😂',cap:'Wo hansi ka din',a:'#ffd27a',b:'#ff5fa2'},{src:'',e:'🌙',cap:'Tumhari pyaari smile',a:'#6a5cff',b:'#1b1245'},{src:'',e:'✨',cap:'Aur abhi bahut baaki hai',a:'#ff6fa8',b:'#ffb86b'}];
var $=function(i){return document.getElementById(i)};
var NM=NAME.toUpperCase();$('n1').textContent=NAME;$('n2').textContent=NAME;document.title=NAME+', ye tumhare liye hai';
var N=4200,mode='rand',unlocked=false,timers=[];
var R=new THREE.WebGLRenderer({canvas:$('cv'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(60,1,.1,500);C.position.z=60;
var tc=document.createElement('canvas');tc.width=tc.height=64;var tx=tc.getContext('2d'),g=tx.createRadialGradient(32,32,0,32,32,32);
g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.35,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');tx.fillStyle=g;tx.fillRect(0,0,64,64);
var geo=new THREE.BufferGeometry(),pos=new Float32Array(N*3),col=new Float32Array(N*3),rnd=[],spd=new Float32Array(N),ph=new Float32Array(N);
for(var i=0;i<N;i++){var r=40+Math.random()*90,t=Math.random()*6.283,u=Math.random()*2-1,s=Math.sqrt(1-u*u);
 rnd.push(r*s*Math.cos(t),r*s*Math.sin(t)*.7,-20-Math.random()*240);spd[i]=.018+Math.random()*.04;ph[i]=Math.random()*6.28;
 pos[i*3]=rnd[i*3];pos[i*3+1]=rnd[i*3+1];pos[i*3+2]=rnd[i*3+2];
 var m=Math.random(),c=new THREE.Color(m<.55?0xffe2a6:m<.8?0xff8fc0:0xffffff);col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b}
geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(col,3));
var mat=new THREE.PointsMaterial({size:1.15,map:new THREE.CanvasTexture(tc),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
S.add(new THREE.Points(geo,mat));
var sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3));
var sm=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending});S.add(new THREE.Line(sg,sm));var shoot=-1;
var tName=[],tHeart=[],tScatter=[];
function build(){var vw=2*Math.tan(Math.PI/6)*60*C.aspect,cx=document.createElement('canvas');cx.width=600;cx.height=200;var x=cx.getContext('2d');
 x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';var fs=130,f=function(){x.font='bold '+fs+'px Arial,Helvetica,sans-serif';try{x.letterSpacing='8px'}catch(e){}};f();
 while(x.measureText(NM).width>560&&fs>30){fs-=6;f()}x.fillText(NM,300,100);
 var d=x.getImageData(0,0,600,200).data,p=[];for(var y=0;y<200;y+=2)for(var xx=0;xx<600;xx+=2)if(d[(y*600+xx)*4+3]>128)p.push(xx,y);
 var tw=x.measureText(NM).width,sc=Math.min(vw*.9/tw,9/fs);tName=[];for(var i=0;i<N;i++){var k=(Math.random()*(p.length/2)|0)*2;tName.push((p[k]-300)*sc,(100-p[k+1])*sc+8,(Math.random()-.5)*.8)}
 var hs=Math.min(vw*.7/32,.8);tHeart=[];for(var j=0;j<N;j++){var a=Math.random()*6.283,rr=Math.pow(Math.random(),.45),hx=16*Math.pow(Math.sin(a),3),hy=13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a);
  tHeart.push(hx*rr*hs,(hy*rr)*hs+9,(Math.random()-.5)*4*rr)}
 tScatter=[];for(var q=0;q<N;q++){var t2=Math.random()*6.283,u2=Math.random()*2-1,s2=Math.sqrt(1-u2*u2),r2=35+Math.random()*45;tScatter.push(r2*s2*Math.cos(t2),r2*s2*Math.sin(t2),r2*u2)}}
function size(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix();if(window.__r)build()}
addEventListener('resize',size);size();
var mx=0,my=0;addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
var T=0,clock=new THREE.Clock();
function loop(){requestAnimationFrame(loop);var dt=Math.min(clock.getDelta(),.05);T+=dt;
 var tg=mode=='name'?tName:mode=='heart'?tHeart:mode=='burst'?tScatter:rnd,P=geo.attributes.position.array,h=mode=='heart',beat=h?1+Math.pow(Math.max(0,Math.sin(T*3)),8)*.06:1,w=mode=='rand'?.6:.1;
 for(var i=0;i<N;i++){var k=spd[i]*(mode=='rand'?.15:1)*(dt*60),b=i*3;
  P[b]+=(tg[b]*beat+Math.sin(T*.9+ph[i])*w-P[b])*k;P[b+1]+=(tg[b+1]*beat+Math.cos(T*.8+ph[i])*w-P[b+1])*k;P[b+2]+=(tg[b+2]-P[b+2])*k}
 geo.attributes.position.needsUpdate=true;mat.size=1.1+Math.sin(T*2)*.1;
 var G=gal?gt:{x:mx*8,y:-my*6,z:60,lx:0,ly:mode=='rand'?0:4,lz:0},kk=gal?gk:.04,px=gal?mx*3:0,py=gal?-my*2:0;
 cs.x+=(G.x+px-cs.x)*kk;cs.y+=(G.y+py-cs.y)*kk;cs.z+=(G.z-cs.z)*kk;cs.lx+=(G.lx-cs.lx)*kk;cs.ly+=(G.ly-cs.ly)*kk;cs.lz+=(G.lz-cs.lz)*kk;
 C.position.set(cs.x,cs.y,cs.z);C.lookAt(cs.lx,cs.ly,cs.lz);cs.r+=((gal?rt:0)-cs.r)*.05;C.rotateZ(cs.r);
 var nf=60+Math.min(38,Math.abs(cs.z-G.z)*.35);if(Math.abs(nf-C.fov)>.1){C.fov=nf;C.updateProjectionMatrix()}
 for(var pi=0;pi<planes.length;pi++){var pl=planes[pi],dz=Math.abs(cs.z-pl.position.z),o=gal?Math.max(0,Math.min(1,1.6-(dz-gd)/22)):0;pl.material.opacity+=(o-pl.material.opacity)*.12;pl.visible=pl.material.opacity>.01;pl.userData.h.material.opacity=pl.material.opacity*.55;pl.position.y=pl.userData.y+Math.sin(T*1.2+pi)*.5}
 if(shoot>=0){shoot+=dt;var f=shoot/1.3,a=sg.attributes.position.array,hx=-70+f*140,hy=45-f*60;a[0]=hx;a[1]=hy;a[2]=-5;a[3]=hx-26;a[4]=hy+10;a[5]=-5;sg.attributes.position.needsUpdate=true;sm.opacity=Math.sin(Math.min(f,1)*3.14);if(f>1){shoot=-1;sm.opacity=0}}
 R.render(S,C)}
var cap=$('cap');
function say(t){var old=cap.querySelector('.in');if(old)old.classList.remove('in');var p=document.createElement('p');p.textContent=t;cap.appendChild(p);
 requestAnimationFrame(function(){requestAnimationFrame(function(){p.classList.add('in')})});setTimeout(function(){if(old)old.remove()},1200)}
function later(f,ms){timers.push(setTimeout(f,ms))}
function vib(p){if(navigator.vibrate)try{navigator.vibrate(p)}catch(e){}}
function hearts(n){for(var i=0;i<n;i++)(function(i){setTimeout(function(){var e=document.createElement('div');e.className='fl';e.textContent=['❤','💖','✨','💗'][i%4];e.style.left=Math.random()*92+'vw';e.style.animationDuration=3+Math.random()*2.5+'s';document.body.appendChild(e);setTimeout(function(){e.remove()},6000)},i*90)})(i)}
function stage(id){['wish','gal','ask2','envl','letter'].forEach(function(x){$(x).classList.toggle('hide',x!=id)})}

function unlock(){if(unlocked)return;unlocked=true;vib([30,40,60]);
 var f=$('flash');f.style.transition='none';f.style.opacity=.85;requestAnimationFrame(function(){f.style.transition='opacity 1.2s';f.style.opacity=0});
 $('fp').classList.add('hide');mode='name';
 later(function(){say('Maine tumhare liye ek poora aasman banaya hai…')},2200);
 later(function(){shoot=0},3800);
 later(function(){say('Har sitara ek wajah hai, ki tum mere liye kitni khaas ho.')},4600);
 later(function(){mode='heart';hearts(10);vib(40)},7000);
 later(function(){$('ttl').classList.add('in');say('')},7400);
 later(function(){$('next').classList.add('in')},10000)}
var pad=$('pad'),ring=$('ring'),hold=0,holding=false,raf;
function tick(){if(!holding)return;hold+=1/60/1.7;ring.style.strokeDashoffset=471*(1-Math.min(hold,1));if(hold>=1){holding=false;unlock();return}raf=requestAnimationFrame(tick)}
pad.addEventListener('pointerdown',function(e){e.preventDefault();if(unlocked)return;holding=true;pad.classList.add('on');$('hint').textContent='Scan ho raha hai…';cancelAnimationFrame(raf);tick()});
function up(){if(unlocked)return;holding=false;pad.classList.remove('on');hold=0;ring.style.strokeDashoffset=471;$('hint').textContent='Ungli rakho aur hold karo'}
addEventListener('pointerup',up);addEventListener('pointercancel',up);

// photos
function mk(p){var c=document.createElement('canvas');c.width=c.height=400;var x=c.getContext('2d'),g=x.createLinearGradient(0,0,400,400);g.addColorStop(0,p.a);g.addColorStop(1,p.b);x.fillStyle=g;x.fillRect(0,0,400,400);
 for(var i=0;i<40;i++){x.fillStyle='rgba(255,255,255,'+Math.random()*.5+')';x.beginPath();x.arc(Math.random()*400,Math.random()*400,Math.random()*3+1,0,6.3);x.fill()}
 x.font='170px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(p.e,200,205);return c.toDataURL('image/jpeg',.88)}
var stack=$('stack'),drag=null,sx=0,sy=0;
function fillStack(){stack.innerHTML='';for(var i=PHOTOS.length-1;i>=0;i--){var p=PHOTOS[i],d=document.createElement('div'),rot=(i%2?1:-1)*(1.5+i*1.3);d.className='pol';d._b='rotate('+rot+'deg)';d.style.transform=d._b;
 d.innerHTML='<img alt=""><b></b>';d.firstChild.src=p.src||mk(p);d.lastChild.textContent=p.cap;stack.appendChild(d)}}
stack.addEventListener('pointerdown',function(e){drag=stack.lastElementChild;if(!drag)return;sx=e.clientX;sy=e.clientY;drag._x=0;drag._y=0;drag.style.transition='none';stack.setPointerCapture(e.pointerId)});
stack.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-sx,dy=e.clientY-sy;drag._x=dx;drag._y=dy;drag.style.transform='translate('+dx+'px,'+dy+'px) rotate('+dx/12+'deg)'});
stack.addEventListener('pointerup',function(){if(!drag)return;var d=drag;drag=null;d.style.transition='transform .55s,opacity .55s';var dx=d._x,dy=d._y,dist=Math.hypot(dx,dy);
 if(dist<8){dx=200;dy=-40}
 if(dist<8||dist>70){d.style.transform='translate('+dx*5+'px,'+dy*5+'px) rotate('+dx/4+'deg)';d.style.opacity=0;vib(15);hearts(3);setTimeout(function(){d.remove();if(!stack.children.length){stage('ask2')}},520)}else d.style.transform=d._b});

// playful question
var yes=$('yes'),no=$('no'),dodge=0;
function run(e){if(e)e.preventDefault();dodge++;no.style.position='fixed';no.style.left=(10+Math.random()*(innerWidth-120))+'px';no.style.top=(90+Math.random()*(innerHeight-190))+'px';
 yes.style.transform='scale('+(1+dodge*.16)+')';vib(12);if(dodge==3)no.textContent='Pakad ke dikhao 😜';if(dodge==6)no.textContent='Nahi pakad sakti 😝'}
no.addEventListener('pointerdown',run);no.addEventListener('pointerenter',function(){if(matchMedia('(hover:hover)').matches)run()});
yes.addEventListener('click',function(){hearts(30);vib([20,30,20,30,80]);mode='burst';later(function(){mode='rand'},700);later(function(){stage('envl')},900)});

// envelope + letter
var LET='Aaj ka din sirf tumhara hai.\nTumhari hansi se meri duniya roshan hoti hai.\nSaal bhar ki saari khushiyan tumhari ho, aur har lamha mere saath ho 🥹';
$('seal').addEventListener('click',function(){var E=$('env');if(E.classList.contains('open')||E.classList.contains('shake'))return;E.classList.add('shake');vib([20,20,20,20,60]);later(function(){E.classList.remove('shake');E.classList.add('open');vib([30,30,60]);hearts(14)},450);later(function(){stage('letter');var el=$('lt'),i=0,iv=setInterval(function(){el.textContent=LET.slice(0,++i);if(i>=LET.length){clearInterval(iv);$('cp').classList.add('st');vib([60,30,90]);hearts(24);mode='burst';later(function(){mode='heart'},800)}},45)},2400)});
$('next').addEventListener('click',function(){$('next').classList.remove('in');$('ttl').classList.remove('in');cap.innerHTML='';mode='rand';later(function(){stage('wish')},500)});
$('again').addEventListener('click',function(){timers.forEach(clearTimeout);timers=[];unlocked=false;hold=0;dodge=0;ring.style.strokeDashoffset=471;stage('');cap.innerHTML='';$('next').classList.remove('in');$('ttl').classList.remove('in');
 $('env').classList.remove('open');$('lt').textContent='';$('cp').classList.remove('st');yes.style.transform='';no.style.position='';no.textContent='Nahi';fillStack();mode='rand';hackStart()});
// HACK HOOK
var rc=$('rain'),rx=rc.getContext('2d'),dr=[],love=false,hk=0,hp=87,hv,hon=false,hmsg=['Aur tap karo!','Aur zor se! 😤','Bas thoda aur…','Last tap!!!'];
function rsz(){rc.width=innerWidth;rc.height=innerHeight;dr=[];for(var i=0;i<Math.ceil(innerWidth/16);i++)dr.push(Math.random()*-30)}rsz();addEventListener('resize',rsz);
(function rl(){requestAnimationFrame(rl);if(!hon)return;rx.fillStyle='rgba(2,10,4,.14)';rx.fillRect(0,0,rc.width,rc.height);rx.font='15px monospace';rx.fillStyle=love?'#ff5fa2':'#25ff7a';
 for(var i=0;i<dr.length;i++){rx.fillText(love?'♥':(Math.random()<.5?'0':'1'),i*16,dr[i]*16);if(dr[i]*16>rc.height&&Math.random()>.96)dr[i]=0;dr[i]+=.7}})();
function hset(){$('hb').style.width=hp+'%';$('hp').textContent='Hack: '+Math.round(hp)+'%'}
function hackStart(){hk=0;hp=87;love=false;hon=true;sent=false;path=[];fly=[];$('wsub').textContent='Ungli se apni wish likho, jitna chaho. Phir neeche button dabao 👇';$('wbar').style.opacity=1;gal=false;rt=0;gi=0;var h=$('hack');h.classList.remove('hide');h.classList.remove('ok');$('ht').textContent=NAME+', tumhara phone HACK ho raha hai! 😱';$('hs').textContent='Hacker ko rokne ke liye screen par jaldi jaldi TAP karo!';hset();clearInterval(hv);hv=setInterval(function(){if(hk<5){hp=Math.min(99,hp+.6);hset()}},120)}
$('hack').addEventListener('pointerdown',function(){if(hk>=5||unlocked)return;hk++;vib(25);var h=$('hack');h.classList.add('shake');setTimeout(function(){h.classList.remove('shake')},250);
 if(hk<5){hp=Math.max(10,hp-18);hset();$('hs').textContent=hmsg[hk-1];return}
 clearInterval(hv);hp=0;hset();love=true;h.classList.add('ok');vib([40,40,80]);$('ht').textContent='ACCESS DENIED ✋';$('hs').textContent='Hacker pakda gaya…';
 later(function(){$('ht').innerHTML='Hacked by:<br>Tumhara Jaan 😘';$('hs').textContent='Surprise! Aaj tumhara birthday hai 🎉'},1500);
 later(function(){h.classList.add('hide');hon=false;unlock()},3700)});
// WISH
var wc=$('wc'),wx=wc.getContext('2d'),path=[],fly=[],wishing=false,sent=false;
function wsz(){wc.width=innerWidth;wc.height=innerHeight}wsz();addEventListener('resize',wsz);
wc.addEventListener('pointerdown',function(e){if(sent)return;wishing=true;path.push({x:e.clientX,y:e.clientY,b:1})});
wc.addEventListener('pointermove',function(e){if(!wishing)return;path.push({x:e.clientX,y:e.clientY});fly.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,l:.6})});
addEventListener('pointerup',function(){wishing=false});function sendWish(){if(sent||path.length<25)return;
 for(var i=0;i<path.length;i++)fly.push({x:path[i].x,y:path[i].y,vx:(Math.random()-.5)*1.2,vy:-1.2-Math.random()*2.5,l:1});
 path=[];sent=true;vib([20,30,60]);hearts(18);$('wsub').textContent='Wish bhej di… ab poori hogi 💫';$('wbar').style.opacity=0;later(startGallery,3000)}
(function wl(){requestAnimationFrame(wl);wx.clearRect(0,0,wc.width,wc.height);
 if(path.length){wx.lineWidth=5;wx.lineCap='round';wx.lineJoin='round';wx.strokeStyle='#ffd27a';wx.shadowColor='#ff5fa2';wx.shadowBlur=18;wx.beginPath();for(var i=0;i<path.length;i++){var p=path[i];if(p.b||i==0)wx.moveTo(p.x,p.y);else wx.lineTo(p.x,p.y)}wx.stroke()}
 wx.shadowBlur=10;wx.shadowColor='#ffd27a';for(var j=fly.length-1;j>=0;j--){var f=fly[j];f.x+=f.vx;f.y+=f.vy;f.l-=.007;if(f.l<=0){fly.splice(j,1);continue}wx.fillStyle='rgba(255,226,166,'+f.l+')';wx.beginPath();wx.arc(f.x,f.y,2.2,0,6.3);wx.fill()}})();
// 3D MEMORY GALLERY
var planes=[],gal=false,gw=false,gi=0,gd=20,gk=.05,rt=0,gt={x:0,y:0,z:60,lx:0,ly:0,lz:0},cs={x:0,y:0,z:60,lx:0,ly:0,lz:0,r:0},glowTex=new THREE.CanvasTexture(tc);
function pol(p,i){var c=document.createElement('canvas');c.width=360;c.height=440;var x=c.getContext('2d');x.fillStyle='#fffaf0';x.fillRect(0,0,360,440);var im=new Image(),t=new THREE.CanvasTexture(c);
 var cap=function(){x.fillStyle='#4a2638';x.font='26px Pacifico,cursive';x.textAlign='center';x.fillText(p.cap,180,408)};
 im.onload=function(){x.drawImage(im,16,16,328,328);cap();t.needsUpdate=true};im.src=p.src||mk(p);cap();
 var m=new THREE.Mesh(new THREE.PlaneGeometry(12,14.7),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:0,side:THREE.DoubleSide}));
 m.position.set((i%2?1:-1)*6,(i%3-1)*1.5,-100-i*34);m.userData.y=m.position.y;m.rotation.set(0,(Math.random()-.5)*.3,(Math.random()-.5)*.16);
 var h=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff6fa8,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));h.scale.set(34,38,1);h.position.z=-.5;m.add(h);m.userData.h=h;S.add(m);planes.push(m)}
PHOTOS.forEach(pol);
function gTo(i){var p=planes[i];gd=Math.max(16,12.67/C.aspect);gt.x=p.position.x;gt.y=p.userData.y;gt.z=p.position.z+gd;gt.lx=p.position.x;gt.ly=p.userData.y;gt.lz=p.position.z;rt=(Math.random()-.5)*.14;$('gsub').textContent=(i+1)+' / '+planes.length+' · tap karke agli yaad dekho 👆'}
function startGallery(){gal=true;gi=0;gw=true;gk=.028;gTo(0);$('gsub').textContent='Yaadon ke safar par chalte hain… ✨';stage('gal');later(function(){gk=.06;gw=false;gTo(0)},2800)}
$('gal').addEventListener('click',function(e){if(gw)return;if(e.clientX<innerWidth*.25&&gi>0)gi--;else if(gi<planes.length-1)gi++;else{gal=false;gk=.04;rt=0;stage('ask2');return}gTo(gi);gk=.06;vib(15);hearts(3)});
$('wclr').onclick=function(){if(!sent)path=[]};$('wsend').onclick=sendWish;
// v4 slower timeline + button label
function unlock(){if(unlocked)return;unlocked=true;vib([30,40,60]);
 var f=$('flash');f.style.transition='none';f.style.opacity=.85;requestAnimationFrame(function(){f.style.transition='opacity 1.2s';f.style.opacity=0});
 $('fp').classList.add('hide');mode='name';
 later(function(){shoot=0},2600);
 later(function(){mode='heart';hearts(10);vib(40)},4600);
 later(function(){$('ttl').classList.add('in')},5200);
 later(function(){say('Maine tumhare liye\nek poora aasman banaya hai ✨')},6400);
 later(function(){say('Har sitara ek wajah hai,\nki tum mere liye\nkitni khaas ho 💫')},10800);
 later(function(){$('next').classList.add('in')},15400)}
$('next').textContent='Next: Wish likho ✍️';
// Happy Birthday timeline (hack ke baad)
function unlock(){if(unlocked)return;unlocked=true;vib([30,40,60]);cap.innerHTML='';
 var f=$('flash');f.style.transition='none';f.style.opacity=.85;requestAnimationFrame(function(){f.style.transition='opacity 1.2s';f.style.opacity=0});
 mode='name';$('ttl').textContent='Happy Birthday,\n'+NAME+' 💖';
 later(function(){shoot=0},2600);
 later(function(){mode='heart';hearts(10);vib(40)},4400);
 later(function(){$('ttl').classList.add('in')},4800);
 ['Aasman ne poocha, sabse haseen kaun?\nSitaron ne tumhara naam le liya ✨','Teri muskaan par qurbaan meri har dua,\nSalamat rahe tu, khush rahe tu sada 💫','Tum jaisa koi nahi is duniya mein,\nTum ho mere dil ki sabse khaas jagah 💖'].forEach(function(s,i){later(function(){say(s)},6400+i*4800)});
 later(function(){$('next').classList.add('in')},20600)}
fillStack();stage('');hackStart();
var done=false;function go(){if(done)return;done=true;window.__r=1;build();loop()}
if(document.fonts&&document.fonts.load){document.fonts.load('130px Pacifico').then(go,go);setTimeout(go,2500)}else go();
})();
