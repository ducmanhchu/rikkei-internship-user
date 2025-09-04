import MiraculousLogo from "../assets/miraculous.svg";
import GoogleplayBadge from "../assets/googleplay.png";
import AppstoreBadge from "../assets/appstore.png";
import WindowsBadge from "../assets/windows.png";

import LogoButton from "../components/LogoButton";
import PillButton from "../components/PillButton";

export default function Footer() {
	return (
		<>
			<footer className="relative bottom-0 w-full py-4 bg-gradient-to-r from-[#14182A] from-3% via-sky-800/90 via-50% to-[#14182A] to-97%">
				<img
					className="mx-auto w-24 pt-4 pb-8"
					src={MiraculousLogo}
					alt="Miraculous Logo"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4">
					<div className="mb-4">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center md:text-start md:mx-8">
							Miraculous Music Station
						</p>
						<span className="block w-8 h-0.5 bg-[#3BC8E7] rounded-md mx-auto mb-4 md:mx-8"></span>
						<p className="text-center text-white text-[14px] mx-8 leading-6 md:text-start md:mx-8">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat duis aute irure dolor.
						</p>
					</div>
					<div className="mb-4">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center md:text-start">
							Download Our App
						</p>
						<span className="block w-8 h-0.5 bg-[#3BC8E7] rounded-md mx-auto mb-4 md:mx-0"></span>
						<p className="text-center text-white text-[14px] mx-8 leading-6 mb-4 md:text-start md:mx-0">
							Go Mobile with our app.
							<br /> Listen to your favourite songs at just one click. <br />
							Download Now !
						</p>
						<div className="grid grid-cols-2 place-items-center px-6 lg:grid-cols-1 md:px-0 md:place-items-start">
							<img
								className="mb-4"
								src={GoogleplayBadge}
								alt="Google Play Badge"
							/>
							<img className="mb-4" src={AppstoreBadge} alt="App Store Badge" />
							<img className="mb-4" src={WindowsBadge} alt="Windows Badge" />
						</div>
					</div>
					<div className="mb-4">
						<p className="text-[#3BC8E7] font-semibold text-[18px] mx-8 text-center md:text-start">
							Subscribe
						</p>
						<span className="block w-8 h-0.5 bg-[#3BC8E7] rounded-md mx-auto mb-4 md:mx-8"></span>
						<p className="text-center text-white text-[14px] mx-4 leading-6 mb-4 md:text-start md:ms-8">
							Subscribe to our newsletter and get latest updates and offers.
						</p>
						<div className="flex flex-col gap-3 items-center md:items-start mx-8">
							<input
								className="w-full rounded-md bg-white text-[14px] text-[#6C757D] py-3 ps-4"
								type="text"
								placeholder="Enter Your Name"
							/>
							<input
								className="w-full rounded-md bg-white text-[14px] text-[#6C757D] py-3 ps-4"
								type="text"
								placeholder="Enter Your Email"
							/>
							<PillButton text="Sign Me Up" onClick={() => {}} />
						</div>
					</div>
					<div className="mb-4">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center md:text-start">
							Contact Us
						</p>
						<span className="block w-8 h-0.5 bg-[#3BC8E7] rounded-md mx-auto md:mx-0"></span>
						<div className="flex flex-col justify-center items-center mt-4 mb-4 gap-4 md:flex-row md:justify-start">
							<LogoButton src="/icons/phone.svg" altText={"Phone Logo"} />
							<p className="text-white text-center md:text-start">
								Call Us: <br /> (+1) 202-555-0176, (+1) 2025- 5501
							</p>
						</div>
						<div className="flex flex-col justify-center items-center mt-4 mb-4 gap-4 md:flex-row md:justify-start">
							<LogoButton src="/icons/message.svg" altText={"Message Logo"} />
							<p className="text-white text-center md:text-start">
								Email Us: <br /> demo@mail.com
							</p>
						</div>
						<div className="flex flex-col justify-center items-center mt-4 mb-4 gap-4 md:flex-row md:justify-start">
							<LogoButton src="/icons/location.svg" altText={"Location Logo"} />
							<p className="text-white text-center md:text-start">
								Walk In: <br />
								598 Old House Drive, London
							</p>
						</div>
						<div className="flex flex-col justify-center items-center mt-4 mb-4 gap-4 md:flex-row md:justify-start">
							<p className="text-white text-center md:text-start">Follow Us:</p>
							<div className="flex gap-2">
								<LogoButton src="/icons/fb.svg" altText={"Facebook Logo"} />
								<LogoButton
									src="/icons/linkedln.svg"
									altText={"LinkedIn Logo"}
								/>
								<LogoButton src="/icons/twitter.svg" altText={"Twitter Logo"} />
								<LogoButton src="/icons/google.svg" altText={"Google Logo"} />
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
