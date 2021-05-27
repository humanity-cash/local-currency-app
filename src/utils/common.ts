
export const makeId = () => Math.random().toString(36).substring(7);

export const formatValue = (value: number) => {
	const strFormat = value.toFixed(2);
	const [firstPart, secondPart] = strFormat.split('.');
	return firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + (secondPart ? "," + secondPart : "");
}