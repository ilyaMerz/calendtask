import { Module, State } from "vuex-simple";
import { CalendModule } from "./modules/calend";

export class MyStore {
  @Module()
  public calend = new CalendModule();
}
