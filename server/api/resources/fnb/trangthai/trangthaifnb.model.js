import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const trangthaifnbSchema = new Schema({
  tentrangthai: {
    type: String,
    required: true,
  },
  mota: { type: String },
  thutu: { type: Number },

  is_deleted: { type: Boolean, default: false, select: false },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});
trangthaifnbSchema.plugin(mongoosePaginate);

export default mongoose.model('TrangThaiFnB', trangthaifnbSchema);
