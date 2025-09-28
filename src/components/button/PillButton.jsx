export default function PillButton({ text, Icon, onClick }) {
	return (
		<button
			className={`flex gap-2 items-center rounded-full bg-[#3BC8E7] text-white py-2 px-4 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(59,200,231,0.7)]`}
			onClick={onClick}
		>
			{Icon && <Icon className="size-4" />}
			<p className="text-sm">{text}</p>
		</button>
	);
}
