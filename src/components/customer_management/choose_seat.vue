<template>
  <a-card style="text-align: center">
    <div class="first_class" v-if="flight_class_flag == 1">
      <div v-for="i in 5" :key="i">
        <a-row>
          <div
            v-for="j in 4"
            :key="j"
            style="display: inline-block; margin: 7px"
          >
            <b-button
              :variant="
                seats_codes.indexOf((i - 1) * 4 + j) !== -1
                  ? 'danger'
                  : 'outline-primary'
              "
              size="sm"
              class="first_class_seat_button"
              :disabled="
                seats_codes.indexOf((i - 1) * 4 + j) !== -1 ? true : false
              "
              style="width: 40px; text-align: center; display: inline-block"
              @click="get_seat_code( (i - 1) * 4 + j)"
            >
              <div style="display: line-block; font-size: 20px">&#128186;</div>
              <div>{{ (i - 1) * 4 + j }}</div>
            </b-button>
            <span v-if="j == 2" class="blank"></span>
          </div>
        </a-row>
      </div>
    </div>

    <div class="business_class" v-else-if="flight_class_flag == 2">
      <div v-for="i in 5" :key="i">
        <a-row>
          <div
            v-for="j in 4"
            :key="j"
            style="display: inline-block; margin: 7px"
          >
            <b-button
              :variant="
                seats_codes.indexOf((i - 1) * 4 + j + 20) !== -1
                  ? 'danger'
                  : 'outline-primary'
              "
              size="sm"
              class="business_class_seat_button"
              :disabled="
                seats_codes.indexOf((i - 1) * 4 + j + 20) !== -1 ? true : false
              "
              style="width: 40px; text-align: center; display: inline-block"
              @click="get_seat_code( (i - 1) * 4 + j + 20)"
            >
              <div style="display: line-block; font-size: 20px">&#128186;</div>
              <div>{{ (i - 1) * 4 + j + 20}}</div>	
            </b-button>
            <div v-if="j == 2" class="blank"></div>
          </div>
        </a-row>
      </div>
    </div>

    <div class="ecno_class" v-else-if="flight_class_flag == 3">
      <div v-for="i in 5" :key="i">
        <a-row>
          <div
            v-for="j in 4"
            :key="j"
            style="display: inline-block; margin: 7px"
          >
            <b-button
              :variant="
                seats_codes.indexOf((i - 1) * 4 + j + 40) !== -1
                  ? 'danger'
                  : 'outline-primary'
              "
              size="sm"
              class="ecno_class_seat_button"
              :disabled="
                seats_codes.indexOf((i - 1) * 4 + j + 40) !== -1 ? true : false
              "
              style="width: 40px; text-align: center; display: inline-block"
              @click="get_seat_code( (i - 1) * 4 + j + 40)"
            >
              <div style="display: line-block; font-size: 20px">&#128186;</div>
              <div>{{ (i - 1) * 4 + j + 40}}</div>
            </b-button>
            <span v-if="j == 2" class="blank"></span>
          </div>
        </a-row>
      </div>
    </div>

    <div>
      <p>当前选中的座位号：{{this.seat_code}}</p>
    </div>

    <div>
      <a-button @click="add_seat()">选座</a-button>
    </div>

  </a-card>
</template>

<script>
export default {
  data: function () {
    return {
      flight_class_flag: 0,
      ticket_class:'',
      seat_code:"",
      seats:[],
    };
  },
  methods: {
    init_info: function () {
      this.ticket_class = this.$cookies.get("ticket_class");
      if(this.ticket_class=='经济舱'){
        this.flight_class_flag = 1;
      }
      if(this.ticket_class=='商务舱'){
        this.flight_class_flag = 2;
      }
      if(this.ticket_class=='头等舱'){
        this.flight_class_flag = 3;
      }
    },

    init_seats: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/get_all_seats_api",
        method: "post",
        data: {
          flight_id: this.$cookies.get("flight_id"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.seats = data.seats_info;
          console.log(this.seats);
        } else {
          //报错、、、、、、、、、、、、、、、、、、、、、、、、、、、、
        }
      });
    },

    add_seat:function(){
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/add_seat_api",
        method: "post",
        data: {
          customer_username:this.$cookies.get("username"),
          flight_id:this.$cookies.get("flight_id"),
          ticket_class:this.$cookies.get("ticket_class"),
          seat_code:this.seat_code
        },
      }).then((res) => {
        let data = res.data;
        if(data.success){
          console.log('选座成功')
          this.$router.push('/success_ticket')
          //TODO
        }
      });
    },
    get_seat_code:function(seat_code){
      this.seat_code = seat_code
    },
  },
  computed:{
    seats_codes() {
      let codes = this.seats.map((m) => {
        return m.seat_code;
      });
      return codes;
    },
  },
  created:function(){
    this.init_info();
    this.init_seats();
  }
};
</script>

<style>
.blank {
  display: inline-block;
  width: 30px;
}
</style>