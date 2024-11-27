import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getAllDepart } from "@/lib/actions/depart.actions";
import { getAllLocation } from "@/lib/actions/location.actions";
import { IDepart } from "@/lib/db/models/depart.model";
import { ILocation } from "@/lib/db/models/location.model";
import { useEffect, useState } from "react";

interface DropdownProps {
	type: string;
	onChangeHandler?: () => void;
	value?: string;
}

const Dropdown = ({ type, onChangeHandler, value }: DropdownProps) => {
	const [datas, setDatas] = useState<IDepart[] | ILocation[]>([]);

	if (type === "location" || type === "depart") {
		useEffect(() => {
			const getData = async () => {
				if (type === "location") {
					const locations = await getAllLocation();
					setDatas(locations);
				}

				if (type === "depart") {
					const departs = await getAllDepart();
					setDatas(departs);
				}
			};
			getData();
		}, []);
	}

	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={`Choose ${type}`} />
			</SelectTrigger>
			<SelectContent className="w-full">
				{type === "category" && (
					<>
						<SelectItem value="local">Local</SelectItem>
						<SelectItem value="aboard">Aboard</SelectItem>
					</>
				)}

				{type === "location" && (
					<>
						{datas.map((data) => (
							<SelectItem key={data._id} value={data._id}>
								{data.name}
							</SelectItem>
						))}
					</>
				)}

				{type === "depart" && (
					<>
						{datas.map((data) => (
							<SelectItem key={data._id} value={data._id}>
								{data.name}
							</SelectItem>
						))}
					</>
				)}
			</SelectContent>
		</Select>
	);
};

export default Dropdown;
