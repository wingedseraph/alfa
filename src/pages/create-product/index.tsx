import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import BackLink from "@/components/back-link";
import Button from "@/components/button";
import Container from "@/components/container";
import FormInput from "@/components/form-input";
import { productCategories, RANDOM_IMAGE_URL } from "@/config/const";
import { cardContainer } from "@/config/styles";
import { type ProductFormData, productFormSchema } from "@/schemas/product-schema";
import { useProductStore } from "@/store";

export default function CreateProduct() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== undefined;
  const navigate = useNavigate();

  const { addProduct, getProductById, updateProduct } = useProductStore();

  const product = isEditMode ? getProductById(Number(id)) : undefined;

  const form = useForm<ProductFormData>({
    defaultValues:
      product === undefined
        ? {
            category: "",
            description: "",
            image: "",
            price: "",
            title: "",
          }
        : {
            category: product.category,
            description: product.description,
            image: product.image,
            price: product.price.toString(),
            title: product.title,
          },
    resolver: zodResolver(productFormSchema),
  });

  const { control, formState, handleSubmit, setValue } = form;
  const imageValue = useWatch({ control, name: "image" });

  useEffect(() => {
    const shouldRedirect = isEditMode && product === undefined;

    if (shouldRedirect) {
      void navigate("/products");
    }
  }, [isEditMode, product, navigate]);

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      price: Number(data.price),
    };

    if (isEditMode) {
      updateProduct(Number(id), productData);
      void navigate(`/products/${id}`);
    } else {
      addProduct({
        ...productData,
        rating: { count: 0, rate: 0 },
      });
      void navigate("/products");
    }
  };

  return (
    <Container maxWidth="3xl" padding="page">
      <BackLink />

      <div className={`overflow-hidden ${cardContainer} p-8`}>
        <h2 className="mb-8 text-2xl font-bold text-card-foreground">{isEditMode ? "Edit Product" : "Create New Product"}</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput name="title" label="Title" placeholder="e.g., Mens Casual Shirt" control={control} type="text" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput name="price" label="Price ($)" placeholder="0.00" control={control} step="0.01" type="number" />

            <FormInput
              name="category"
              label="Category"
              placeholder="electronics, clothing..."
              control={control}
              list="categories"
              type="text"
            />
            <datalist id="categories">
              {productCategories.map((category: string) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div>
            <FormInput name="image" label="Image URL" placeholder="https://..." control={control} type="text">
              <Button
                variant="outline"
                className="whitespace-nowrap"
                onClick={() => {
                  setValue("image", RANDOM_IMAGE_URL, { shouldValidate: true });
                }}
                type="button"
              >
                Random
              </Button>
            </FormInput>

            {imageValue.length > 0 && formState.errors.image === undefined ? (
              <div className="mt-4 inline-block rounded-3xl border border-border bg-card p-2">
                <img
                  className="h-24 w-24 rounded-lg object-contain"
                  onError={() => {
                    setValue("image", "", { shouldValidate: true });
                  }}
                  alt="Preview"
                  src={imageValue}
                />
              </div>
            ) : null}
          </div>

          <FormInput
            name="description"
            label="Description"
            placeholder="Detailed product description..."
            control={control}
            type="textarea"
          />

          <div className="flex items-center justify-end gap-4 border-t border-border pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                void navigate(-1);
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" type="submit">
              {isEditMode ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
