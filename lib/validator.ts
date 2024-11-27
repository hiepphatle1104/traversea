"use client";

import { z } from "zod";

const now = new Date();

export const tourForm = z.object({
	title: z.string().min(10).max(100),
	locationId: z.string().min(10).max(100),
	category: z.string().min(3).max(50),
	imageUrl: z.string(),
	price: z.coerce.number().positive().min(0),
	seats: z.coerce.number().positive().min(0),
	days: z.coerce.number().positive().min(0),
	nights: z.coerce.number().positive().min(0),
	description: z.string().optional(),
	departId: z.string().min(10).max(100),
	startDate: z.date(),
	endDate: z.date(),
});
