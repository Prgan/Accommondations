<template>
  <div class="container">
        <div class="card">
          <h1 class="main-primary--heading">
            Select your currency
         </h1>
          <MultiSelection :currencyAndCourse="Currency">
            <el-button type="primary" @click="confirmBtn">Confirm</el-button>
          </MultiSelection>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MultiSelection from './MultiSelection.vue';
import {Button} from 'element-ui';

export default {
  name: 'WelcomePage',
  data: function () {
    return {
    }
  },
  components: {
      MultiSelection,
      [Button.name]: Button
  },
  methods: {
    ...mapActions(['fetchCurrency', 'selectedCurrency']),
    confirmBtn () {
      if(this.$store.state.selectedCurrency.length > 0 && this.$store.state.selectedCurrency.length < 6){
         this.$router.push('/Accommondations')
      } else {
        this.$notify({
          title: 'Warning',
          message: 'Choose at least one currency and max 5',
          type: 'warning'
        });
      }
    }
  },
  computed: mapGetters(["Currency"]),
  created () {
    this.$store.dispatch('fetchCurrency')
  }
}
</script>
<style scoped>
.card {
  display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

.container {
  background-image: url('https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80')
}

.el-button {
  margin-left:20px;
  width:120px;
}
@media only screen and (max-width: 590px) {
.el-button {
  margin-left:0;
  margin-top:10px;
  width:120px;
}
}
</style>
