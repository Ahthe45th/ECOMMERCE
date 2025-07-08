import ProductCard from "./ProductCard";
import { Product } from "../types";

interface Props {
  title: string;
  products: Product[];
}

export default function CategorySlider({ title, products }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold px-4 mb-2 capitalize">{title}</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 px-4 pb-4 snap-x">
          {products.map((p) => (
            <div key={p._id} className="snap-start min-w-[16rem]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
