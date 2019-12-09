<template>
  <div class="container">
    <div class="card">
        <h1 class="card-heading main-primary--heading">
            Your choosen accommondation
        </h1>

        <div class="card-container-info" v-if="this.$store.state.choosenAccommondation !== ''">
               
                <h3 v-for="(choosen, value, key) in SelectedAccommondation" :key="key">
                    <span class="" v-if="key > 1 && value !== 'priceInEur'">
                        {{value.toUpperCase()}}:  <span class="values">{{choosen}}</span>
                    </span>
                    <span v-else-if="value === 'priceInEur'"> 
                        PRICE IN EUR: <span class="values">{{choosen}}</span>
                    </span>
                </h3>
            <h3 class="inline-block values">All selected prices:</h3>
            <p class="inline-block values">
            <span class="inline-block values" v-for="(curr, key) in CalculatedChoosenCurrency" :key="key">
            {{curr.currencyName}}: {{curr.priceInCurrency }}  <span v-if="key !== LengthOfSelectedCurrency-1"> , </span>
            </span>
                </p>
                <br> <br>
                <el-button class="width-bth btn-right" @click="backToAccommondations" type="primary">
                    Accommondations
                </el-button>
               
        </div>    

        <div v-else>
        <h2>You should't be here yet, you havent choosen the currency or accommondation</h2>
        <el-button class="btn-right" @click="toHomePage" type="primary">Go back</el-button>
        </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Accommondation',
  components: {
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters(["Accommondations", "Currency",
     "LengthOfSelectedCurrency", "CalculatedChoosenCurrency"]),
      SelectedAccommondation: {
      get () {
        return this.$store.state.choosenAccommondation
      }
    }
  },
  mounted () {
  },
  methods: {
      toHomePage () {
          this.$router.push('/')
      },
      backToAccommondations () {
          this.$router.push('/Accommondations')
      }
  }
}
</script>

<style scoped>
.container {
    background-position: top;
}

.main-primary--heading {
  margin-bottom: 10px;
}
.width-bth {
    width:160px;

}
</style>
