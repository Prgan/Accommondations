<template>
  <div>
     <h1>Page not found</h1>
     {{this.$route.params.id}}
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data: function () {
    return {
      selectedOption: ''
    }
  }
}
</script>

<style scoped>
</style>
