import Label from "./Label";

export default interface Card {
  _id: Number,
  title: String,
  description: String,
  order: Number,
  list_id: Number,
  label_id: Number,
  createdAt: Date,
  updatedAt: Date,
  label: Label,
  owner: {
    type: Object,
    default: null
  }
}