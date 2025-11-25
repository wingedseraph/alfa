import { z } from "zod";

export const productFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  description: z.string(),
  image: z
    .string()
    .min(1, "Image URL is required")
    .pipe(z.url({ message: "Enter a valid URL" })),
  price: z
    .string()
    .min(1, "Enter a valid price")
    .refine(
      (val) => {
        const num = Number(val);

        return !isNaN(num) && num > 0;
      },
      { message: "Enter a valid price" },
    ),
  title: z.string().min(1, "Title is required"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
