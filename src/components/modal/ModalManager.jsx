import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { closeModal } from "../../redux/modalSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import OTPModal from "./OTPModal";
import AuthReqModal from "./AuthReqModal";
import ProfileModal from "./ProfileModal";
import ChangePassModal from "./ChangePassModal";
import PlaylistInfoModal from "./PlaylistInfoModal";
import AddSongPlaylistModal from "./AddSongPlaylistModal";
import AlbumInfoModal from "./AlbumInfoModal";
import AddSongAlbumModal from "./AddSongAlbumModal";
import EmailRequireModal from "./EmailRequireModal";
import ResetPasswordModal from "./ResetPasswordModal";

const MODAL_COMPONENTS = {
	LOGIN_MODAL: LoginModal,
	REGISTER_MODAL: RegisterModal,
	OTP_MODAL: OTPModal,
	AUTH_REQ_MODAL: AuthReqModal,
	PROFILE_MODAL: ProfileModal,
	CHANGE_PASS_MODAL: ChangePassModal,
	PLAYLIST_INFO_MODAL: PlaylistInfoModal,
	ADD_SONG_PLAYLIST_MODAL: AddSongPlaylistModal,
	ALBUM_INFO_MODAL: AlbumInfoModal,
	ADD_SONG_ALBUM_MODAL: AddSongAlbumModal,
	EMAIL_REQUIRE_MODAL: EmailRequireModal,
	RESET_PASSWORD_MODAL: ResetPasswordModal,
};

export default function ModalManager() {
	const dispatch = useDispatch();
	const { activeModal, modalData } = useSelector((state) => state.modal);

	useEffect(() => {
		const body = document.body;
		if (activeModal) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;
			if (scrollbarWidth > 0) {
				body.style.paddingRight = `${scrollbarWidth}px`;
			}
			body.style.overflow = "hidden";
		} else {
			body.style.overflow = "";
			body.style.paddingRight = "";
		}

		return () => {
			body.style.overflow = "";
			body.style.paddingRight = "";
		};
	}, [activeModal]);

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
