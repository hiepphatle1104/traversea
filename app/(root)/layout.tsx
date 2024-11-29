import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen flex flex-col justify-between">
			<section className="flex flex-col grow ">
				<Navbar />
				<main className="grow flex flex-col w-full">{children}</main>
			</section>
			<Footer />
		</div>
	);
}
