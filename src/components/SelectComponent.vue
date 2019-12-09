<template>
  <div class="">
      <slot></slot>
   <el-select
    v-model="selectedOption"
    >
    <el-option
      v-for="(item, key) in data"
      :key="key"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
  </div>
</template>

<script>
import {Select, Option} from 'element-ui'
export default {
  name: 'SelectComponent',
 props: ['value', 'data'],
  components: {
   [Select.name]: Select,
   [Option.name]: Option
  },
  data: function () {
    return {
        selectedOption: ''
    }
  },
  watch: {
      selectedOption: function (newValue) {
          this.$emit('selectedSortBy', newValue)
      }
  }
}
</script>

<style scoped>
</style>
