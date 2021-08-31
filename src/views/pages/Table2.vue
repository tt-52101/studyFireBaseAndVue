<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="Striped" >
    <a-table :columns="columns" :data-source="data">
    </a-table>
  </vx-card>
</template>
<script>
// 'id': 1,
// 'name': 'Leanne Graham',
// 'username': 'Bret',
// 'email': 'Sincere@april.biz',
// 'website': 'hildegard.org'

export default {
  data() {
    return {
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
          width: 80,
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address 1",
          ellipsis: true,
        },
      ],
      data: [],
    };
  },
};
</script>
