<template>
  <div class="container-select-confirm">
   <el-select
    v-model="selectedOption"
    multiple
    placeholder="Choose your currency"
    @change="fireAction"
    >
    <el-option
      v-for="(item, key) in currencyAndCourse"
      :key="key"
      :label="key"
      :value="key">
    </el-option>
  </el-select>
    <slot></slot>
  </div>
</template>

<script>
import {Select, Option} from 'element-ui'
import { mapActions } from "vuex";
export default {
  name: 'MultiSelection',
  props: {
    currencyAndCourse: Object
  },
  components: {
   [Select.name]: Select,
   [Option.name]: Option
  },
  data: function () {
    return {
      selectedOption: [],
      checkAll: false,
      isIndeterminate: true
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['selectedCurrency']),
      handleCheckAllChange (val) {
          this.selectedOption = val ? this.currencyAndCourse : [];
          this.isIndeterminate = false;
      },
      handleCheckedOptionChange (val) {
        let checkedCount = val.length;
        this.checkAll = checkedCount === this.currencyAndCourse.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.currencyAndCourse.length;
      },
      fireAction () {
        this.$store.dispatch('selectedCurrency', this.selectedOption)
      }
  }
}
</script>

<style scoped>
 .max-width {
     max-width: 800px;
 }

</style>
