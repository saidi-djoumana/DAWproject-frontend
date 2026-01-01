<template>
  <div class="hero">
    <div class="placeholder">1200 × 400</div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  background: #ffffff;
  padding: 26px 0 10px;
}
.placeholder {
  max-width: 1120px;
  height: 260px;
  margin: 0 auto;
  background: #d9d9d9;
  color: #9a9a9a;
  display: grid;
  place-items: center;
  font-family: var(--font-title);
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 1px;
}
@media (max-width: 980px) {
  .placeholder {
    height: 200px;
    font-size: 44px;
    margin: 0 18px;
  }
}
</style>
