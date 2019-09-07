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
          <nuxt-link exact to="/" active-class="active">首页</nuxt-link>
        </li>
        <!-- <li>
          <nuxt-link exact to="/about" active-class="active">About</nuxt-link>
        </li> -->
      </ul>
    </nav>
  </header>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import '@/assets/css/base-variable.scss';

header {
  width: 100%;
  height: 255px;
  background: #ffffff;
  border-bottom: 1px solid $borderColor;
  color: $fontColor;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div.top {
    display: flex;
    overflow: hidden;
    justify-content: center;
    height: 192px;

    ul.link {
      width: 40%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 90px;

      @media screen and(max-width:767px) {
        padding-top: 50px;
      }

      li {
        float: right;
        padding-left: 20px;
        line-height: 20px;

        @media screen and(max-width:767px) {
          line-height: 25px;
        }

        a {
          font-size: 14px;
          color: $fontColor;
          @include transition;

          &:hover {
            color: $activeColor;
          }
        }
      }
    }

    section.avatar {
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
      justify-content: center;

      img {
        border: 1px solid $borderColor;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.6)
      }
    }

    section.description {
      justify-content: center;
      width: 40%;
      height: 100%;
      padding-top: 90px;

      @media screen and(max-width:767px) {
        padding-top: 50px;
      }

      h2.title {
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 10px;
      }

      p.content {
        font-size: 14px;
        width: 80%;
        line-height: 20px;
      }
    }
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: -1px;
    ul.nav {
      li {
        float: left;
        padding: 0px 10px;

        a {
          padding: 0 5px;
          color: $fontColor;
          @include transition;
          padding-bottom: 5px;
          float: left;

          &:hover,
          &.active {
            font-weight: 700;
            color: $activeColor;
          }

          &.active {
            border-bottom: 2px solid $activeColor;
          }
        }
      }
    }
  }
}
</style>
