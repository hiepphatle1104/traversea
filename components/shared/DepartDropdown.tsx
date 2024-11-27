import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createLocation, getAllLocation } from "@/lib/actions/location.actions";
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
import { IDepart } from "@/lib/db/models/depart.model";
import { createDepart, getAllDepart } from "@/lib/actions/depart.actions";

interface DepartDropdownProps {
	onChangeHandler?: () => void;
	value?: string;
}

const DepartDropdown = ({ onChangeHandler, value }: DepartDropdownProps) => {
	const [departs, setDeparts] = useState<IDepart[]>([]);
	const [newDepart, setNewDepart] = useState("");

	useEffect(() => {
		const getData = async () => {
			const res = await getAllDepart();

			setDeparts(res);
		};

		getData();
	}, []);

	const handleAdd = async () => {
		await createDepart(newDepart.trim()).then((depart) => {
			setDeparts((prevState) => [...prevState, depart]);
		});
	};
	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Choose depart" />
			</SelectTrigger>
			<SelectContent>
				{departs.map((depart) => (
					<SelectItem key={depart._id} value={depart._id}>
						{depart.name}
					</SelectItem>
				))}

				<AlertDialog>
					<AlertDialogTrigger className="px-2 py-1.5 text-sm hover:bg-secondary w-full text-start rounded-sm flex gap-1 items-center">
						<CirclePlus size={18} />
						<span>Add new depart</span>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-2xl w-full text-center mb-3">
								New depart
							</AlertDialogTitle>
							<div>
								<Input
									type="text"
									placeholder={`Enter new depart`}
									className="h-12 text-base"
									onChange={(e) => setNewDepart(e.target.value)}
									value={newDepart}
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

export default DepartDropdown;
