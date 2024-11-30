import { ShieldAlert } from "lucide-react";

interface AuthenticationErrorParams {
	error?: string | null;
}

const AuthenticationError = ({ error }: AuthenticationErrorParams) => {
	return (
		<div className="wrapper flex items-center justify-center py-20 grow w-full">
			<section className="py-5 px-10 border rounded-lg shadow-md text-center space-y-5">
				<div className="space-y-2">
					<ShieldAlert size={38} className="w-full text-center" />
					<h1 className="text-3xl font-semibold">Oops!</h1>

					{error && <p className="text-red-600 text-lg">{error}</p>}
				</div>
			</section>
		</div>
	);
};

export default AuthenticationError;
