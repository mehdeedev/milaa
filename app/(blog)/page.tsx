import { CategoryList, Hero, LatestPosts, ProductList } from "@/app/(blog)/components";

export default function MainPage() {
    return (
        <div className="bg-gray-50 flex flex-col gap-20 pb-10">
            <Hero />
            <CategoryList />
            <LatestPosts />
            <ProductList />
        </div>
    )
}