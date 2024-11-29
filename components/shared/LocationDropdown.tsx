import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createLocation, getAllLocation } from "@/lib/actions/location.actions";
import { ILocation } from "@/lib/db/models/location.model";
import { startTransition, useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CirclePlus } from "lucide-react";
import { Input } from "../ui/input";

interface LocationDropdownProps {
	onChangeHandler?: () => void;
	value?: string;
}

const LocationDropdown = ({
	onChangeHandler,
	value,
}: LocationDropdownProps) => {
	const [locations, setLocations] = useState<ILocation[]>([]);
	const [newLocation, setNewLocation] = useState("");

	useEffect(() => {
		const getData = async () => {
			const res = await getAllLocation();

			setLocations(res);
		};

		getData();
	}, []);

	const handleAdd = async () => {
		await createLocation(newLocation.trim()).then((location) => {
			setLocations((prevState) => [...prevState, location]);
		});
	};
	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Choose location" />
			</SelectTrigger>
			<SelectContent>
				{locations.map((location: ILocation) => (
					<SelectItem key={location._id} value={location._id}>
						{location.name}
					</SelectItem>
				))}

				<AlertDialog>
					<AlertDialogTrigger className="px-2 py-1.5 text-sm hover:bg-secondary w-full text-start rounded-sm flex gap-1 items-center">
						<CirclePlus size={18} />
						<span>Add new location</span>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-2xl w-full text-center mb-3">
								New location
							</AlertDialogTitle>
							<div>
								<Input
									type="text"
									placeholder={`Enter new location`}
									className="h-12 text-base"
									onChange={(e) => setNewLocation(e.target.value)}
									value={newLocation}
								/>
							</div>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<div className="flex flex-col-reverse w-full gap-2">
								<AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
								<AlertDialogAction
									className="w-full"
									onClick={() => startTransition(handleAdd)}
								>
									Add
								</AlertDialogAction>
							</div>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</SelectContent>
		</Select>
	);
};

export default LocationDropdown;
