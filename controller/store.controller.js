import {Store} from "../model/store.model.js";
import queryList from "../db/queries.js";
import {dbQuery} from "../db/connection.js";
import {generateStringCode} from "../util/utility.js"

// Global Get Id Of Store Query
let storeList = queryList.GetIdStore;

export const GetStoreList = async (req,res) => {

	try{

		let storeListQuery = queryList.GET_STORE_LIST_QUERY;
		let result = await dbQuery(storeListQuery);

		return res.status(200).send(JSON.stringify(result))
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To List Store"})
	}
}

export const saveStore = async (req,res) => {


	try{

		let createdBy = "admin";
		let createdOn =  new Date();
		// req.body
		let StoreName = req.body.StoreName;
		let address = req.body.address;
		if (! StoreName || ! address) {
			return res.status(500).send({ error: 'Store Name and address are required , Can Not Be Empty!!' })
		}

		let  storeCode = generateStringCode()

		let values = [StoreName , storeCode , address , createdBy , createdOn]

		let saveStoreQuery = queryList.SAVE_STORE_QUERY;
		await dbQuery(saveStoreQuery , values);

		return res.status(201).send("Successfully Store Created ................")
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Save Store"})
	}
}

export const GetStoreDetails = async (req,res) => {

	try{

		let storeId = req.params.storeId;

		let items = await dbQuery(storeList , [storeId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('store_id' in itemsObj)) {
			return res.status(500).send({ error: 'storeId Is Not Exit!!!' })

		}

		let storeDetailsQuery = queryList.GET_STORE_DETAILS_QUERY;
		let result = await dbQuery(storeDetailsQuery , [storeId]);
		return res.status(200).send(JSON.stringify(result[0]))
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Get Store Details"})
	}
}

export const updateStore = async (req,res) => {

	try{
		let storeId = req.body.storeId;
		let createdBy = "admin";
		let createdOn =  new Date();
		// req.body
		let StoreName = req.body.StoreName;
		let address = req.body.address;

		if (! StoreName || ! address) {
			return res.status(500).send({ error: 'StoreName and address are required , Can Not Be Empty!!' })
		}

		let items = await dbQuery(storeList , [storeId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('store_id' in itemsObj)) {
			return res.status(500).send({ error: 'storeId Is Not Exit!!!' })

		}

		let storeCode = generateStringCode();

		let values = [StoreName , storeCode , createdOn , createdBy , address , storeId]

		let updateStoreQuery = queryList.UPDATE_STORE_QUERY;
		await dbQuery(updateStoreQuery , values);

		return res.status(201).send("Successfully Update Store Name " + StoreName)
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Update Store Name " + StoreName})
	}
}

export const deleteStore = async (req,res) => {
	let storeId = req.params.storeId;

	try{
		// Validate not Empty
		if (!storeId) {
			return res.status(500).send({ error: ' Can Not Delete Empty storeId' })
		}

		let items = await dbQuery(storeList , [storeId]);
		let itemsObj = Object.assign({}, ...items);
		if (!('store_id' in itemsObj)) {
			return res.status(500).send({ error: 'storeId Is Not Exit!!!' })

		}

		let deleteStoreQuery = queryList.DELETE_STORE_QUERY;
		await dbQuery(deleteStoreQuery , [storeId]);

		return res.status(200).send("Successfully Store Deleted ................")
	}
	catch (err){
		console.log(`Error: ${err}`);
		return res.status(500).send({error: "Feiled To Delete Store Id " + storeId})
	}
	
}
