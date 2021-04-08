<template>
  <a-card>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="delete_success_flag" title="删除失败">
      删除机场信息成功！
    </b-modal>
    <b-modal v-model="delete_false_flag" title="删除失败">
      删除机场信息失败！
    </b-modal>
    <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        :disabled="!hasSelected"
        :loading="loading"
        @click="start()"
      >
        delete
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="airport_infos"
    />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      delete_success_flag:false,
      delete_false_flag:false,
      init_alert: false,
      false_flag: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      airport_infos: [],

      selectedRowKeys: [],
      allSelected: [],

      loading: false,
      columns: [
        {
          title: "起飞机场",
          dataIndex: "start_name",
        },
        {
          title: "到达机场",
          dataIndex: "arrive_name",//index名字
        },
      ],

      form: {
        company_name:'',
        airport_id: "",
        start_name: "",
        arrive_name: "",
      },
    };
  },
   created: function () {
    this.init_company_info();
    this.init_infos();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    init_company_info: function () {
      this.form.company_name = this.$cookies.get("company_name");
    },
    init_infos: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/get_airport_info_api",
        method: "post",
        data: {
            company_name: this.$cookies.get("company_name"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.airport_infos); //TODO
          let airport_infos = [];
          for (let item of data.airport_infos) {
            airport_infos.push(item);
          }
          this.airport_infos = airport_infos;
        } else {
          this.init_alert = true; //TODO
        }
      });
    },

    start: function () {
      this.loading = true;
      setTimeout(() => {
        this.delete_airport_info();
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },

    onSelectChange(selectedRowKeys, allSelected) {
      this.selectedRowKeys = selectedRowKeys;
      this.allSelected = allSelected;
    },

    delete_airport_info: function () {
      let ids = this.allSelected.map((i) => {
        return i.airport_id;
      });
      console.log(ids);
      for (let id of ids) {
        this.$axios({
          url: "http://127.0.0.1:5000/admin/delete_airport_info_api",
          method: "post",
          data: {
            airport_id: id,
          },
        }).then((res) => {
          let data = res.data;
          if (data.success) {
            this.delete_success_flag = true;
            this.init_infos();
          }else{
            this.delete_false_flag = true;
          }
        });
      }
    },
  },
};
</script>

<style>

</style>