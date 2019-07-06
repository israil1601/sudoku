module.exports = function solveSudoku(matrix) {
	if (!matrix.some(item => item.includes(0))) {
		return matrix;
	}
	let lost = false;
	let changed = false;
	let currentHor;
	let currentVer;
	let possible;

	do {
		const whitelist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let horIndex = 0; horIndex < matrix.length; horIndex++) {
			for (let verIndex = 0; verIndex < 9; verIndex++) {
				if (!matrix[horIndex][verIndex]) {
					let localwhiteList = [...whitelist];
					localwhiteList = checkHorizontaly(matrix, horIndex, localwhiteList);
					localwhiteList = checkVerticaly(matrix, verIndex, localwhiteList);
					localwhiteList = checkSquare(matrix, horIndex, verIndex, localwhiteList);

					if (!localwhiteList.length) {
						return null;
					} else if (localwhiteList.length === 1) {
						matrix[horIndex][verIndex] = localwhiteList[0];
						changed = true;
					} else {
						lost = true;
						if (!possible || localwhiteList.length < possible.length) {
							currentHor = horIndex;
							currentVer = verIndex;
							possible = [...localwhiteList];
						}
					}
				}
			}
		}
	} while (!lost && !changed);

	if (possible && matrix.some(item => item.includes(0))) {
		for (let i = 0; i < possible.length; i++) {
			const copy = matrix.map(item => [...item]);
			copy[currentHor][currentVer] = possible[i];
			const result = solveSudoku(copy);

			if (result) {
				return result;
			}
		}
		return null;
	}

	return matrix;
};

function checkHorizontaly(matrix, horIndex, whitelist) {
	return whitelist.filter(item => !matrix[horIndex].includes(item));
}

function checkVerticaly(matrix, verIndex, whitelist) {
	const verticalList = matrix.map(item => item[verIndex]);
	return whitelist.filter(item => !verticalList.includes(item));
}

function checkSquare(matrix, horIndex, verIndex, whitelist) {
	let localMatrix = [...matrix];

	if (horIndex < 3) {
		localMatrix = localMatrix.filter((item, index) => index < 3);
	} else if (horIndex < 6) {
		localMatrix = localMatrix.filter((item, index) => index < 6 && index > 2);
	} else {
		localMatrix = localMatrix.filter((item, index) => index < 9 && index > 5);
	}

	if (verIndex < 3) {
		localMatrix = localMatrix.map(item => item.filter((v, i) => i < 3));
	} else if (verIndex < 6) {
		localMatrix = localMatrix.map(item => item.filter((v, i) => i < 6 && i > 2));
	} else {
		localMatrix = localMatrix.map(item => item.filter((v, i) => i < 9 && i > 5));
	}

	const [first, second, third] = localMatrix;
	localMatrix = [...first, ...second, ...third];

	const filtered = whitelist.filter(item => !localMatrix.includes(item));
	let notNull = filtered.filter(item => item);

	return notNull;
}  
