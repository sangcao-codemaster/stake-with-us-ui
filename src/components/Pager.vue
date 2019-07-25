<template>
  <nav aria-label="Page navigation example">
    <ul v-if="pageCount" class="pagination">
      <li class="page-item" v-if="page > 1">
        <a class="page-link" href="" @click.prevent="previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" v-for="(p,index) in pages" :class="{ active: p == page }" :key="index+0">
        <a class="page-link" href="" @click.prevent="select($event, p)">{{ p }}</a>
      </li>

      <li class="page-item" v-if="page < pageCount">
        <a class="page-link" href="" @click.prevent="next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      frame: {
        type: Number,
        default: 10
      },
      page: Number,
      pageCount: Number
    },
    methods: {
      getPagerLimits (pageCount, page) {
        if (pageCount <= this.frame) {
          return { min: 1, max: pageCount }
        }
        const f1 = Math.floor(this.frame / 2)
        const f2 = pageCount - f1 + 1
        let min = 1
        if (f1 < page && page < f2) min = page - f1
        if (page >= f2) min = f2 - f1
        let max = min + this.frame - 1
        return { min, max }
      },
      select (event, page) {
        this.$emit('change', page)
      },
      previous (event) {
        this.$emit('change', this.page - 1)
      },
      next (event) {
        this.$emit('change', this.page + 1)
      }
    },
    computed: {
      pages () {
        const { min, max } = this.getPagerLimits(this.pageCount, this.page)
        const pa = []
        for (let i = min; i <= max; i++) {
          pa.push(i)
        }
        return pa
      }
    }
  }
</script>

<style scoped>
</style>
