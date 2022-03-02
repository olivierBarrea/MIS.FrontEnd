<template>
  <div class="card">
    <i class="align-middle"
      ><img class="img-resize" src="../assets/image/XRayImage1.png"
    /></i>

    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <div>
          <a>Product ID</a><a class="value"> 123-46-12</a><br />
          <a>Batch Nr</a><a class="value">456</a><br />
          <a>TimeStamp</a><a class="value">2021-10-11 12:29:03</a><br />
        </div>
      </li>
      <li class="list-group-item">
        <a>Defetct</a><a class="value">in house developement - no need for outsourcing</a><br />
        <a>Delta</a><a class="value">0.456</a><br />
      </li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <div class="card-body">
      <button type="button" class="btn btn-primary">Show details</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
};
</script>

<style scoped>

a{
  float: left;
}

.card {
  width: 25rem;
  border-top-color: greenyellow;
  border-top-width: 5px;
}

img {
  margin: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

button {
  width: 100%;
  margin: 0%;
}

.value {
  float: right;
  text-decoration: none;
  font-weight: bold;
  color: black;
}
</style>
