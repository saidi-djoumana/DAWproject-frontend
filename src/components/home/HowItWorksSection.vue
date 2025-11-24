<template>
  <section class="how-works">
    <div class="container">

      <!-- Left text block -->
      <div class="left-block">
        <p class="label">Simple</p>
        <h2 class="title">How CuraLink works</h2>

    <div class="actions">
        <router-link to="/auth/register" class="btn-primary">
            Sign Up
        </router-link>

        <router-link to="/events" class="explore-link">
            Explore Events >
        </router-link>
    </div>

      </div>

      <!-- Right steps block -->
      <div class="steps-block">
        <div class="step">
          <i class="fa-solid fa-calendar-check step-icon"></i>
          <div>
            <h6>Create or Join an Event</h6>
            <p>
              Organizers publish events with full details, while participants browse and register for the ones that interest them.
            </p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="step">
          <i class="fa-solid fa-file-lines step-icon"></i>
          <div>
            <h6>Submit, Review, or Attend</h6>
            <p>
              Authors upload abstracts, reviewers evaluate them, and attendees engage in sessions, Q&amp;A, and surveys.
            </p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="step">
          <i class="fa-solid fa-certificate step-icon"></i>
          <div>
            <h6>Get Certified & Stay Connected</h6>
            <p>
              After the event, CuraLink automatically generates certificates and statistics, keeping science moving forward.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// Nothing needed here
</script>

<style scoped>
.how-works {
  width: 100%;
  padding: 100px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
}

/* Equal width */
.left-block,
.steps-block {
  flex: 1;
  align-self: flex-start; /* ensure both blocks align to the top of the container */
}
/* LEFT SIDE */
.left-block .label {
  font-family: Inter, sans-serif;
  font-size: 18px;
  margin: 0px;
  color: #001F36;
}

.left-block .title {
  font-family: Poppins, sans-serif;
  font-size: 48px;
  font-weight: 500;
  color: #001F36;
  margin: 30px 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.btn-primary {
  padding: 12px 28px;
  background-color: #CCEBEB;
  border-radius: 40px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;
  color: #001F36;
  display: inline-block;
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-1px);
}

.explore-link {
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #001F36;
  text-decoration: none;
}

.explore-link i {
  margin-left: 6px;
}

/* RIGHT SIDE */
.steps-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.step-icon {
  font-size: 26px;
  color: #001F36;
  margin-top: 6px; /* nudge icon down to line up with the h6 */
  line-height: 1;
}

.step h6 {
  font-family: Poppins, sans-serif;
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 6px 0; /* remove top margin so h6 aligns with icon */
  padding: 0;
}

.step p {
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: #374151;
  line-height: 1.5;
  margin: 0;
}

/* Vertical connectors */
.divider {
  width: 1px;
  height: 64px; /* shorter connector lines */
  background-color: #D9D9D9;
  margin-left: 10px;
  align-self: flex-start; /* make sure the line starts aligned with the icon area */
}

/* MOBILE: stack with left-block on top */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* left-block will be first (top) because it's first in the DOM) */
    align-items: stretch;
    gap: 24px;
    padding: 0 20px; /* added horizontal padding for tablet */
  }

  .left-block,
  .steps-block {
    flex: none;
    width: 100%;
    align-self: stretch;
  }

  /* tighten spacing and scale down large titles */
  .left-block .title {
    font-size: clamp(1.6rem, 5vw, 2rem);
    margin: 16px 0;
  }

  .actions {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  /* make steps more compact on narrow screens */
  .steps-block {
    gap: 14px;
  }

  .step {
    gap: 12px;
  }

  .step-icon {
    margin-top: 4px;
    font-size: 20px;
  }

  .divider {
    margin-left: 10px;
    height: 48px;
  }
}

/* Add padding for 1024px screens */
@media (min-width: 1024px) {
  .container {
    padding: 0 40px; /* added horizontal padding for larger screens */
  }
}

@media (max-width: 425px) {
    .how-works{
        padding: 60px 0;
    }
  .container { gap: 18px; padding: 0 20px; }
  .left-block .title { font-size: 1.5rem; }
  .left-block{margin-bottom: 40px;}
  .step p { font-size: 14px; }
  .divider { height: 40px; }
}
</style>
