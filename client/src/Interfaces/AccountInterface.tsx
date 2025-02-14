import HoldingInterface from "./HoldingInterface";

export default interface Account {
  id: number;
  name: string;
  number: string;
  custodian: string;
  holdings: HoldingInterface[];
}
