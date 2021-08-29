<template>
  <div>
    {{ name }}
    <input id="inputTxt" v-model="name"/>>
  </div>
</template>
<script>

export default {
  data: () => ({
      //Gldbal하게 사용가능한 변수를 defined (아래의 this.name 처럼 사용)
    name: "david",
  }),
  methods: {
    //function define
    fncName() {
        var _value = null;
        this.name = 'David2';
    },
    fncName2() {
        var _value2 = null;
        this.name = 'David3';

  },
  //document ready
  mounted() {

      //function 호출부
        //this.functionName();
  },
};
</script>
<style>
.main {
  width: "100%";
}
</style>