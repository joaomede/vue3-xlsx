<template>
  <div>
      <h3>Import XLSX</h3>
      <input type="file" @change="onChange" />
      <xlsx-read :file="file" >
        <template #default="{loading}">
          <span v-if="loading">Loading...</span>
        </template>
      </xlsx-read>
  </div>
</template>

<script>
import { XlsxRead } from "../../dist/vue3-xlsx.cjs.prod.js";

export default {
  components: {
    XlsxRead
  },
  data() {
    return {
      file: null
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    }
  }
};
</script>
