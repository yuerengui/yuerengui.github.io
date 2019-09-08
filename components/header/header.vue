<template>
  <header>
    <div class="top">
      <ul class="link">
        <li>
          <a href="https://github.com/yuerengui/resume" target="_blank">简历</a>
        </li>
        <li>
          <a href="https://github.com/yuerengui" target="_blank">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/EricYue_" target="_blank">Twitter</a>
        </li>
      </ul>
      <section class="avatar">
        <img src="@/assets/images/avatar.png" alt />
      </section>
      <section class="description">
        <h2 class="title">自我描述:</h2>
        <p class="content">兴趣使然的前端狗 🌝</p>
      </section>
    </div>
    <nav>
      <ul class="nav">
        <li>
          <nuxt-link exact to="/" active-class="active">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link exact to="/about" active-class="active">About</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import '@/assets/theme/header/base.scss';
</style>
