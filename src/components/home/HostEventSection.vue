<template>
  <section class="host-event-section">
    <div class="overlay" aria-hidden="true"></div>
    <div class="content">
      <div class="left">
        <h1 class="title">Host your scientific event</h1>
      </div>
      <div class="right">
        <p class="subtitle">
          Organize and share your research with the global health science community
        </p>
        <router-link to="/auth/signup" class="btn-create">
          Create Event
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap');

.host-event-section {
  position: relative;              /* allow overlay to absolutely cover this section */
  margin-top: 30px;
  background-image: url('@/assets/host-event.jpg');
  background-size: cover;
  background-position: center;
  height: 350px;
  min-height: 280px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

/* overlay is now an absolute layer that always exactly matches the section bounds */
.overlay {
  position: absolute;
  inset: 0;                         /* top:0; right:0; bottom:0; left:0; */
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

/* content is the in-flow element that defines section height on responsive breakpoints */
.content {
  position: relative;
  z-index: 1;                       /* sit above the overlay */
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 100px;
  box-sizing: border-box;
  padding: 0 ;
  align-items: center;
  justify-content: space-between;
}

/* ===== LEFT & RIGHT ===== */
.left, 
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 0;
  box-sizing: border-box;
  min-width: 0;
}

.left .title {
  color: white;
  font-size: 3.5rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  text-align: left;
}

.right .subtitle {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  text-align: left;
}

.btn-create {
  background-color: #CCEBEB;
  color: #000;
  padding: 5px 30px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  margin-top: 1rem;
  transition: background-color 0.2s, transform 0.08s;
  align-self: flex-start;
  max-width: 160px;
}

.btn-create:hover {
  transform: translateY(-1px);
}

/* ===================================================
   Tablet / Exact 1024px responsiveness
   - add an exact-width 1024px media query to target 1024px devices
   - keep the existing smaller-breakpoint styles as fallback
   =================================================== */

/* Exact 1024px layout: stack content, left align, equal spacing */
@media (width: 1024px) {

  .host-event-section {
    height: auto;                  /* content defines height */
    padding-bottom: 1rem;
  }

  .content {
    flex-direction: column;
    align-items: flex-start;       /* left-align stacked content */
    gap: 18px;                     /* equal spacing between title / subtitle / button */
    padding: 1.25rem 1.5rem;
    box-sizing: border-box;
  }

  .left, .right {
    width: 100%;
    padding: 0;
  }

  .left .title {
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    margin: 0;
    line-height: 1.12;
  }

  .right .subtitle {
    font-size: 1.05rem;
    margin: 0;
  }

  .btn-create {
    max-width: 140px;
    padding: 6px 12px;
    margin-top: 30px;
    align-self: flex-start; /* keep button left-aligned */
  }
}

/* Fallback / smaller tablets (existing rules) */
@media (max-width: 768px) {

  .host-event-section {
    height: auto;                  /* content defines height */
    padding-bottom: 1rem;
  }

  .content {
    flex-direction: column;
    align-items: flex-start;       /* left-align stacked content */
    gap: 16px;                     /* equal spacing between title / subtitle / button */
    padding: 1.25rem 1.5rem;
  }

  .left, .right {
    width: 100%;
    padding: 0;
  }

  .left .title {
    font-size: clamp(1.6rem, 6vw, 2.5rem);
    margin: 0;
  }

  .right .subtitle {
    font-size: 1rem;
    margin: 0;
  }

  .btn-create {
    max-width: 140px;
    padding: 6px 10px;
    margin-top: 30px;
  }
}

/* ===================================================
   📲 MOBILE (max-width: 480px)
   =================================================== */
@media (max-width: 480px) {
  .host-event-section {
    height: auto;
    padding: 0.75rem 0;
  }

  .content {
    padding: 0.75rem 1rem;
    gap: 12px;
  }

  .left .title {
    font-size: clamp(1.25rem, 7vw, 1.8rem);
    line-height: 1.15;
  }

  .right .subtitle {
    font-size: 0.95rem;
    margin: 0;
  }

  .btn-create {
    max-width: 130px;
    padding: 6px 10px;
    font-size: 0.85rem;
    margin-top: 30px;
  }
}
</style>
