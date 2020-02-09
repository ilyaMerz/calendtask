import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "../shims-vue";
import { useStore } from "vuex-simple";
import { MyStore } from "../store/store";

import calendstyles from "./Calendar.css?module";
import taskstyles from "./Tasks.css?module";

interface Props {}
@Component
export default class Tasks extends VueComponent<Props> {
  public store: MyStore = useStore(this.$store);

  public get daysInStore() {
    return this.store.calend.getDays;
  }

  private toggleTaskStore(e: any) {
    this.store.calend.toggleTask(+e.target.id);
  }

  public setTaskStore(task: string) {
    this.store.calend.setTask(task);
  }

  public addTask(e: any) {
    if (e.key == "Enter") {
      this.setTaskStore(e.target.value);
      document.getElementById("task-input").value = "";
    }
    if (e.target.value.length > 40) {
      alert("Полиция длинных задач предупреждает!");
      document.getElementById("task-input").value = "";
    }
  }

  date = new Date();
  year = this.date.getUTCFullYear();
  month = this.date.getMonth();

  render() {
    const todaysTasks = this.daysInStore.filter(day => day.selected)[0].tasks;

    const mappedTasks = todaysTasks.map((task, i) => {
      return (
        <div class={`${taskstyles.tasks__taskholder}`}>
          <input
            class={taskstyles.tasks__checkbox}
            id={i}
            checked={task.done}
            type="checkbox"
            onchange={this.toggleTaskStore}
          />
          {task.task}
        </div>
      );
    });

    return (
      <div class={[calendstyles.calendar]}>
        <div class={calendstyles.calendar__header}>События</div>
        <div class={taskstyles.tasks__table}>
          <br />
          <input
            class={taskstyles.tasks__input}
            type="text"
            id="task-input"
            placeholder="добавьте задачу"
            onkeydown={this.addTask}
          />
          <br />
          {todaysTasks.length ? mappedTasks : "Пока ничего не запланированно"}
        </div>
      </div>
    );
  }
}
