<!-- HTML Template -->
<template>
<div>
    <div class="btn btn-lg btn-block">Submitted!</div>
    <router-link to="upload"><a class="btn btn-primary btn-lg btn-block" role="button">Submit more!</a></router-link>
</div>
</template>

<!-- Javascript -->
<script>
export default {
  name: 'oct-table-extraction'
}
</script>

<!-- SASS styling -->
<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    // background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .white {
    color: white;
  }

  .with-margin {
    margin-top: 3%;
    margin-bottom: 0.5%;
  }

  .form {
    width: 47%;
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
  }
</style>
