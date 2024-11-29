"use server";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOrdersById } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/db/models/order.model";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TourOrders = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const orders = await getOrdersById(id);

	return (
		<div className="wrapper py-5">
			<section className="py-5 space-y-5">
				{/* Header */}
				<div className="text-3xl w-full text-center items-center flex gap-5">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant={"destructive"} size={"sm"} asChild>
									<Link href={"/profile"}>
										<ArrowLeft size={24} />
										<span>Back</span>
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Back to profile page</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<h1>Orders</h1>
				</div>

				{/* Table */}
				<div className="w-full p-4 border rounded-lg">
					<Table>
						<TableCaption>A list of your tour recent orders</TableCaption>
						<TableHeader className="select-none">
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Buyer ID</TableHead>
								<TableHead>Buyer Username</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Created At</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((order: IOrder) => (
								<TableRow key={order._id}>
									{/* OrderID */}
									<TableCell>{order._id}</TableCell>

									{/* UserID */}
									<TableCell>{order.buyer._id}</TableCell>

									{/* Username */}
									<TableCell>{order.buyer.username}</TableCell>

									{/* Total */}
									<TableCell>${order.totalAmount}</TableCell>

									{/* Create at */}
									<TableCell>
										{format(order.createdAt, "dd MMM yyyy - hh:mm a")}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</section>
		</div>
	);
};

export default TourOrders;
