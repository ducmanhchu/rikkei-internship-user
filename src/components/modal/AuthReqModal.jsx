import { useDispatch } from "react-redux";
import useColorThief from "use-color-thief";

import { clearPlayer } from "../../redux/playerSlice";
import { openModal, closeModal } from "../../redux/modalSlice";

export default function AuthReqModal({ data }) {
	const dispatch = useDispatch();
	const { color } = useColorThief(data?.album?.coverImage, {
		format: "hex",
	});

	return (
		<div
			className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center p-4	"
			onClick={() => dispatch(clearPlayer())}
		>
			<div
				className="flex flex-col gap-6 rounded-lg p-8 text-center md:flex-row"
				style={{
					background: color
						? `linear-gradient(180deg, ${color} -25%, black 120%)`
						: undefined,
				}}
			>
				<img
					className="w-32 h-32 rounded-lg shadow-xl/30 object-cover mx-auto md:w-42 md:h-42 lg:w-52 lg:h-52"
					src={data?.album?.coverImage}
					alt={data.title}
				/>

				<div className="flex flex-col justify-center">
					<div className="mb-3">
						<h2 className="text-white text-2xl font-bold mb-1 lg:text-3xl">
							Sign in
						</h2>
						<h2 className="text-white text-2xl font-bold mb-1 lg:text-3xl">
							to listen now
						</h2>
					</div>

					<button
						className="w-full cursor-pointer bg-[#3BC8E7] hover:bg-[#099bbc] text-black font-bold py-3 px-6 rounded-full transition-colors duration-200 text-md"
						onClick={() => {
							dispatch(closeModal());
							dispatch(openModal({ modalName: "REGISTER_MODAL" }));
						}}
					>
						Sign up for free
					</button>

					<div className="text-white text-sm mt-4">
						You already have an account?&nbsp;
						<button
							className="text-white underline hover:text-gray-300 font-semibold cursor-pointer"
							onClick={() => {
								dispatch(closeModal());
								dispatch(openModal({ modalName: "LOGIN_MODAL" }));
							}}
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
			<button
				className="text-white underline mt-8 hover:text-gray-300 font-semibold cursor-pointer"
				onClick={() => {
					dispatch(closeModal());
				}}
			>
				Close
			</button>
		</div>
	);
}
