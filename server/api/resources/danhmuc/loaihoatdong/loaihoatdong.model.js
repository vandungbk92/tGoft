import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;
const loaihoatdongSchema = new Schema({
  tenloaihoatdong: {
    type: String,
    required: true
  },
  thutu: {
    type: Number
  },
  is_deleted: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
loaihoatdongSchema.plugin(mongoosePaginate);
export default mongoose.model('LoaiHoatDong', loaihoatdongSchema);
