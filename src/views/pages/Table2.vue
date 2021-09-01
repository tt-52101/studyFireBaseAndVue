<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div>
    <vx-card title="테이블 테스트">
      <a-table :columns="columns" :data-source="data"></a-table>
    </vx-card>
    <vx-card title="데이터 입력" style="margin-top: 20px">
      <vs-input class="inputx" placeholder="Name" v-model="name" />
      <vs-input class="inputx" placeholder="Age" v-model="age" />
      <vs-input class="inputx" placeholder="Address" v-model="address" />
      <vs-button size="small" @click="onAddData()"> 데이터 추가 </vs-button>
    </vx-card>
  </div>
</template>
<script>
// 'id': 1,
// 'name': 'Leanne Graham',
// 'username': 'Bret',
// 'email': 'Sincere@april.biz',
// 'website': 'hildegard.org'

import firebase from "firebase";
export default {
  data() {
    return {
      name: "",
      age: "",
      address: "",
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address 1",
        },
      ],
      data: [],
    };
  },
  methods: {
    onAddData() {
      var db = firebase.firestore();
      var self = this;
      var user = firebase.auth().currentUser; //user의 세션이 있으면
      if (user) {
        db.collection("bbs")
          .doc("testDoc") // 특정 레코드 위에 생성하고 싶을때doc-set 을 같이 사용, 참조 : https://firebase.google.com/docs/firestore/manage-data/add-data
          .set( //set을 쓸 때는 엎어치는 것이기 때문에 주의!
          //.add( //데이터 추가시 doc-set 랑 별도로 사용
            {
              uid: user.uid,
              name: self.name,
              age: self.age,
              address: self.address,
            }
          )
          .then(function () {
            alert("성공적으로 적용 되었습니다.");
          });
      }
    },
  },
};
</script>
