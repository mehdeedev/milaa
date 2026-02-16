export type ProductDataForList = {
    _id: string;
    title: string;
    slug: string;
    price: number;
    image: {
        url: string;
        alt: string;
    };
}

export type ProductDataForCart = {
    _id: string;
    title: string;
    slug: string;
    price: number;
    mainImage: {
        url: string;
        alt: string;
    };
}

export type ProductData = {
    _id: string;
    title: string;
    slug: string;
    price: number;
    images: {
        url: string;
        alt: string;
        isMain: boolean;
    }[];
    description: string;
    type: 'digital' | 'physical';
    text: string;
    discountPrice: string;
    category: {
        _id: string;
        title: string;
    };
    stockStatus: 'in_stock' | 'out_of_stock' | 'preorder';
     
}