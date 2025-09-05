export default function LogoButton({ src, altText, width, height, onClick }) {
	return (
		<button
			className="flex items-center justify-center bg-[#3BC8E7] w-8 h-8 rounded-md transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(59,200,231,0.7)]"
			onClick={onClick}
		>
			<img src={src} alt={altText} className={`w-${width} h-${height}`} />
		</button>
	);
}
