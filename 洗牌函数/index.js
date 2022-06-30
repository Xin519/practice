function shuffle(arr = []) {
	for (let j = arr.length - 1; j >= 0; j--) {
		const aa = Math.random() * j + 1
		const randomIndex = Math.floor(aa);
		const temp = arr[j];
		arr[j] = arr[randomIndex];
		arr[randomIndex] = temp;
	}
	return arr;
}
console.log(shuffle([1, 2, 3, 4, 5]));
