import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CategoryDropdownProps {
	onChangeHandler?: () => void;
	value?: string;
}

const CategoryDropdown = ({
	onChangeHandler,
	value,
}: CategoryDropdownProps) => {
	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Choose category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="local">Local</SelectItem>
				<SelectItem value="aboard">Aboard</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default CategoryDropdown;
