export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
			{children}
		</div>
	);
}
