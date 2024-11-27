import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "../ui/label";
import { CloudUpload } from "lucide-react";

interface ImageUploaderProps {
	onChangeHandler?: (url: string) => void;
	value?: string;
	setFile: Dispatch<SetStateAction<File | undefined>>;
}

const ImageUploader = ({
	onChangeHandler,
	value,
	setFile,
}: ImageUploaderProps) => {
	return (
		<div className="h-64 border rounded-lg shadow-sm">
			<Label htmlFor="getFile" className="cursor-pointer">
				{(value && (
					<div className="w-full h-64 border rounded-lg shadow-sm">
						<Image
							src={value}
							alt="image"
							width={900}
							height={900}
							className="w-full h-full object-contain"
						/>
					</div>
				)) || (
					<div className="w-full h-64 border rounded-lg shadow-sm flex flex-col gap-5 items-center justify-center">
						<CloudUpload
							size={48}
							className="p-3 w-16 h-16 bg-gray-100 rounded-full text-cyan-600 text-center"
						/>
						<span className="text-gray-400">Click here to upload image</span>
					</div>
				)}
			</Label>
			<input
				id="getFile"
				type="file"
				className="w-full h-full"
				accept="image/*"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) {
						onChangeHandler?.(URL.createObjectURL(file));
						setFile(file);
					}
				}}
				hidden
			/>
		</div>
	);
};

export default ImageUploader;
