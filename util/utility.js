import randomstring from "randomstring";


export const generateStringCode = () => {
	return randomstring.generate({
			  length: 5,
			  charset: 'alphabetic',
			  capitalization: 'uppercase'
			});
}
