<script lang="jsx">
export default {
  inject: ['getWorkbook'],
  props: {
    filename: {
      type: String,
      default: 'my-workbook.xlsx'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    disableWrapperClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    this.load()
  },
  watch: {
    loaded: {
      immediate: true,
      handler (loaded) {
        if (loaded) {
          this.getWorkbook((wb) => {
            this._workbook = wb
          })
        }
      }
    }
  },
  methods: {
    async load () {
      const { writeFile } = await import('xlsx')
      this._writeFile = writeFile
      this.loaded = true
    },
    download () {
      this._writeFile(this._workbook, this.filename, this.options)
    }
  },
  render () {
    if (this.$slots.default && this.loaded) {
      return <div
        onClick={() => {
          if (!this.disableWrapperClick) this.download()
        }}
      >
      {...this.$slots.default
        ? this.$slots.default({ download: this.download })
        : ''}</div>
    }
    return null
  }
}
</script>
