<template>
  <div class="container">
    <h2 class="message">YOUR TICKET</h2>
    <div>
      <a-button class="drop_ticket_button" @click="drop_ticket()"
        >退票</a-button
      >
    </div>
    <b-modal v-model="drop_success_flag" title="删除成功">退票成功!</b-modal>
    <b-modal v-model="drop_false_flag" title="删除失败"> 退票失败！ </b-modal>
    <!-- <div>
      Choosed: <strong>{{ choosed }}</strong>
    </div> -->
    <div
      class="ticketDetails"
      style="width: 100%"
      v-for="(item, index) in tickets"
      :key="index"
    >
      <!-- <b-form-checkbox
        class="checkbox"
        v-model="choosed"
        :value="item.ticket_id"
      ></b-form-checkbox> -->
      <div :key="index" class="flightDet">
        <scriptLink></scriptLink>
        <div class="partner">
          <div>
            <b-form-checkbox
              style="display: inline;"
              v-model="choosed"
              :value="item.ticket_id"
            ></b-form-checkbox>
            <strong>{{ item.flight_id }}</strong>
          </div>
          座位号：
          <h5 style="display: inline">{{ item.seat_code }}</h5>
        </div>
        <div class="source">
          <div class="day">{{item.airline_date}}</div>
          <span class="place">{{ item.start }}</span>
          <span class="time">{{ item.start_time }}</span>
        </div>
        <div class="duration">
          <span class="circle icon"><i class="fas fa-circle"></i></span>
          <span class="timeDur">
            <span style="font-size: 1.5em">{{ item.ticket_pay_price }}元</span>
          </span>
          <span class="flightTo icon"><i class="fas fa-fighter-jet"></i></span>
        </div>
        <div class="destination">
          <div class="day">{{ item.airline_date }}</div>
          <span class="place">{{ item.destination }}</span>
          <span class="time">{{ item.arrive_time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    scriptLink: {
      render(createElement) {
        return createElement("script", {
          attrs: {
            type: "text/javascript",
            src: "https://kit.fontawesome.com/e4649f5499.js",
          },
        });
      },
    },
  },
  data: function () {
    return {
      drop_success_flag: false,
      drop_false_flag: false,

      tickets: [],
      choosed: [],
      ticket_id: "",
      flight_id: "",
      ticket_class: "",
      ticket_pay_price: "",
      start_time: "",
      arrive_time: "",
      start: "",
      destination: "",
      airline_date: "",
      plane_id: "",
      start_airport_name: "",
      arrive_airport_name: "",
      seat_code: "",
    };
  },
  methods: {
    ticket_show: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/get_ticket_api",
        method: "post",
        data: {
          username: this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          console.log(data.tickets_info); //TODO
          let tickets = [];
          for (let item of data.tickets_info) {
            tickets.push(item);
          }
          this.tickets = tickets;
        } else {
          this.alert = true; //TODO
        }
      });
    },
    drop_ticket: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/ticket/drop_ticket_api",
        method: "post",
        data: {
          choosed: this.choosed,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.drop_success_flag = true;
          this.ticket_show();
        } else {
          this.drop_false_flag = true;
        }
      });
    },
  },
  created: function () {
    this.ticket_show();
  },
};
</script>

<style>
.place {
  margin-right: 10px;
  font-weight: 1000;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  background: #f5f5f5;
  min-height: 100vh;
}

.message {
  text-align: center;
  font-style: italic;
  color: orange;
}

.ticketDetails {
  padding: 2rem;
}
.ticketDetails > * {
  float: left;
}

.flightDet {
  display: grid;
  width: calc(100% - 50px);
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1rem;
  margin-bottom: 2rem;
  background: white;
  align-items: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}

.flightDet:last-child {
  margin-bottom: 0;
}

.flightDet > div {
  margin: 5px;
  text-align: center;
}

.time {
  font-weight: 900;
}

.day {
  font-size: 0.75rem;
  color: grey;
}

.duration {
  position: relative;
  text-align: center;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  z-index: 1;
}

.duration::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 50%;
  width: 95%;
  border-top: 1px dashed lightgrey;
}

.duration span {
  vertical-align: middle;
}

.icon {
  content: "fas fa-circle";
  font-size: 0.4rem;
  color: #366db0;
}

.flightTo.icon {
  font-size: 0.8rem;
}

.timeDur span {
  background: white;
  padding: 0 10px;
}
</style>