import { MyStore } from "../../src/store/store";

const store = new MyStore();

const days = [
  {
    date: "qick_stupid_string_for_tes",
    selected: false,
    tasks: []
  },
  {
    date: "qick_stupid_string_for_tes2",
    selected: false,
    tasks: []
  }
];

test("setDays", () => {
  days.forEach(day => {
    store.calend.setDays(day);
  });
  expect(store.calend.days.length).toBe(2);
});

test("selectDay", () => {
  store.calend.selectDay("qick_stupid_string_for_tes");
  expect(
    store.calend.days.filter(
      single => single.date == "qick_stupid_string_for_tes"
    )[0].selected
  ).toBe(true);
});

test("setTask", () => {
  store.calend.setTask("my-task");
  const selectedDay = store.calend.days.filter(single => single.selected)[0];
  expect(selectedDay.tasks.includes("my-task"));
});
