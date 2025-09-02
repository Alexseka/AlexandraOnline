const slides = document.querySelectorAll("#slides section"),
      footer = document.querySelector("footer"),
      dotsContainer = document.querySelector(".dots");

//slideNav
slides.forEach((_,i)=>{
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
});

//dots
const dots = document.querySelectorAll(".dot");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.target===footer && entry.isIntersecting)
    {
      dots.forEach(d=>d.classList.remove("active"));
    } 
    else if(entry.isIntersecting)
    {
      const idx = [...slides].indexOf(entry.target);
      dots.forEach(d=>d.classList.remove("active"));
      if(dots[idx]) dots[idx].classList.add("active");
    }
  });
},{threshold:0.6});
slides.forEach(s=>observer.observe(s));
observer.observe(footer);

//scroll to section
dots.forEach((dot,idx)=>dot.addEventListener("click",()=>slides[idx].scrollIntoView({behavior:"smooth"})));

// Hero Slider
const heroSlides = document.querySelectorAll(".hero-slide"),
      heroContainer = document.querySelector(".hero-slides"),
      heroDotsContainer = document.querySelector(".hero-dots");

let currentHero = 0;

// create dots
heroSlides.forEach((_,i)=>{
  const dot = document.createElement("div");
  if(i===0) dot.classList.add("active");
  dot.dataset.index = i;
  heroDotsContainer.appendChild(dot);
});

const heroDots = document.querySelectorAll(".hero-dots div");

// show specific slide
function showHeroSlide(index){
  heroContainer.style.transform = `translateX(-${index*100}%)`;
  heroDots.forEach(d=>d.classList.remove("active"));
  heroDots[index].classList.add("active");
  currentHero = index;
}

// infinite auto slide every 4 seconds
setInterval(()=>{
  let next = (currentHero+1) % heroSlides.length;
  showHeroSlide(next);
},4000);

// dot click
heroDots.forEach(dot=>{
  dot.addEventListener("click",()=>{
    showHeroSlide(parseInt(dot.dataset.index));
  });
});
