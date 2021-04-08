<template>
  <div>
    <b-modal v-model="false_flag" title="订票失败">
      您已经购买过本航班机票！
    </b-modal>
    <li class="flight_show_card" v-for="(item,index) in flights" :key="index">
      <a-card :bordered="false">
        <a-card-grid style="width: 25%; text-align: center">
          {{ item.air_company_name }}
          {{ item.flight_id }}
          {{ item.plane_id }}
        </a-card-grid>
        <a-card-grid style="width: 37.5%; text-align: center">
          {{ item.start_time }}
          {{ item.arrive_time }}
          {{ item.start_airport_name }}
          {{ item.arrive_airport_name }}
        </a-card-grid>
        <a-card-grid style="width: 18.75%; text-align: center">
          价格{{ item.lowest_price }}起
          余票：{{item.num_remain_seat}}
        </a-card-grid>
        <a-card-grid
          style="
            width: 18.75%;
            text-align: center;
            padding: 0;
            height: 69px;
            line-height: 69px;
            vertical-align: center;
          "
        >
          <div v-if="item.is_info_completed">
            <a-button icon="search" @click="item.choose_class_flag = !item.choose_class_flag" style="color: #ffc554">
              订票
            </a-button>
          </div>
          <div v-else>
            <a-button icon="search" @click="warn_complete_info_flag = true" style="color: #ffc554">
              订票
            </a-button>
            <b-modal v-model="warn_complete_info_flag" title="您的信息未完善"> 请进入个人信息管理界面完善自己的个人信息！</b-modal>
          </div>
        </a-card-grid>
      </a-card>

      <div v-if="item.choose_class_flag">
        <div>
          <a-card :bordered="false">
            <a-card-grid style="width: 81.25%; text-align: center">
              经济舱：{{ item.lowest_price }}
              余票量：{{item.num_remain_economy_class}}
            </a-card-grid>
            <a-card-grid
              style="
                width: 18.75%;
                text-align: center;
                padding: 0;
                height: 69px;
                line-height: 69px;
                vertical-align: center;
              "
            >
              <a-button @click="book_econ_ticket(item)" icon="search"> 预定 </a-button>
            </a-card-grid>
          </a-card>
        </div>
        <div>
          <a-card :bordered="false">
            <a-card-grid style="width: 81.25%; text-align: center">
              商务舱：{{ item.business_class_price }}
              余票量：{{item.num_remain_business_class}}
            </a-card-grid>
            <a-card-grid
              style="
                width: 18.75%;
                text-align: center;
                padding: 0;
                height: 69px;
                line-height: 69px;
                vertical-align: center;
              "
            >
              <a-button @click="book_business_ticket(item)" icon="search"> 预定 </a-button>
            </a-card-grid>
          </a-card>
        </div>
        <div>
          <a-card :bordered="false">
            <a-card-grid style="width: 81.25%; text-align: center">
              头等舱：{{ item.first_class_price }}
              余票量：{{item.num_remain_first_class}}
            </a-card-grid>
            <a-card-grid
              style="
                width: 18.75%;
                text-align: center;
                padding: 0;
                height: 69px;
                line-height: 69px;
                vertical-align: center;
              "
            >
              <a-button @click="book_first_ticket(item)" icon="search"> 预定 </a-button>
            </a-card-grid>
          </a-card>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  data: function () {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      today: today,

      false_flag : false,
      warn_complete_info_flag:false,
      // warn_ticketed_info_flag:false,
      is_info_completed: true,
      // is_ticketed: false,
      choose_class_flag: false,

      flights: [],
      air_company_name: "",
      flight_id: "",
      start_time: "",
      arrive_time: "",
      plane_id: "",
      start_airport_name: "",
      arrive_airport_name: "",
      lowest_price: "",
      business_class_price: "",
      first_class_price: "",

      num_remain_seat:'',
      num_remain_first_class:'',
      num_remain_business_class:'',
      num_remain_economy_class:''
    };
  },
  methods: {
    // check_is_ticketed:function(item){
    //   this.$axios({
    //     url: "http://127.0.0.1:5000/ticket/is_ticketed_api",
    //     method: "post",
    //     data: {
    //       customer_username:this.$cookies.get("username"),
    //       flight_id:this.flight_id
    //     },
    //   }).then((res) => {
    //     let data = res.data;
    //     if(data.success){
    //       item.is_ticketed = true;
    //     }
    //   });
    // },
    check_info_completed:function(item){
      this.$axios({
        url: "http://127.0.0.1:5000/customer/is_completed_per_info_api",
        method: "post",
        data: {
          customer_username:this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if(data.success){
          item.is_info_completed = true;
        }
      });
    },

    book_econ_ticket:function(item){
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/book_ticket_api",
        method: "post",
        data: {
          customer_username:this.$cookies.get("username"),//TODO?????注意this和传入的形参
          flight_id:item.flight_id,
          ticket_book_date:this.today,//TODO
          ticket_standard_price:item.lowest_price,//TODO
          ticket_class:"经济舱"//TODO
        },
      }).then((res) => {
        let data = res.data;
        if(data.success){
          console.log('经济舱订票成功')
          this.$cookies.set("flight_id", item.flight_id);
          this.$cookies.set("ticket_class", "经济舱");
          this.$router.push('/choose_seat')
        }else{
          this.false_flag = true;
        }
      });
    },

    book_business_ticket:function(item){
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/book_ticket_api",
        method: "post",
        data: {
          customer_username:this.$cookies.get("username"),//TODO
          flight_id:item.flight_id,
          ticket_book_date:this.today,//TODO
          ticket_standard_price:item.business_class_price,//TODO
          ticket_class:"商务舱"//TODO
        },
      }).then((res) => {
        let data = res.data;
        if(data.success){
          console.log('商务舱订票成功')
          this.$cookies.set("flight_id", item.flight_id);
          this.$cookies.set("ticket_class", "商务舱");
          this.$router.push('/choose_seat')
        }else{
          this.false_flag = true;
        }
      });
    },

    book_first_ticket:function(item){
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/book_ticket_api",
        method: "post",
        data: {
          customer_username:this.$cookies.get("username"),//TODO
          flight_id:item.flight_id,
          ticket_book_date:this.today,//TODO
          ticket_standard_price:item.first_class_price,//TODO
          ticket_class:"头等舱"//TODO
        },
      }).then((res) => {
        let data = res.data;
        if(data.success){
          console.log('头等舱订票成功')
          this.$cookies.set("flight_id", item.flight_id);
          this.$cookies.set("ticket_class", "头等舱");
          this.$router.push('/choose_seat')
        }else{
          this.false_flag = true;
        }
      });
    },

    fligth_show: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/air/get_flight_api",
        method: "post",
        data: {
          start: this.$cookies.get("start"),
          destination: this.$cookies.get("destination"),
          airline_date: this.$cookies.get("airline_date"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.flight_info);//TODO
          let flights = [];
          for (let item of data.flight_info) {
            this.check_info_completed(item);
            item.choose_class_flag = false;
            flights.push(item);
            // this.check_info_completed(item);
          }
          this.flights = flights;
        } else {
          this.alert = true; //TODO
        }
      });
    },
  },
  created: function () {
    this.fligth_show();
  },
};
</script>

<style>

</style>