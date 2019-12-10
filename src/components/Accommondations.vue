<template>
<div class="container-img">
  <div class="accommondations" v-loading="loading">
    <div class="container-btn"> <a href="/"><i class="el-icon-back"></i> </a></div>
  <h1 class="main-primary--heading">Accommondations</h1>
    <div class="container--selection">
      <h3 class="secondary-heading">
        Sort by:   
      </h3>
    <el-select v-model="SortByParamteresOption" placeholder="Select" size="mini">
      <el-option
        v-for="(item, key) in sortBy"
        :key="key"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <h3 class="secondary-heading">
      Filter by avaliability: 
    </h3>
    <el-select v-model="FilteringByAvaliability" placeholder="Select" size="mini">
      <el-option
        v-for="(item, key) in filterByAvaliablity"
        :key="key"
        :label="item"
        :value="item">
      </el-option>
   </el-select>
   </div>
    <hr class="hr-split">
    <div class="container--selection">
    <h3 class="secondary-heading" >
      Filter by:
    </h3>
     <el-select v-model="FilterByParamteres" placeholder="Select" size="mini">
      <el-option
        v-for="(item, key) in sortBy"
        :key="key"
        :label="item"
        :value="item">
      </el-option>
     </el-select>
     <div v-if="this.$store.state.filterByParamteres === ''">
        <el-popover 
          placement="bottom-start"
          title="Pro tip"
          width="150"
          trigger="hover"
          content="First select the filter, then you can search">
          <el-input placeholder="Search" slot="reference" v-model="SearchWord" size="mini" :disabled="true" /> 
        </el-popover>
     </div>

      <div v-else>
        <el-input placeholder="Search" slot="reference" v-model="SearchWord" size="mini" :disabled="false" /> 
      </div>
    </div>

      <!--
    <SelectComponent :data="sortBy" v-model="sortByParamteres" @selectedSortBy="getSelectedValueSortBy">
          <h2>Sort by</h2>
    </SelectComponent>
      -->
      <div class="container-accommondation">
      <div class="accommondation"
      v-for="(acc,key) in pagination(FilteringAccommondations, this.info)" :key="key" @click="showMoreInfo(acc)">
          <span  v-if="selectedAccommodation === acc"><i class="el-icon-arrow-down"></i></span> 
          <span v-else><i class="el-icon-arrow-right"></i></span>
          <h2 class="secondary-heading-black">Name: {{acc.name}}</h2>
          <hr>
          <h3 class="secondary-heading-black">Price in eur:  {{acc.priceInEur}} €</h3>
          <div v-if="(acc === selectedAccommodation)">
            <h3 class="secondary-heading-black">Address:  {{acc.address}}</h3>
            <h3 class="secondary-heading-black">City:  {{acc.city}}</h3>
            <h3 class="secondary-heading-black">Country:   {{acc.country}}</h3>
            <el-button type="primary" size="mini" class="btn-right" @click="confirmAccommondation">Select</el-button>
          </div>
      </div>
       <el-pagination
        background
        :small="smallPagination"
        layout="prev, pager, next"
        :total="FilteringAccommondations.length" :page-size="11" :hide-on-single-page="true"
        @current-change="handleCurrentChange">
      </el-pagination>
      </div>    
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {Select, Option, Button, Input, Pagination, Popover} from 'element-ui';

