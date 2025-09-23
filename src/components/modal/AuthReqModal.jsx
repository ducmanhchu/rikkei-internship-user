import { useDispatch } from "react-redux";

import { clearPlayer } from "../../redux/playerSlice";
import { openModal, closeModal } from "../../redux/modalSlice";

export default function AuthReqModal({ data }) {
	const dispatch = useDispatch();

	return (
		<div
			className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center p-4	"
			onClick={() => dispatch(clearPlayer())}
		>
			<div className="flex flex-col gap-6 bg-black rounded-lg p-8 text-center md:flex-row">
				<img
					className="w-32 h-32 rounded-lg object-cover mx-auto md:w-42 md:h-42 lg:w-52 lg:h-52"
					src={data.albumImage}
					alt={data.title}
				/>

				<div className="">
					<div className="mb-6">
						<h2 className="text-white text-2xl font-bold mb-2 lg:text-3xl">
							Đăng nhập
						</h2>
						<h2 className="text-white text-2xl font-bold mb-2 lg:text-3xl">
							để nghe ngay
						</h2>
					</div>

					<button
						className="w-full cursor-pointer bg-[#3BC8E7] hover:bg-[#099bbc] text-black font-bold py-3 px-6 rounded-full transition-colors duration-200 text-md"
						onClick={() => {
							dispatch(closeModal());
							dispatch(openModal({ modalName: "REGISTER_MODAL" }));
						}}
					>
						Đăng ký miễn phí
					</button>

					<div className="text-white text-sm mt-4">
						Bạn đã có tài khoản?&nbsp;
						<button
							className="text-white underline hover:text-gray-300 font-semibold cursor-pointer"
							onClick={() => {
								dispatch(closeModal());
								dispatch(openModal({ modalName: "LOGIN_MODAL" }));
							}}
						>
							Đăng nhập
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
				Đóng
			</button>
		</div>
	);
}
