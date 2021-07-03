import {Store} from "../model/store.model.js";
import queryList from "../db/queries.js";
import {dbQuery} from "../db/connection.js";
import {generateStringCode} from "../util/utility.js";


// Global Get Id Of Book Query
let bookList = queryList.GetIdBook;

export const GetBookList = async (req,res) => {

	try{

		let bookListQuery = queryList.GET_BOOK_LIST_QUERY;
		let result = await dbQuery(bookListQuery);

		// return res.status(200).send(JSON.stringify(result))
		return res.status(200).send(result)
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Get book"})
	}
}


export const GetBookDetails = async (req,res) => {

	try{

		let bookId = req.params.bookId;

		let items = await dbQuery(bookList , [bookId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('book_id' in itemsObj)) {
			return res.status(500).send({ error: 'bookId Is Not Exit!!!' })

		}

		let bookDetailsQuery = queryList.GET_BOOK_DETAILS_QUERY;
		let result = await dbQuery(bookDetailsQuery , [bookId]);
		return res.status(200).send(JSON.stringify(result[0]))
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Get book details"})
	}
}

export const saveBook = async (req,res) => {


	try{

		let createdBy = "admin";
		let createdOn =  new Date();
		// req.body
		let title = req.body.title;
		let description = req.body.description;
		let auther = req.body.auther;
		let publisher = req.body.publisher;
		let pages = req.body.pages;

		if (! title || ! auther || ! publisher) {
			return res.status(500).send({ error: 'title and auther and publisher and storeCode are required , Can Not Be Empty!!' })
		}

		let storeCode = generateStringCode();

		let values = [title , description , auther , publisher, pages ,storeCode , createdOn , createdBy]

		let saveBookQuery = queryList.SAVE_BOOK_QUERY;
		await dbQuery(saveBookQuery , values);

		return res.status(201).send("Successfully Adding New Book ................")
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Adding New Book"})
	}
}

export const updateBook = async (req,res) => {

	try{
		let bookId = req.body.bookId;
		let createdBy = "admin";
		let createdOn =  new Date();
		// req.body
		let title = req.body.title;
		let description = req.body.description;
		let auther = req.body.auther;
		let publisher = req.body.publisher;
		let pages = req.body.pages;

		if (! title || ! bookId || ! auther || ! publisher) {
			return res.status(500).send({ error: 'title and bookId and auther and publisher and storeCode are required , Can Not Be Empty!!' })
		}

		let items = await dbQuery(bookList , [bookId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('book_id' in itemsObj)) {
			return res.status(500).send({ error: 'bookId Is Not Exit!!!' })

		}

		let storeCode = generateStringCode();

		let values = [ title , description , auther , publisher, pages ,storeCode , createdOn , createdBy , bookId]

		let updateBookQuery = queryList.UPDATE_BOOK_QUERY;
		await dbQuery(updateBookQuery , values);

		return res.status(201).send("Successfully Update Book Title " + title)
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Update Book Title " + title})
	}
}

export const deleteBook = async (req,res) => {
	let bookId = req.params.bookId;

	try{
		// Validate not Empty
		if (!bookId) {
			return res.status(500).send({ error: ' Can Not Delete Empty bookId' })
		}

		let items = await dbQuery(bookList , [bookId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('book_id' in itemsObj)) {
			return res.status(500).send({ error: 'bookId Is Not Exit!!!' })

		}

		let deleteBookQuery = queryList.DELETE_BOOK_QUERY;
		await dbQuery(deleteBookQuery , [bookId]);

		return res.status(200).send("Successfully Book Deleted ................")
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Delete Book Id " + bookId})
	}
	
}
