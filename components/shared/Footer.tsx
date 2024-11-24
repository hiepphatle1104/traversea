import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
	return (
		<div className="w-full py-5">
			<section className="wrapper flex items-center justify-center max-md:flex-col md:justify-between">
				<h1 className="text-2xl tracking-wider text-cyan-600">Traversea</h1>
				<div className="flex items-center gap-2">
					<Copyright size={16} />
					<p className="text-base">2024 Copyright. All rights reserved</p>
				</div>
			</section>
		</div>
	);
};

export default Footer;
