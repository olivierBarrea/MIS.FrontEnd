<template>
  <div class="container-fluid bg-white border rounded">
    <div class="row">
      <div class="col-lg-4 mt-3">
        <img
          class="img-fluid img-responsive rounded product-image"
          src="../assets/image/XRayImage1.png"
        />
      </div>
      <div class="col-lg-4 mt-4">
        <div class="d-flex flex-row">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div>
                <h6>Product ID</h6>
                <h3 class="value">123-46-12</h3>
                <br />
                <h6>Batch Nr</h6>
                <h3 class="value">456</h3>
                <br />
                <h6>TimeStamp</h6>
                <h3 class="value">2021-10-11 12:29:03</h3>
                <br />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-4 mt-4">
        <div class="d-flex flex-row">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h6>Defetct</h6><h3 class="value">in house developement - no need for outsourcing</h3
              ><br />
              <h6>Delta</h6><h3 class="value">0.456</h3><br />
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
body {
  background: #eee;
}

.ratings i {
  font-size: 16px;
  color: red;
}

.strike-text {
  color: red;
  text-decoration: line-through;
}

.product-image {
  width: 300px;
}

.dot {
  height: 7px;
  width: 7px;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 3px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
}

.spec-1 {
  color: #938787;
  font-size: 15px;
}

h5 {
  font-weight: 400;
}

.para {
  font-size: 16px;
}
</style>