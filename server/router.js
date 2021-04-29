import express from "express";

import userRouter from "./api/resources/user/user.router";
import { phuongxaRouter } from './api/resources/danhmuc/phuongxa/phuongxa.router';
import { quanhuyenRouter } from './api/resources/danhmuc/quanhuyen/quanhuyen.router';
import { tinhthanhRouter } from './api/resources/danhmuc/tinhthanh/tinhthanh.router';
import { imgUploadRouter } from './api/resources/imgUploadLocal/imgUpload.router';
import {donvitinhRouter} from './api/resources/cuahangdungcu/donvitinh/donvitinh.router';
import {proshopRouter} from './api/resources/cuahangdungcu/proshop/proshop.router';
import {trangthaiRouter} from './api/resources/cuahangdungcu/trangthai/trangthai.router';
import{mucthanhvienRouter} from './api/resources/mucthanhvien/mucthanhvien.router';
import {trangthaicaddyRouter} from './api/resources/quanlycaddy/trangthaicaddy/trangthaicaddy.router';
import {caddyRouter} from './api/resources/quanlycaddy/caddy/caddy.router';
import {voucherRouter} from './api/resources/quanlyvoucher/voucher/voucher.router';
import {trangthaivoucherRouter} from './api/resources/quanlyvoucher/trangthaivoucher/trangthaivoucher.router';
import {fnbRouter} from './api/resources/fnb/fnb/fnb.router';
import {trangthaifnbRouter} from './api/resources/fnb/trangthai/trangthaifnb.router';
import {danhmuctintucRouter} from './api/resources/tintucsangolf/danhmuctintuc/danhmucsangolf.router';
import {tintucRouter} from './api/resources/tintucsangolf/tintuc/sangolf.router';
import {cauhoithuonggapRouter} from './api/resources/cauhoithuonggap/cauhoithuonggap.router';
import {huongdanRouter} from './api/resources/huongdan/huongdan/huongdan.router';
import {danhmuchuongdanRouter} from './api/resources/huongdan/danhmuchuongdan/danhmuchuongdan.router'
import {thongbaochungRouter} from './api/resources/thongbaochung/thongbaochung.router';
import {dmdanhgiaRouter} from './api/resources/dmdanhgia/dmdanhgia.router';
import {danhgiadichvuRouter} from './api/resources/danhgiadichvu/danhgiadichvu.router';
import {thongtinchungRouter} from './api/resources/thongtinchung/thongtinchung.router';
import {thongtinungdungRouter} from './api/resources/thongtinungdung/thongtinungdung.router';
import {dmdichvuRouter} from './api/resources/danhmuc/dmdichvu/dmdichvu.router'
const router = express.Router();
router.use('/trang-thai-voucher', trangthaivoucherRouter);
router.use('/voucher', voucherRouter);
router.use('/fnb',fnbRouter);
router.use('/trang-thai-fnb', trangthaifnbRouter)
router.use('/cau-hoi-thuong-gap', cauhoithuonggapRouter);
router.use('/huongdan', huongdanRouter);
router.use('/danh-muc-huong-dan', danhmuchuongdanRouter);
router.use('/trang-thai-caddy', trangthaicaddyRouter);
router.use('/caddy', caddyRouter);
router.use('/muc-thanh-vien', mucthanhvienRouter);
router.use('/proshop', proshopRouter);
router.use('/trang-thai', trangthaiRouter);
router.use('/users', userRouter);
router.use('/tinh-thanh', tinhthanhRouter);
router.use('/quan-huyen', quanhuyenRouter);
router.use('/phuong-xa', phuongxaRouter);
router.use('/files', imgUploadRouter);
router.use('/tin-tuc',tintucRouter);
router.use('/danhmuc-tin-tuc',danhmuctintucRouter);
router.use('/dmdanhgia',dmdanhgiaRouter);
router.use('/danh-gia-dich-vu',danhgiadichvuRouter);
router.use('/thong-bao-chung',thongbaochungRouter)
router.use('/thong-tin-chung', thongtinchungRouter);
router.use('/thong-tin-ung-dung', thongtinungdungRouter);
router.use('/don-vi-tinh',donvitinhRouter );
router.use('/dmdichvu',dmdichvuRouter);

module.exports = router;
