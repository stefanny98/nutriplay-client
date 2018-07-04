<template>
  <div class="content">
    <h1>Página no encontrada</h1>
  </div>
</template>

<script>
export default {}
</script>
<style scoped>
.content {
    width: 500px;
    height: 300px;

    position:fixed; /*it can be fixed too*/
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;

    /*this to solve "the content will not be cut when the window is smaller than the content": */
    max-width:100%;
    max-height:100%;
    overflow:auto;
}
</style>
