import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OTPModal from "./OTPModal";

const MODAL_COMPONENTS = {
	LOGIN_MODAL: LoginModal,
	REGISTER_MODAL: RegisterModal,
	OTP_MODAL: OTPModal,
};

export default function ModalManager() {
	const dispatch = useDispatch();
	const { activeModal, modalData } = useSelector((state) => state.modal);

	if (!activeModal || !MODAL_COMPONENTS[activeModal]) return null;

	const ModalComponent = MODAL_COMPONENTS[activeModal];

	return (
		<ModalComponent
			isOpen={!!activeModal}
			onClose={() => dispatch(closeModal())}
			data={modalData}
		/>
	);
}
