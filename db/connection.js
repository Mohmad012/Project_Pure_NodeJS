import pool from './pool.js';


export const dbQuery = (queryText , queryParams) => {
	return new Promise((resolve , reject) => {
		pool.query(queryText , queryParams)
		  .then(res => {
		  	resolve(res.rows);
		  })
		  .catch(err => {
		  	reject(err);
		  })
	});
}