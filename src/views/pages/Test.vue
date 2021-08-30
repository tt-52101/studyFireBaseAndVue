<template>
  <div class="main">
    {{ name }}
    <input v-model="name" />
    <button @click="viewName()" > view</button> 
  </div>
</template>
<script>

export default {
  data: () => ({
      //Gldbal하게 사용가능한 변수를 defined (아래의 this.name 처럼 사용)
    name: "david",
    array : []
  }),
  methods: {
    //function define
    viewName(){
      console.log(this.name)
    },
    fncName() {
        var _idx1 = 0;
        this.name = "David2";
    },
    fncName2() {
        var _idx2 = 0;
        this.name = "David3";
    }
  },
  //document ready
  mounted() {
      //function 호출부
        //this.functionName();
       this.fncName2();
  },
}
</script>

<style>
.main {
  width: "100%";
}
</style>