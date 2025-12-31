<template>
  <section class="hero">
    <div class="hero-container">
      <!-- Left text + buttons -->
      <div class="hero-left">
        <h1>
          Connect <span class="break">scientific events</span> 
          <span class="break">across the</span> 
          <span class="break">health landscape</span>
        </h1>
        <p>
          CuraLink bridges researchers, universities, and professionals.
          Discover, create, and collaborate on health science events worldwide.
        </p>
        <div class="hero-buttons">
          <router-link to="/create-event" class="btn-create">Create Event</router-link>
          <router-link to="/events" class="btn-explore">Explore</router-link>
        </div>
      </div>
      <!-- Right images -->
      <div class="hero-right">
        <div class="image-stack">
          <img src="@/assets/hero2.png" alt="Hero Image 2" class="hero-img bottom" />
          <img src="@/assets/hero1.png" alt="Hero Image 1" class="hero-img top" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  background-color: #F2F2F2;
  width: 100%;
  padding: 90px 40px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;   /* ensure padding doesn't cause overflow */
  overflow-x: hidden;       /* prevent horizontal scroll from translated images */
}

.hero-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 2rem;
}

.hero-left {
  flex: 1 1 300px;
  min-width: 250px;
}

.hero-left h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: clamp(2rem, 5vw, 3rem);
  color: #001F36;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-left h1 .break {
  display: block;
}

.hero-left p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: clamp(0.875rem, 2vw, 1.1rem);
  color: #001F36;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

/* Buttons */
.btn-create, .btn-explore {
  padding: 10px 24px;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-decoration: none;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px rgba(0,0,0,0.15), -6-6px 12px rgba(255,255,255,0.7);
  display: inline-block;
  text-align: center;
}

.btn-create { 
  background-color: #CCEBEB; 
  color: black; 
}

.btn-create:hover { 
  transform: translateY(-2px); 
}

.btn-explore { 
  background-color: white; 
  color: black; 
}

.btn-explore:hover { 
  transform: translateY(-2px); 
}

/* ===== IMAGE STACK ===== */
.hero-right {
  flex: 1 1 300px;
  min-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.image-stack {
  position: relative;
  width: 100%;
  max-width: 300px;
  min-height: 200px;
}

.hero-img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  position: absolute;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.hero-img.top {
  z-index: 2;
  transform: translate(-30px, -20px);
}

.hero-img.bottom {
  z-index: 1;
  transform: translate(90px, 90px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero {
    padding: 60px 30px; /* more breathing room */
  }
  
  .hero-left h1 {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }

  .hero-left p {
    font-size: clamp(0.85rem, 2vw, 1rem);
  }

  .hero-buttons {
    gap: 0.75rem;
  }

  .image-stack {
    max-width: 250px;
  }

  .hero-img.top {
    transform: translate(-30px, -10px);
  }

  .hero-img.bottom {
    transform: translate(80px, 100px);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 50px 20px;
  }

  .hero-left h1 {
    font-size: clamp(1.6rem, 6vw, 2.2rem);
  }

  .hero-left p {
    font-size: clamp(0.8rem, 2.5vw, 0.95rem);
  }

  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-create, .btn-explore {
    min-width: 120px;
    padding: 10px 18px;
  }

  .image-stack {
    max-width: 220px;
  }

  .hero-img.top {
    transform: translate(-40px, -8px);
  }

  .hero-img.bottom {
    transform: translate(50px, 90px);
  }
}
@media (max-width: 640px) {
  .hero {
    padding: 50px 16px 100px
  }
}

/* ===== MOBILE BREAKPOINT (480px) ===== */
@media (max-width: 480px) {
  /* container and text */
  .hero {
    padding: 16px 12px 50px; 
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .hero-container {
    flex-direction: column;
    align-items: flex-start; /* stack content and align to left */
    gap: 1rem;
    width: 100%;
  }

  .hero-left {
    width: 100%;
    max-width: 420px;        /* allow a bit more width for left-aligned text */
    text-align: left;        /* left-align stacked text */
    padding: 8px 12px;
    box-sizing: border-box;
  }

  .hero-left h1 {
    font-size: clamp(1.3rem, 7vw, 1.8rem);
  }

  .hero-left p {
    font-size: clamp(0.75rem, 3vw, 0.95rem);
  }

  /* keep buttons side-by-side on mobile */
  .hero-buttons {
    display: flex;
    flex-direction: row;       /* side-by-side */
    gap: 0.5rem;
    width: auto;
    justify-content: flex-start; /* left aligned under the text */
    align-items: center;
    padding: 0 8px;
    flex-wrap: wrap;           /* allow wrap if space is very tight */
  }

  .btn-create, .btn-explore {
    width: auto;               /* don't force full width */
    min-width: 120px;         /* give buttons a reasonable tappable size */
    padding: 10px 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* stacked, overlapping images but contained */
  .hero-right {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
    overflow: hidden; /* keep overlaps from causing horizontal scroll */
  }

  .image-stack {
    position: relative;      /* allow absolute children to overlap */
    width: 100%;
    max-width: 280px;        /* fits narrow screens */
    height: 220px;           /* container height to hold the stack */
    margin: 0 auto 8px;      /* small bottom gap */
    box-sizing: border-box;
  }

  .hero-img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 110%;             /* slightly wider for visual overlap */
    max-width: 320px;
    height: auto;
    max-height: 220px;
    border-radius: 14px;
    object-fit: cover;
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  /* top image sits above and slightly up/left */
  .hero-img.top {
    z-index: 3;
    top: -6px;
    transform: translate(-180px, -20px);
    width: 85%;
    opacity: 1;
  }

  /* bottom image: start slightly below and animate up into place */
  .hero-img.bottom {
    z-index: 1;
    top: 48px;
    /* start slightly lower and invisible, then slide up */
   transform: translate(-60px, -8px);
    opacity: 1;
    width: 85%;
  }

}


@media (max-width: 375px) {
  .hero{
    padding-bottom: 30px;
  }
.hero-img.top {
    z-index: 3;
    top: -6px;
    transform: translate(-140px, -20px);
    width: 70%;
    opacity: 1;
  }

  /* bottom image: start slightly below and animate up into place */
  .hero-img.bottom {
    z-index: 1;
    top: 48px;
    /* start slightly lower and invisible, then slide up */
   transform: translate(-50px, -8px);
    opacity: 1;
    width: 70%;
  }

}


@media (max-width: 360px) {
  .hero{
    padding-bottom: 30px;
  }
.hero-img.top {
    z-index: 3;
    top: -6px;
    transform: translate(-130px, -20px);
    width: 65%;
    opacity: 1;
  }

  /* bottom image: start slightly below and animate up into place */
  .hero-img.bottom {
    z-index: 1;
    top: 48px;
    /* start slightly lower and invisible, then slide up */
   transform: translate(-50px, -8px);
    opacity: 1;
    width: 65%;
  }

}
</style>
