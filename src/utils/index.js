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