export default {
  name: 'Accommondations',
  data: function () {
    return {
      sortBy: ['Name', 'Country', 'Address', 'City'],
      filterByAvaliablity: ['Avaliable', 'Not Avaliable'],
      selectedAccommodation: '',
      currentPageNumber: 1,
      info: {},
      smallPagination: false,
      width: 0,
      loading: true
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Input.name]: Input,
    [Pagination.name]: Pagination,
    [Popover.name]: Popover
  },
  mounted () {
    this.loading = (this.$store.state.filteringAccommondations.length > 0) ? false : false
  },
  methods: {
    ...mapActions(["fetchAccommodations",
     "selectedAccommondation",
     "filteredAccommondations",
     "sortByParamteres", "filteringByAvaliability",
     "filterByParamteres", "searchWord"]),
     handleResize() {
       this.width = window.innerWidth;
     },
     pagination (val, info) {
       if(this.currentPageNumber == 1 || info.switchToNumber == 1){
          return val.slice(0,11) || val.slice(0, val.length)
       }
       let prvo = (info.switchToNumber * info.accPerPage) - 11;
       let drugo = (info.switchToNumber * info.accPerPage);

       return val.slice(prvo, drugo)
     },
    showMoreInfo (item) {
      if(this.selectedAccommodation === null || this.selectedAccommodation === undefined || this.selectedAccommodation === '') {
        this.selectedAccommodation = item;

      } else if (this.selectedAccommodation === item) {
        this.selectedAccommodation = '';
      } else {
        this.selectedAccommodation = item;
      }
    },
    confirmAccommondation () {
      if (this.selectedAccommodation !== null || this.selectedAccommodation === '' || this.selectedAccommodation === undefined) {
        this.selectedAccommondation(this.selectedAccommodation);
        this.$router.push('/Accommondations/Accommondation');
      }
    },
    handleCurrentChange(pageNumber) {
      this.currentPageNumber = pageNumber
      this.info.switchToNumber = pageNumber
      this.info.total = this.FilteringAccommondations.length
      this.info.accPerPage = 11
      this.info.pagesTotal = Math.ceil(this.info.total/this.info.accPerPage)
      this.pagination(this.FilteringAccommondations, this.info)
    }
  },
  created () {
    this.fetchAccommodations();
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  watch: {
    width: function (value) {
      if(value < 771) {
        return this.smallPagination = true
      }
        return this.smallPagination = false
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters(["Accommondations", "FilteringAccommondations",
     "SortByParamteres", "FilteringByAvaliability",
      "FilterByParamteres","SearchWord"]),
    SearchWord: {
      get () {
        if(this.SortByParamteresOption !== '' && this.FilteringAccommondations === ''){
          this.$store.commit('sortByParamteres', this.SortByParamteresOption)
        } else if (this.SortByParamteresOption === '' && this.FilteringAccommondations !== '') {
          this.$store.commit('filteringByAvaliability', this.FilteringByAvaliability)
        } else if (this.SortByParamteresOption !== '' && this.FilteringAccommondations !== '') {
           this.$store.commit('filteringByAvaliability', this.FilteringByAvaliability)
           this.$store.commit('sortByParamteres', this.SortByParamteresOption)
        }
        return this.$store.state.searchWord
      },
      set (value) {
        this.$store.dispatch('searchWord', value)
      }
    },
    SortByParamteresOption: {
      get() {
        return this.$store.state.sortByParamteres
      },
      set(value) {
        return this.$store.dispatch('sortByParamteres', value)
      }
    },
    FilteringByAvaliability: {
      get() {        
        return this.$store.state.filteringByAvaliability
      },
      set(value) {
        if(this.SortByParamteresOption !== '') {
          this.$store.commit('sortByParamteres', this.SortByParamteresOption)
        }
        if(value != this.SortByParamteres) {
          this.$store.commit('searchWord', this.SearchWord)
        }
        return this.$store.dispatch('filteringByAvaliability', value)
      }
    },
    FilterByParamteres: {
      get() {
        return this.$store.state.filterByParamteres
      },
      set(value) {
        return this.$store.dispatch('filterByParamteres', value)
      }
    }
  }
} 
</script>

<style scoped>
 select {
   height:3rem;
   width:20rem;
 }

 .accommondations-main-header {
   text-align:center;
 }

.el-icon-back {
  font-size:40px;
  color:white;
  position: relative;
  top:20px;
  left:20px;
}
 .container-btn {
   position:fixed;
   height:80px;
   width:80px;
   border-radius: 50%;
   background-color: blueviolet;
   right:50px;
   top:30px;
 }

  .container-btn:hover {
    cursor: pointer;
    background-color:purple;
  }

 .container-accommondation {
   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
   margin-top:60px;
 }

.container-img {
  background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80');
  width:100%;
  background-size: cover;
  top:0px; 
  bottom: 0px;
  height: 100%;
  background-repeat: repeat;
  position: absolute;
  overflow-x: hidden;
}

.el-input {
  width:200px;
}
@media only screen and (max-width: 850px) {
.el-icon-back {
  font-size:30px;
  color:white;
  position: relative;
  top:15px;
  left:15px;
}
 .container-btn {
   position:fixed;
   height:60px;
   width:60px;
   border-radius: 50%;
   background-color: blueviolet;
   right:50px;
   top:30px;
 }
}


</style>
