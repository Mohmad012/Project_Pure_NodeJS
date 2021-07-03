import express from "express";
import {GetBookList , GetBookDetails , saveBook , updateBook , deleteBook} from "../controller/book.controller.js";

const router = express.Router();

router.get('/book', GetBookList);
router.get('/book/details/:bookId', GetBookDetails);
router.put('/book/update', updateBook);
router.post('/book/save', saveBook);
router.delete('/book/delete/:bookId', deleteBook);

export default router