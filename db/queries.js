const queryList = {
	GET_STORE_LIST_QUERY:`SELECT STORE_ID , STORE_NAME , ADDRESS , STORE_CODE
						  FROM BMS.STORE;`,

	SAVE_STORE_QUERY:`INSERT INTO BMS.STORE(
									STORE_NAME , STORE_CODE , 
									ADDRESS , CREATED_BY , CREATED_ON 
									)
					  VALUES($1 , $2 , $3 , $4 , $5)`,

	GET_BOOK_LIST_QUERY:`SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER
						 FROM BMS.BOOK;`,

	GET_BOOK_DETAILS_QUERY:`SELECT BOOK_ID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES,
								   BOOK.STORE_CODE , STORE.STORE_NAME , STORE.ADDRESS
							FROM BMS.BOOK
							INNER JOIN BMS.STORE
							ON BOOK.STORE_CODE != STORE.STORE_CODE
							WHERE BOOK_ID = $1;`,

	GET_STORE_DETAILS_QUERY:`SELECT STORE_ID, STORE_NAME, STORE_CODE,
									CREATED_ON, CREATED_BY, ADDRESS
								   
							FROM BMS.STORE
							WHERE STORE_ID = $1;`,

	SAVE_BOOK_QUERY:`INSERT INTO BMS.BOOK
								(
									BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR,
									BOOK_PUBLISHER, BOOK_PAGES, STORE_CODE,
									CREATED_ON, CREATED_BY
								)
					VALUES($1, $2, $3, $4, $5, $6, $7, $8);`,

	UPDATE_BOOK_QUERY: `UPDATE BMS.BOOK
						SET BOOK_TITLE=$1, BOOK_DESCRIPTION=$2, BOOK_AUTHOR=$3,
							BOOK_PUBLISHER=$4, BOOK_PAGES=$5, STORE_CODE=$6, CREATED_ON=$7, CREATED_BY=$8
						WHERE BOOK_ID=$9;`,

	UPDATE_STORE_QUERY: `UPDATE BMS.STORE
							SET STORE_NAME=$1, STORE_CODE=$2, CREATED_ON=$3, CREATED_BY=$4, ADDRESS=$5
						WHERE STORE_ID=$6;`,

	DELETE_STORE_QUERY: `DELETE FROM BMS.STORE
						 WHERE STORE_ID=$1;`,

	DELETE_BOOK_QUERY: `DELETE FROM BMS.BOOK
						WHERE BOOK_ID=$1;`,

	GetIdStore:`SELECT STORE_ID FROM BMS.STORE WHERE STORE_ID=$1;`,
	
	GetIdBook:`SELECT BOOK_ID FROM BMS.BOOK WHERE BOOK_ID=$1;`,
}

export default queryList