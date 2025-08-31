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