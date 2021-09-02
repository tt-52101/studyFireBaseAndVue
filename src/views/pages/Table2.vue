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
      <a-table :columns="columns" :data-source="data">
        <template slot="operation" slot-scope="record">
          <button  @click="() => edit(record)"" >선택</button>
              <!-- <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
                >Edit</a
              > -->
          
        </template>
      </a-table>
    </vx-card>
    <vx-card title="데이터 입력" style="margin-top: 20px">
      <vs-input class="inputx" placeholder="Name" v-model="name" />
      <vs-input class="inputx" placeholder="Age" v-model="age" />
      <vs-input class="inputx" placeholder="Address" v-model="address" />
      <vs-button size="small" @click="onAddData()"> 데이터 추가 </vs-button>
      <vs-button size="small" @click="onUpdateData()">
        데이터 업데이트
      </vs-button>
            <vs-button size="small" @click="onDeleteData()">
        데이터 삭제
      </vs-button>
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
      key: "",
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
        {
          title: "action",
          key: "action",
          scopedSlots: { customRender: "operation" }, //action이라는 컬럼을 operation이란 이름으로 렌더링
        },
      ],
      data: [],
    };
  },
  mounted() {
    this.onLoadData();
  },
  methods: {
    onUpdateData() {
      var db = firebase.firestore();
      var _ref = db.collection("bbs").doc(this.key);
      var self = this;

      // Set the "capital" field of the city 'DC'
      _ref
        .update({
          name: self.name,
          age: self.age,
          address: self.address,
        })
        .then(() => {
          self.onRefreshData();
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    edit(r) {
      this.name = r.name;
      this.age = r.age;
      this.address = r.address;
      this.key = r.key;
    },
    onInitData() {
      this.key = "";
      this.name = "";
      this.age = "";
      this.address = "";
    },
    onRefreshData() {
      //업데이트용 딜리트용 각각 만들어줌(?)
      var self = this;
      this.data = this.data.filter((item) => {
        if (item.key == self.key) {
          item.name = self.name;
          item.age = self.age;
          item.address = self.address;
        }
        return item;
      });
      onInitData();
    },
    onLoadData() {
      var db = firebase.firestore();
      var self = this;
      this.data = [];
      db.collection("bbs")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var _t = doc.data();

            _t["key"] = doc.id;
            self.data.push(_t);
          });
        });
    },
    onPopupData() {
      var self = this;
      this.data = this.data.filter((item) => {
        return item.key != this.key;
      });
      this.onInitData();
    },
    onDeleteData() {
      var self = this;
      var db = firebase.firestore();
      db.collection("bbs")
        .doc(this.key)
        .delete()
        .then(() => {
          self.onPopupData();
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    onAddData() {
      var db = firebase.firestore();
      var self = this;
      var user = firebase.auth().currentUser; //user의 세션이 있으면
      if (user) {
        db.collection("bbs")
          // .doc("testDoc") // 특정 레코드 위에 생성하고 싶을때doc-set 을 같이 사용, 참조 : https://firebase.google.com/docs/firestore/manage-data/add-data
          // .set(
          //set을 쓸 때는 엎어치는 것이기 때문에 주의!
          //.add( //데이터 추가시 doc-set 랑 별도로 사용
          .add({
            uid: user.uid,
            name: self.name,
            age: self.age,
            address: self.address,
          })
          .then(function (mRef) {
            var _t = {
              uid: user.uid,
              name: self.name,
              age: self.age,
              address: self.address,
            };

            _t["key"] = mRef.id;
            self.data.push(_t);
            self.onLoadData(); //this.onLoadData() 라고 쓰면 내부 this와 구분을 못해서 오류가 발생
          });
      }
    },
  },
};
</script>
