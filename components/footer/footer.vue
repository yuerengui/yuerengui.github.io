<template>
  <el-footer class="footer">
    <div class="container">
      <dl>
        <dt>友情链接</dt>
        <dd v-for="item in links" :key="item.id"><a :href="item.link" target="_blank">{{item.name}}</a></dd>
      </dl>
    </div>
  </el-footer>
</template>
<script>
import './footer.scss'

export default {
  data() {
    return {
      links: [
        {
          id: 1,
          name: 'Full Stack Developer',
          link: 'https://axiuluo.net/web'
        }
      ]
    }
  }
  
}
</script>

