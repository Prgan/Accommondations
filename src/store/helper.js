function propComparator (propname) {
        /* eslint-disable no-console */
            alert('k')
            console.log(propname);
      /* eslint-enable no-console */
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

export {propComparator};