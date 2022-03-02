<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col mt-0">
            <h5 class="card-title">{{cardTitle}}</h5>
          </div>

          <div class="col-auto">
            <div class="stat text-primary">
              <i class="align-middle"><img src="{{icon}}"/></i>
            </div>
          </div>
        </div>
        <h1 class="mt-1 mb-3">{{value}}</h1>
        <div class="mb-0">
          <span class="text-danger">
            <i class="mdi mdi-arrow-bottom-right"></i> {{evolution}}
          </span>
          <span class="text-muted"> Since last week</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  Comment: {},
  props:
  {
      cardTitle : String,
      value : String,
      evolution : String,
      icon : String


  },
};
</script>
<style scoped>

</style>
