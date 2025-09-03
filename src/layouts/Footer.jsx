import MiraculousLogo from "../assets/miraculous.svg";

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
					<div className="">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center mb-4">
							Miraculous Music Station
						</p>
						<p className="text-center text-white text-[14px] mx-8 leading-6 mb-4">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat duis aute irure dolor.
						</p>
					</div>
					<div className="">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center mb-4">
							Download Our App
						</p>
						<p className="text-center text-white text-[14px] mx-8 leading-6 mb-4">
							Go Mobile with our app.
							<br /> Listen to your favourite songs at just one click. <br />
							Download Now !
						</p>
					</div>
					<div className="">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center mb-4">
							Subscribe
						</p>
						<p className="text-center text-white text-[14px] mx-8 leading-6 mb-4">
							Subscribe to our newsletter and get latest updates and offers.
						</p>
						<div className="flex flex-col gap-3 items-center">
							<input
								className="rounded-md bg-white text-[14px] text-[#6C757D] py-3 ps-4"
								type="text"
								placeholder="Enter Your Name"
							/>
							<input
								className="rounded-md bg-white text-[14px] text-[#6C757D] py-3 ps-4"
								type="text"
								placeholder="Enter Your Email"
							/>
							<button className="rounded-full bg-[#3BC8E7] text-white py-2 px-4 text-[14px]">
								Sign Me Up
							</button>
						</div>
					</div>
					<div className="">
						<p className="text-[#3BC8E7] font-semibold text-[18px] text-center mb-4">
							Contact Us
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}
