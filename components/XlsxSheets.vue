<script lang="jsx">
export default {
  inject: ['getWorkbook'],
  data () {
    return {
      innerValue: []
    }
  },
  mounted () {
    this.getWorkbook(this.parseSheets)
  },
  methods: {
    parseSheets (wb) {
      this.innerValue = [...wb.SheetNames]
      this.$emit('parsed', [...wb.SheetNames])
    }
  },
  render () {
    if (this.$slots.default) {
      return (
        <div>
          {this.$slots.default
            ? this.$slots.default({ sheets: this.innerValue })
            : ''}
        </div>
      )
    }
    return null
  }
}
</script>
