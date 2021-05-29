<template>
  <div>
    <xlsx-workbook @change="onChange" @created="onCreated"/>
  </div>
</template>

<script>
import { XlsxWorkbook } from "../../dist/vue3-xlsx.cjs.prod.js";

export default {
  components: {
    XlsxWorkbook,
  },
  data() {
    return {};
  },
  methods: {
    onCreated (wb) {
      console.log(wb)
    },
    onChange(wb) {
     console.log(wb)
    }
  }
};
</script>
