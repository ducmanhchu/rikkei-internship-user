export default function PillButton({ text, onClick }) {
	return (
		<button
			className="rounded-full bg-[#3BC8E7] text-white py-2 px-4 text-[14px] mb-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,200,231,0.7)]"
			onClick={onClick}
		>
			{text}
		</button>
	);
}
