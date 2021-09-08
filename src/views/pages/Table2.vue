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
    <v-lazy-image src="https://firebasestorage.googleapis.com/v0/b/studyfirebaseandvue.appspot.com/o/000000.jpg?alt=media&token=44a4f6fc-ea9f-469e-a9b0-e05c9986e26b" class="lazy" />
    <vx-card title="테이블 테스트">
      <a-table :columns="columns" :data-source="data">
        <template slot="img" slot-scope="record">
          <img
            v-if="record.img"
            :src="record.img"
            style="width: 50px; height: 50px"
          />
          <!-- <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
                >Edit</a
              > -->
        </template>
        <template slot="operation" slot-scope="record">
          <button @click="() => edit(record)">선택</button>
        </template>
      </a-table>
    </vx-card>

    <div>
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUploadExcel"
      />
    </div>
    <div>
      <a-button plain size="large" @click="onExportExcel()"
        >결과 다운로드</a-button
      >
    </div>

    <vx-card title="데이터 입력" style="margin-top: 20px">
      <div style="display: flex; margin-bottom: 10px">
        <vs-input
          class="inputx"
          style="margin-left: 5px"
          placeholder="Name"
          v-model="name"
        />
        <vs-input
          class="inputx"
          style="margin-left: 5px"
          placeholder="Age"
          v-model="age"
        />
        <vs-input class="inputx" placeholder="Address" v-model="address" />
      </div>

      <vs-button size="small" @click="onAddData()"> 데이터 추가 </vs-button>
      <vs-button size="small" style="margin-left: 5px" @click="onUpdateData()">
        데이터 업데이트
      </vs-button>
      <vs-button size="small" style="margin-left: 5px" @click="onDeleteData()">
        데이터 삭제
      </vs-button>

      <div style="margin-top: 5px; margin-bottom: 5px">이미지 업로드</div>
      <div class="col-md-10" style="margin-bottom: 10px" v-if="key">
        <a-upload
          :fileList="fileList"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 업로드 </a-button>
        </a-upload>
        <img :src="img" style="width: 50px; height: 50px" />
      </div>
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
import UploadExcelComponent from "../components/UploadExcel/index.vue";
import XLSX from "xlsx";
import FileSaver from "file-saver";

 import VLazyImage from "v-lazy-image";

export default {
  data() {
    return {
      fileList: [],
      key: "",
      img: "",
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
          title: "img",
          key: "img",
          scopedSlots: { customRender: "img" },
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
    var _t = this.$cookies.get("ignoreAlert");
    if (_t) {
      //skip
      console.log(this.$cookies.get("ignoreAlert"));
    } else {
      //do something
      alert("공지 사항");
      this.$cookies.config("7d");
      this.$cookies.set("ignoreAlert", "T");
    }

    this.onLoadData();
  },
  components: {
    VLazyImage,
    UploadExcelComponent,
  },
  methods: {
    onExportExcel() {
      var date = new Date();
      var e1 = [["이름", "나이", "주소", "이미지"]];
      var wb = XLSX.utils.book_new();
      this.data.forEach((item) => {
        e1.push([item.name, item.age, item.address, item.img]);
      });
      var ws1 = XLSX.utils.aoa_to_sheet(e1);
      XLSX.utils.book_append_sheet(wb, ws1, "데이타");
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream",
          }),
          "인프런-교육-엑셀다운-" + date.getTime() + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSuccess({ results, header }) {
      this.data = [];
      var self = this;
      results.forEach((item) => {
        var _t = {
          name: item["name"],
          age: item["age"],
          address: item["address"],
          img: item["img"],
        };
        self.data.push(_t);
      });
    },
    beforeUploadExcel(file) {
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (isLt1M) {
        return true;
      }
      alert("화일 사이즈가 10M 이하인 화일만 허용합니다.");
      return false;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleChange(info) {
      if (info.file.status === "removed") {
        this.handleRemove();
      } else {
        this.createFile(info.file, 0);
      }
    },
    handleRemove(file) {
      this.fileList = [];
      this.img = "";
    },
    createFile(file, idx) {
      if (!file.type.match("image.*")) {
        alert("이미지 파일을 선택해주세요.");
        this.handleRemove(file);
        return;
      } else {
        // var img = new Image(); var reader = new FileReader();
        var reader = new FileReader();
        var vm = this;

        reader.onload = function (e) {
          // vm.image = e.target.result;
          vm.saveToFirebaseStorage(e, file, idx);
        };
        reader.readAsDataURL(file);
      }
    },
    saveToFirebaseStorage(evt, items, idx) {
      var _key = new Date().getTime() + idx;
      var self = this;
      var storage = firebase.storage();
      var storageRef = firebase.storage().ref();
      var _name = items.name.replace(
        /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g,
        ""
      );
      var user = firebase.auth().currentUser;
      var uploadTask = storageRef
        .child("data/" + user.uid + "/" + _key + "/" + _name)
        .put(items);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running' console.log("Upload is running");
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            self.img = downloadURL;
          });
        }
      );
    },
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
          img: self.img,
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
      this.img = r.img;
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
          item.img = self.img;
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
            img: self.img,
          })
          .then(function (mRef) {
            var _t = {
              uid: user.uid,
              name: self.name,
              age: self.age,
              address: self.address,
              img: self.img,
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


