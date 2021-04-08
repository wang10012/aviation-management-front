<template>
  <a-card>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="delete_success_flag" title="删除失败">
      删除航线信息成功！
    </b-modal>
    <b-modal v-model="delete_false_flag" title="删除失败">
      删除航线信息失败！
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
      :data-source="company_airline_infos"
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
      company_airline_infos: [],

      selectedRowKeys: [],
      allSelected: [],

      loading: false,
      columns: [
         {
          title: "公司名",
          dataIndex: "company_name",
        },
        {
          title: "航线号",
          dataIndex: "airline_id",
        },
      ],

      form: {
        company_airline_id:'',
        company_name:'',
        airline_id:''
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
        url: "http://127.0.0.1:5000/admin/get_company_airline_info_api",
        method: "post",
        data: {
            company_name: this.$cookies.get("company_name"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.company_airline_infos); //TODO
          let company_airline_infos = [];
          for (let item of data.company_airline_infos) {
            company_airline_infos.push(item);
          }
          this.company_airline_infos = company_airline_infos;
        } else {
          this.init_alert = true; //TODO
        }
      });
    },

    start: function () {
      this.loading = true;
      setTimeout(() => {
        this.delete_airline_info();
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },

    onSelectChange(selectedRowKeys, allSelected) {
      this.selectedRowKeys = selectedRowKeys;
      this.allSelected = allSelected;
    },

    delete_airline_info: function () {
      let ids = this.allSelected.map((i) => {
        return i.company_airline_id;
      });
      console.log(ids);
      for (let id of ids) {
        this.$axios({
          url: "http://127.0.0.1:5000/admin/delete_company_airline_info_api",
          method: "post",
          data: {
            company_airline_id: id,
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