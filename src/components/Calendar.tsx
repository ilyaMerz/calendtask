import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "../shims-vue";
import { useStore } from "vuex-simple";
import { MyStore } from "../store/store";

import styles from "./Calendar.css?module";

interface Props {}
@Component
export default class Calendar extends VueComponent<Props> {
  public store: MyStore = useStore(this.$store);

  public pushDayToStore(day) {
    this.store.calend.setDays(day);
  }

  public selectDayStore(e) {
    this.store.calend.selectDay(e.target.id);
  }

  public get daysInStore() {
    return this.store.calend.getDays;
  }

  date = new Date();
  today = this.date.getDate();
  year = this.date.getUTCFullYear();
  month = this.date.getMonth();
  monthWord =
    this.date
      .toLocaleDateString("ru-RU", { month: "long" })
      .charAt(0)
      .toUpperCase() +
    this.date.toLocaleDateString("ru-RU", { month: "long" }).slice(1);

  montStartsWeekDay = new Date(this.year, this.month).getDay();
  lastMonthDay = new Date(this.year, this.month + 1, 0).getDate();
  weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Cб", "Вс"];
  dateStr: string = this.year + "_" + this.month + "_";

  created() {
    //создадим массив с примерами задач
    for (let i = 1; i <= this.lastMonthDay + 1; i++) {
      if (i == this.today + 1) {
        let obj = {};
        obj.date = this.dateStr + i;
        obj.selected = true;
        obj.tasks = [];
        this.pushDayToStore(obj);
      } else if (i === 18) {
        let obj = {};
        obj.date = this.dateStr + i;
        obj.selected = false;
        obj.tasks = [{ task: "сделать важное дело", done: false }];
        this.pushDayToStore(obj);
      } else if (i === 27) {
        let obj = {};
        obj.date = this.dateStr + i;
        obj.selected = false;
        obj.tasks = [
          { task: "сделать нечто прекрасное", done: false },
          { task: "съесть пирожок", done: true }
        ];
        this.pushDayToStore(obj);
      } else {
        let obj = {};
        obj.date = this.dateStr + i;
        obj.selected = false;
        obj.tasks = [];
        this.pushDayToStore(obj);
      }
    }
  }

  render() {
    const table = [];

    for (let i = 0; i < this.weekdays.length; i++) {
      table.push(
        <div class={[styles.calendar__cell, styles.calendar__weekdays]}>
          {this.weekdays[i]}
        </div>
      );
    }

    for (
      let i = 1, j = i - this.montStartsWeekDay + 1;
      i < this.daysInStore.length + this.montStartsWeekDay + 1;
      i++, j++
    ) {
      if (i < this.montStartsWeekDay) {
        table.push(<div class={styles.calendar__cell}></div>);
      } else if (
        i >= this.montStartsWeekDay &&
        i < this.daysInStore.length + this.montStartsWeekDay - 1
      ) {
        table.push(
          <div
            id={this.daysInStore[j].date}
            onclick={this.selectDayStore}
            class={`${styles.calendar__cell}
            ${
              this.daysInStore[j].selected ? styles.calendar__cell_selected : ""
            }
              ${
                this.daysInStore[j].tasks.length > 0
                  ? styles.calendar__cell_tasked
                  : ""
              }            
            `}
          >
            {j}
          </div>
        );
      }
    }

    return (
      <div class={[styles.calendar]}>
        <div class={styles.calendar__header}>
          {this.monthWord} {this.year}
        </div>
        <div class={styles.calendar__table}>{table}</div>
      </div>
    );
  }
}
