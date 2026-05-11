
// Custom cursor
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);}
animRing();
document.addEventListener('mouseenter',()=>{dot.style.opacity='1';ring.style.opacity='1';});
document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0';});
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.transform='translate(-50%,-50%) scale(1.6)';ring.style.borderColor='rgba(232,80,106,.7)';});
  el.addEventListener('mouseleave',()=>{ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='rgba(232,80,106,.4)';});
});

// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>50);
  document.getElementById('backTop').classList.toggle('show',window.scrollY>400);
  // active link
  const secs=['hero','about','skills','projects','experience','family','friends','fun','contact'];
  let cur='hero';
  secs.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=80)cur=id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// Mobile nav
const btn=document.getElementById('navBtn');
const mob=document.getElementById('navMob');
btn.addEventListener('click',()=>{mob.classList.toggle('open');btn.classList.toggle('open');});
function closeNav(){mob.classList.remove('open');btn.classList.remove('open');}

// Reveal on scroll
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Skill bars
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar-fill').forEach(bar=>{
        bar.style.width=bar.dataset.w+'%';
      });
    }
  });
},{threshold:.3});
document.querySelectorAll('.skill-group').forEach(g=>barObs.observe(g));

// Form
function handleForm(e){
  e.preventDefault();
  const msg=document.getElementById('form-msg');
  msg.style.display='block';
  e.target.reset();
  setTimeout(()=>msg.style.display='none',4000);
}

// Polaroid 3D tilt
const polaroid = document.querySelector('.polaroid');
if (polaroid) {
  polaroid.addEventListener('mousemove', e => {
    const rect = polaroid.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    polaroid.style.transition = 'box-shadow 0.35s ease';
    polaroid.style.transform = `rotate(0deg) scale(1.05) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
    polaroid.style.boxShadow = `0 16px 48px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)`;
  });

  polaroid.addEventListener('mouseleave', () => {
    polaroid.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    polaroid.style.transform = 'rotate(2.5deg) scale(1)';
    polaroid.style.boxShadow = '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)';
  });
}


// Count-up animation for stats
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const decimal = parseInt(el.dataset.decimal || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target * ease;
        el.textContent = val.toFixed(decimal) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
    countObs.unobserve(e.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) countObs.observe(heroStats);