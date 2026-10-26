// Ubah di sini: nama, bulan (1-12), dan tanggal ulang tahun
var CFG={name:'Plincesku',month:10,day:27};
var $=function(i){return document.getElementById(i)};
var still=function(){return matchMedia('(prefers-reduced-motion:reduce)').matches};

var views=[].slice.call(document.querySelectorAll('.view'));
function go(id){views.forEach(function(v){v.classList.toggle('on',v.id===id)});window.scrollTo(0,0)}
[].forEach.call(document.querySelectorAll('[data-go]'),function(b){b.addEventListener('click',function(){go(b.dataset.go)})});

function petal(){
  if(still())return;
  var p=document.createElement('span');p.className='petal';p.textContent='♥';
  p.style.left=Math.random()*100+'vw';p.style.fontSize=(.8+Math.random()*1.2)+'rem';
  p.style.animationDuration=(7+Math.random()*6)+'s';
  document.body.appendChild(p);setTimeout(function(){p.remove()},13000);
}
setInterval(petal,1800);
document.addEventListener('click',function(e){
  if(still())return;
  var h=document.createElement('span');h.className='heart';h.textContent='♥';
  h.style.left=(e.clientX-10)+'px';h.style.top=(e.clientY-10)+'px';
  document.body.appendChild(h);setTimeout(function(){h.remove()},1200);
});

var bgm=$('bgm'),mu=$('mu');
var vl=document.querySelector('#extra img[alt="Momen kita 5"]');
if(vl)$('vlabel').src=vl.src;
var trk=$('trk3'),trk2=$('trk2'),active=bgm,AUD={bgm:bgm,trk:trk,trk2:trk2};
function sync(){
  var off=bgm.paused&&trk.paused&&trk2.paused;
  $('vinyl').classList.toggle('paused',off);
  mu.textContent=off?'🔇':'🔊';
  [].forEach.call(document.querySelectorAll('.songs li[data-song]'),function(li){
    var a=AUD[li.dataset.song];li.classList.toggle('now',!a.paused);
  });
}
[bgm,trk,trk2].forEach(function(a){a.addEventListener('play',sync);a.addEventListener('pause',sync)});
function playSong(a){
  if(!a.paused){a.pause();return}
  [bgm,trk,trk2].forEach(function(o){if(o!==a)o.pause()});a.volume=.6;active=a;a.play();
}
[].forEach.call(document.querySelectorAll('.songs li[data-song]'),function(li){
  function pick(){playSong(AUD[li.dataset.song])}
  li.addEventListener('click',pick);
  li.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}});
});
function startMusic(){
  mu.hidden=false;bgm.volume=0;
  var p=bgm.play();
  if(p&&p.catch)p.catch(function(){mu.textContent='🔇'});
  var v=0,t=setInterval(function(){v+=.05;if(v>=.6){v=.6;clearInterval(t)}bgm.volume=v},120);
  mu.textContent='🔊';
}
mu.addEventListener('click',function(e){
  e.stopPropagation();
  if(active.paused){active.volume=.6;active.play()}else{active.pause()}
});
var env=$('env');
function openEnv(){if(env.classList.contains('open'))return;env.classList.add('open');startMusic();setTimeout(function(){go('menu')},1200)}
env.addEventListener('click',openEnv);
env.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnv()}});

function tick(){
  var now=new Date(),t=new Date(now.getFullYear(),CFG.month-1,CFG.day);
  var today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  var c=$('count'),n=$('cdnote');
  if(+today===+t){c.innerHTML='';n.textContent='Hari ini harimu. Selamat ulang tahun, cantik.';return}
  if(t<today)t=new Date(now.getFullYear()+1,CFG.month-1,CFG.day);
  var s=Math.floor((t-now)/1000);
  var v=[[Math.floor(s/86400),'hari'],[Math.floor(s%86400/3600),'jam'],[Math.floor(s%3600/60),'menit'],[s%60,'detik']];
  c.innerHTML=v.map(function(x){return'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('');
  n.textContent='Sampai kita merayakanmu.';
}
tick();setInterval(tick,1000);

function showMoments(){
  var g=$('mgal');
  if(!g.children.length){
    [].forEach.call(document.querySelectorAll('#extra .mx'),function(el){
      var im=el.querySelector('img'),cp=el.querySelector('.cap');
      if(!im)return;
      var f=document.createElement('div');f.className='mf';
      var i2=document.createElement('img');i2.src=im.src;i2.alt=im.alt;
      i2.addEventListener('click',function(){lb.querySelector('img').src=i2.src;lb.classList.add('on')});
      f.appendChild(i2);
      if(cp){var c=document.createElement('span');c.className='cap';c.textContent=cp.textContent;f.appendChild(c)}
      g.appendChild(f);
    });
  }
  g.classList.add('on');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.15});
  [].forEach.call(g.children,function(f){f.classList.remove('show');io.observe(f)});
  setTimeout(function(){g.scrollIntoView({behavior:'smooth',block:'start'})},500);
}
var cake=$('cake'),wish=$('wish'),bb=$('blow');
function blow(){
  if(cake.classList.contains('out')){cake.classList.remove('out');wish.textContent='';bb.textContent='Tiup lilinnya';$('mgal').classList.remove('on');return}
  cake.classList.add('out');
  wish.textContent='Buat permintaan, '+CFG.name+'. Semoga semuanya terkabul.';
  bb.textContent='Nyalakan lagi';showMoments();
  for(var i=0;i<30;i++)setTimeout(petal,i*60);
}
bb.addEventListener('click',blow);
cake.addEventListener('click',blow);
cake.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();blow()}});

var FL=['🌸','🌷','🌹','🌺','🌼','💐','🌻'];
function flowers(n){
  if(still())return;
  for(var i=0;i<n;i++)(function(i){
    setTimeout(function(){
      var f=document.createElement('span');f.className='flower';
      f.textContent=FL[Math.floor(Math.random()*FL.length)];
      f.style.left=Math.random()*100+'vw';
      f.style.fontSize=(1.3+Math.random()*1.8)+'rem';
      f.style.setProperty('--dx',(Math.random()*160-80)+'px');
      f.style.setProperty('--rot',(Math.random()*720-360)+'deg');
      f.style.animationDuration=(4+Math.random()*4)+'s';
      document.body.appendChild(f);
      setTimeout(function(){f.remove()},8500);
    },i*45);
  })(i);
}
$('gb').addEventListener('click',function(){
  this.classList.add('open');$('gh').style.display='none';
  $('letter').classList.add('on');$('reason').classList.add('on');$('nextR').style.display='inline-block';
  for(var i=0;i<24;i++)setTimeout(petal,i*70);
  flowers(90);
});
var R=['You make me feel at home. 🤍','Your hugs mean everything to me. 🫂','You make the little things feel special. 🌷','You make me want to be a better person. 🥹','Because I want you in my future. 💍❤️'],ri=0;
$('nextR').addEventListener('click',function(){
  var box=$('reason');
  if(ri<R.length){box.textContent=R[ri];ri++;this.textContent=ri<R.length?'Alasan berikutnya ('+ri+' dari '+R.length+')':'Masih ada lagi...'}
  else{box.textContent='Dan masih banyak lagi, '+CFG.name+'. Aku nggak akan kehabisan alasan.';ri=0;this.textContent='Dari awal lagi'}
});

var lb=$('lb');
[].forEach.call(document.querySelectorAll('.fr.has img'),function(i){i.addEventListener('click',function(){lb.querySelector('img').src=i.src;lb.classList.add('on')})});
lb.addEventListener('click',function(){lb.classList.remove('on')});
