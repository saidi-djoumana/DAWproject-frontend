<template>
  <section class="featured-section">
    <div class="content">
      <h4 class="label">Featured</h4>
      <h2 class="title">Find your next scientific event</h2>
      <p class="subtitle">
        Search conferences, workshops, congresses and seminars in health research
      </p>

      <!-- Two-column section -->
      <div class="featured-grid">
        <!-- Left section: 2/3 -->
        <div class="featured-left">
          <img src="@/assets/conferences.png" alt="Conferences" class="featured-img-left">
          <div class="featured-text text-bg-left">
            <h5 class="small-title">Conferences</h5>
            <h3 class="big-title">Browse upcoming health science conferences</h3>
            <p>Global events connecting researchers and medical professionals</p>
            <span class="cta">Browse &gt;</span>
          </div>
        </div>

        <!-- Right section: 1/3 -->
        <div class="featured-right">
          <img src="@/assets/workshops.png" alt="Workshops" class="featured-img-right">
          <div class="featured-text text-bg-right">
            <h5 class="small-title">Workshops</h5>
            <h3 class="big-title">Interactive learning opportunities for researchers</h3>
            <p>Hands-on sessions for scientific skill development</p>
            <span class="cta">Explore &gt;</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== FEATURED TITLE SECTION ===== */
.featured-section {
  width: 100%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  overflow-x: hidden;
}

.content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  box-sizing: border-box;
}

.label {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #001F36;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 500;
  color: #001F36;
  margin-bottom: 16px;
  line-height: 1.25;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.75rem, 1vw, 1rem);
  color: #001F36;
  margin-top: 0;
}

/* ===== FEATURED GRID ===== */
.featured-grid {
  display: flex;
  gap: 2rem;
  margin-top: 60px;
  flex-wrap: wrap;
  align-items: stretch;
}

/* ===== LEFT SECTION ===== */
.featured-left {
  flex: 2 1 0;
  display: flex;
  align-items: stretch;
  border-radius: 16px;
  overflow: hidden;
}

.featured-img-left {
  flex: 0 0 40%; /* narrower width for first image */
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.text-bg-left {
  flex: 1;
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: left; /* align text to left */
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

/* ===== RIGHT SECTION ===== */
.featured-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
}

.featured-img-right {
  width: 100%;
  object-fit: cover;
  flex: 1;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.text-bg-right {
  flex: 1;
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: left; /* align text to left */
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

/* ===== TEXT STYLES ===== */
.small-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #001F36;
  margin-bottom: 8px;
  text-transform: uppercase;

}

.big-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: 8px;
  line-height: 1.3;
  color: #001F36;
}

.featured-left p,
.featured-right p,
.cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #001F36; /* make CTA same color as text */
  margin-bottom: 8px;
}

.cta {
  margin: 20px 0 0;
  font-weight: 600;
  cursor: pointer;
}

/* ===== RESPONSIVE: 1024px ===== */
@media (max-width: 1024px) {
    .featured-section{
    padding: 40px;
    }

  /* LEFT IMAGE */
  .featured-left .featured-img-left {
    flex: 0 0 30%; /* smaller left image */
    width: 50%; /* allow flex to control width */
  }

  /* RIGHT IMAGE */
  .featured-right .featured-img-right {
    flex: 0 0 35%; /* smaller right image */
    width: auto; /* allow flex to control width */
  }
} 


/* ===== RESPONSIVE: 425px AND BELOW ===== */
@media (max-width: 640px) {
  .featured-section{
    padding-right: 20px;
    padding-left: 20px;
  }
  .featured-grid {
    flex-direction: column;
    gap: 20px;
  }

  /* LEFT + RIGHT: use column flex so image first, then text.
     Align content to the left so stacked texts sit to the left of the container */
  .featured-left,
  .featured-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* left-align stacked content */
    overflow: visible;
    border-radius: 16px;
    background: transparent;
  }
  
  /* IMAGES: don't force a fixed height or overflow */
  .featured-left .featured-img-left,
  .featured-right .featured-img-right {
    width: 100%;
    height: auto;
    max-height: none;
    display: block;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
    flex: 0 0 auto;
  }

  /* conferences image size on phones */
  .featured-left .featured-img-left {
    max-height: 220px;
    height: auto;
    object-fit: cover;
  }

  /* second image slightly smaller on phones */
  .featured-right .featured-img-right {
    max-height: 180px;
    height: auto;
    object-fit: cover;
    display: block;
  }

  /* TEXT BLOCKS: left-aligned and padded so text sits at left edge */
  .text-bg-left,
  .text-bg-right {
    width: 100%;
    display: block;
    padding: 12px 20px;        /* extra left padding for clearer left alignment */
    box-sizing: border-box;
    border-radius: 0 0 16px 16px;
    text-align: left;          /* stack text to the left */
    background-color: #F2F2F2;
    overflow: visible;
  }

  /* Make sure titles and following content have space and are visible */
  .big-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  .subtitle,
  .featured-left p,
  .featured-right p,
  .cta {
    font-size: 0.9rem;
    margin-bottom: 8px;
    display: block;
    text-align: left; /* ensure paragraph/cta text also left-aligned */
  }

  .cta {
    margin-top: 8px;
  }
}
</style>
