"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { initialDefault } from "@/constants";
import { tourForm } from "@/lib/validator";
import { TourFormProps } from "@/types";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import { createTour } from "@/lib/actions/tour.actions";

export function TourForm({ userId, type, tour, tourId }: TourFormProps) {
	const [file, setFile] = useState<File>();
	const { edgestore } = useEdgeStore();
	const initialValues =
		type === "update"
			? {
					...tour,
					location: tour?.location._id,
					depart: tour?.depart._id,
					startDate: tour?.startDate,
					endDate: tour?.endDate,
			  }
			: initialDefault;

	// 1. Define your form.
	const form = useForm<z.infer<typeof tourForm>>({
		resolver: zodResolver(tourForm),
		defaultValues: initialValues,
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof tourForm>) {
		if (!userId) throw new Error("Something went wrong with the user id");

		if (!file) throw new Error("Something went wrong with the image upload");

		if (file) {
			const res = await edgestore.publicFiles.upload({
				file,
				onProgressChange: (progress) => {
					// you can use this to show a progress bar
					console.log(progress);
				},
			});
			// you can run some server action or api here
			// to add the necessary data to your database
			values.imageUrl = res.url;

			const newTour = await createTour({
				userId: userId,
				tour: values,
				path: "/profile",
			});

			console.log(values);
			if (newTour) console.log(newTour);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full flex gap-5">
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Dropdown
										type="category"
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="locationId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Dropdown
										type="location"
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex gap-5">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input placeholder="Enter price" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="seats"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Seats</FormLabel>
								<FormControl>
									<Input placeholder="Enter number of seats" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex gap-5">
					<FormField
						control={form.control}
						name="days"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Days</FormLabel>
								<FormControl>
									<Input placeholder="Enter days" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nights"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nights</FormLabel>
								<FormControl>
									<Input placeholder="Enter nights" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="departId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Depart</FormLabel>
							<FormControl>
								<Dropdown
									type="depart"
									onChangeHandler={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex w-full gap-5">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Image</FormLabel>
								<FormControl>
									<ImageUploader
										onChangeHandler={field.onChange}
										value={field.value}
										setFile={setFile}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Textarea
										className="h-64 resize-none w-full"
										placeholder="(Optional) Enter description here"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full flex gap-5">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full">
								<FormLabel>Start date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col">
								<FormLabel>End date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
