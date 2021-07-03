import express from "express";
import {GetStoreList ,saveStore , GetStoreDetails , updateStore , deleteStore} from "../controller/store.controller.js";

const router = express.Router();

router.get('/store', GetStoreList);
router.get('/store/details/:storeId', GetStoreDetails);
router.put('/store/update', updateStore);
router.post('/store/save', saveStore);
router.delete('/store/delete/:storeId', deleteStore);

export default router