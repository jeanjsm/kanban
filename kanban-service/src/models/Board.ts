export default interface Board {
  _id: Number,
  title: String,
  private: Boolean,
  favorite: Boolean,
  createdAt: Date,
  updatedAt: Date,
  owner: Boolean
}