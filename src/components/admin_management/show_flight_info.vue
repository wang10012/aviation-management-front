<template>
  <a-card style="overflow-x: hidden">
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="delete_success_flag" title="删除失败">
      删除航班信息成功！
    </b-modal>
    <b-modal v-model="delete_false_flag" title="删除失败">
      删除航班信息失败！
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
    <div style="overflow-x: auto">
        <a-table
        style="width: 1900px"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="flight_infos"
    />
    </div>
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
      flight_infos: [],

      selectedRowKeys: [],
      allSelected: [],

      loading: false,
      columns: [
        {
          title: "公司名",
          dataIndex: "company_name",
        },
        {
          title: "航班号",
          dataIndex: "flight_id",
        },
        {
          title: "出发时间",
          dataIndex: "start_time",
        },
        {
          title: "到达时间",
          dataIndex: "arrive_time",
        },
        {
          title: "头等舱价格",
          dataIndex: "first_class_price",
        },
        {
          title: "商务舱价格",
          dataIndex: "business_class_price",
        },
        {
          title: "经济舱价格",
          dataIndex: "economy_class_price",
        },
        {
          title: "剩余位置数量",
          dataIndex: "num_remain_seat",
        },
        {
          title: "剩余头等舱座位数",
          dataIndex: "num_remain_first_class",
        },
        {
          title: "剩余商务舱座位数",
          dataIndex: "num_remain_business_class",
        },
        {
          title: "剩余经济舱座位数",
          dataIndex: "num_remain_economy_class",
        },
        {
          title: "航线号",
          dataIndex: "airline_id",
        },
        {
          title: "机场号",
          dataIndex: "airport_id",
        },
        {
          title: "飞机型号",
          dataIndex: "plane_id",
        },
      ],

      form: {
        company_name: "",
        flight_id: "",
        start_time: "",
        arrive_time: "",
        first_class_price: "",
        business_class_price: "",
        economy_class_price: "",
        num_remain_seat: "",
        num_remain_first_class: "",
        num_remain_business_class: "",
        num_remain_economy_class: "",
        air_line_id: "",
        airport_id: "",
        plane_id: "",
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
        url: "http://127.0.0.1:5000/admin/get_company_flight_infos_api",
        method: "post",
        data: {
            company_name: this.$cookies.get("company_name"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.flight_infos); //TODO
          let flight_infos = [];
          for (let item of data.flight_infos) {
            flight_infos.push(item);
          }
          this.flight_infos = flight_infos;
        } else {
          this.init_alert = true; //TODO
        }
      });
    },

    start: function () {
      this.loading = true;
      setTimeout(() => {
        this.delete_flight_info();
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },

    onSelectChange(selectedRowKeys, allSelected) {
      this.selectedRowKeys = selectedRowKeys;
      this.allSelected = allSelected;
    },

    delete_flight_info: function () {
      let ids = this.allSelected.map((i) => {
        return i.flight_id;
      });
      console.log(ids);
      for (let id of ids) {
        this.$axios({
          url: "http://127.0.0.1:5000/admin/delete_flight_info_api",
          method: "post",
          data: {
            flight_id: id,
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