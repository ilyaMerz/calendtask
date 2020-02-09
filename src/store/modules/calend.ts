import { Mutation, State, Getter } from "vuex-simple";

export class CalendModule {
  @State() public days: Array;

  constructor(days?: []) {
    this.days = [];
  }

  @Mutation()
  public setDays(day: {}) {
    this.days.push(day);
  }

  @Mutation()
  public setTask(task: any) {
    const today = this.days.filter(single => single.selected)[0];
    const obj = <Task>{};
    obj.task = task;
    obj.done = false;
    today.tasks.push(obj);
  }

  @Mutation()
  public selectDay(day: string) {
    this.days.forEach(single => {
      single.selected = false;
    });
    const selected = this.days.filter(single => single.date == day);
    selected[0].selected = true;
  }

  @Mutation()
  public toggleTask(id: string) {
    const today: any = this.days.filter(single => single.selected)[0];
    today!.tasks[id].done = !today.tasks[id].done;
  }

  @Getter() public get getDays() {
    return this.days;
  }
}
