import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        allCurrency: {},
        allAccommondations: [],
        selectedCurrency: '',
        choosenAccommondation: '',
        filteringAccommondations: [],
        searchWord: '',
        sortByParamteres: '',
        filteringByAvaliability: '',
        filterByParamteres: ''
    },
    getters: {
        Currency: state => state.allCurrency,
        Accommondations: state => state.allAccommondations,
        SelectedCurrency: state => state.selectedCurrency,
        LengthOfSelectedCurrency: state => state.selectedCurrency.length,
        FilteringAccommondations: state => state.filteringAccommondations,
        CalculatedChoosenCurrency: state => {
            let getCurrency = []
            for (const [key, value] of Object.entries(state.allCurrency)) {
                if(state.selectedCurrency.includes(key)) {
                    let priceIn = Number.parseFloat(state.choosenAccommondation.priceInEur * value).toFixed(2);
                    getCurrency.push({currencyName: key, currencyValue: value, priceInCurrency: priceIn});
                }
            }
          return getCurrency;  
        },
        SortByParamteres: state => state.sortByParamteres,
        FilteringByAvaliability: state => state.filteringByAvaliability,
        FilterByParamteres: state => state.filterByParamteres,
        SearchWord: state => state.searchWord,
        GetChoosenAccommondation: state => state.choosenAccommondation
    },
    actions: {
        async fetchCurrency ({commit}) {
            const respone = await axios.get('https://api.exchangerate-api.com/v4/latest/EUR');
            commit('setCurrency', respone.data.rates)
        },
        async fetchAccommodations ({commit}) {
            const respone = await axios.get('https://5ddbbbd5041ac10014de14d7.mockapi.io/accommodations/prices');
            commit('setAccommondation', respone.data)
        },
        selectedCurrency ({commit}, selectedCurrency) {
            commit('setSelectedCurrency', selectedCurrency)
        },
        selectedAccommondation ({commit}, acc) {
            commit('setChoosenAccommondation', acc)
        },
        sortByParamteres ({commit}, option) {
            commit('sortByParamteres', option)
        },
        filteringByAvaliability({commit}, option) {
            commit('filteringByAvaliability', option)
        },
        filterByParamteres({commit}, option) {
            commit('filterByParamteres', option)
        },
        searchWord({commit}, word) {
            commit("searchWord", word)
        }
    },
    mutations: {
        setCurrency: (state, currency) => (state.allCurrency = currency),
        setAccommondation: (state, accommondations) => {
            state.allAccommondations = accommondations
            state.filteringAccommondations = accommondations
        },
        setSelectedCurrency: (state, selectedCurrency) => (state.selectedCurrency = selectedCurrency),
        setChoosenAccommondation: (state, acc) => (state.choosenAccommondation = acc),
        filteringByAvaliability: (state, option) => {
          if (!(option) || option === '{}') {
            state.filteringByAvaliability = ''
          } else {
            if(state.filteringAccommondations.length === 0 && option.length === 0) {
              state.filteringAccommondations = state.allAccommondations
            }
           state.filteringByAvaliability = option
           state.filteringAccommondations = state.filteringAccommondations.filter(
               x => x.avaliable === (option === 'Avaliable' ? true : false))

         }
        },
        sortByParamteres: (state, option) => {
          if (!(option) || option === '{}') {
          state.sortByParamteres = null
          } else {
           state.sortByParamteres = option
          let byProperty = function(propname) {
            function sortItems(a, b) {
             if (a[propname] == b[propname]) {
              return 0;
            } 
            if(a[propname] < b[propname]){
              return -1;
             } else {
              return 1;
             }
            }
            return sortItems;
          }
        state.filteringAccommondations.sort(byProperty(option.toLowerCase()))
         }
        },
        filterByParamteres: (state, option) => {
          if (!(option) || option === '{}') {
            state.filterByParamteres = null
          } else {
             state.filterByParamteres = option
          }
        },
        searchWord: (state, word) => {
          if (!(word) || word === '{}' || word === null) {
            state.searchWord = ''
            state.filteringAccommondations = state.allAccommondations
          } else {
            state.filteringAccommondations = state.allAccommondations
            state.searchWord = word
              let paramereFunction = (value => {
               return state.filteringAccommondations.filter((e) => {
                return e[value].includes(state.searchWord)
            })})
             state.filteringAccommondations = paramereFunction(state.filterByParamteres.toLowerCase())
          }
        }
    }
});
            