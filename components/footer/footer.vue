<template>
  <div class="footer">
    <div class="footer_container">
      <dl>
        <dt><span>[root@demon ~]#</span> quote | lolcat</dt>
        <dd>Samuel Johnson: "Do not accustom yourself to use big words for little matters."</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: []
    }
  }
  
}
</script>
<style lang="scss">
@import '@/assets/css/base-variable.scss';

div.footer {
  width: 100%;
  background: #2f3234;
  height: auto;
  padding-bottom: 20px;
  position: relative;

  div.footer_container {
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 20px;
    overflow: hidden;
    @include responseWidth;

    dl {
      float: left;
      padding-right: 50px;

      dt {
        border-left: 4px solid #617ed1;
        padding-left: 10px;
        margin: 20px 0px 10px 0px;
        color: #aaa;
        font-weight: 700;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
      }

      dd {
        padding-left: 10px;
        line-height: 22px;
        color: #000;
        font-size: 16px;
        max-width: 700px;
        text-align: left;
        background: rgba(255, 253, 160, 1);
        background: -webkit-linear-gradient( left, #C99E1B 0%, #E56F18 25%, #EF3E3E 50%, #C625A1 100%) repeat;
        -webkit-background-clip: text;
        -ms-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -ms-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        text-fill-color: transparent;
        -webkit-animation-name: masked-animation;
        -webkit-animation-duration: 50s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        a {
          color: #999;
          font-size: 14px;
        }
      }
    }

    p.copy {
      @include smallScreenHide;
      width: 100%;
      position: absolute;
      left: 0px;
      bottom: 0px;
      text-align: center;
      line-height: 80px;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
