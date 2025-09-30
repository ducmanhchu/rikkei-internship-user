export const secondsToTime = (seconds) => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function shuffleAround(array, fixedIndex) {
	if (fixedIndex < 0 || fixedIndex >= array.length) {
		console.error("Chỉ số không hợp lệ!");
		return;
	}
	const [fixedElement] = array.splice(fixedIndex, 1);
	shuffleArray(array);
	array.splice(fixedIndex, 0, fixedElement);
}

export function formatDate(dateString) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "";
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export function formatCurrency(amount) {
	if (typeof amount !== "number" && typeof amount !== "string") return "";
	const number = Number(amount);
	if (isNaN(number)) return "";
	return number.toLocaleString("vi-VN").replace(/,/g, ".") + "đ";
}
