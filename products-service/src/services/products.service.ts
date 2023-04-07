import { IProduct } from './product.model';

const products: IProduct[] = [
    {
        "count": 4,
        "description": "You will get a random laptop in price from $100 to $1000",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 299,
        "imagePath": "/assets/icons/laptop.svg",
        "title": "Random laptop"
    },
    {
        "count": 7,
        "description": "You will get a random CPU in price from $100 to $500",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "price": 169,
        "imagePath": "/assets/icons/cpu.svg",
        "title": "Random CPU"
    },
    {
        "count": 12,
        "description": "You will get a random GPU in price from $200 to $1000",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        "price": 299,
        "imagePath": "/assets/icons/gpu.svg",
        "title": "Random GPU"
    },
    {
        "count": 7,
        "description": "You will get a random controller in price from $50 to $300",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        "price": 99,
        "imagePath": "/assets/icons/controller.svg",
        "title": "Random controller"
    },
    {
        "count": 8,
        "description": "You will get a random keyboard in price from $50 to $300",
        "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        "price": 99,
        "imagePath": "/assets/icons/keyboard.svg",
        "title": "Random keyboard"
    },
    {
        "count": 8,
        "description": "You will get a random mouse in price from $50 to $300",
        "id": "7562ed4b-b12c-41c5-9215-fc3134ba20a1",
        "price": 99,
        "imagePath": "/assets/icons/mouse.svg",
        "title": "Random mouse"
    },
    {
        "count": 2,
        "description": "You will get a random motherboard in price from $100 to $300",
        "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        "price": 159,
        "imagePath": "/assets/icons/motherboard.svg",
        "title": "Random motherboard"
    },
    {
        "count": 3,
        "description": "You will get a random RAM in price from $40 to $150",
        "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        "price": 79,
        "imagePath": "/assets/icons/ram.svg",
        "title": "Random RAM"
    },
    {
        "count": 6,
        "description": "You will get a random chair in price from $20 to $400",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        "price": 79,
        "imagePath": "/assets/icons/chair.svg",
        "title": "Random chair"
    }
]

class ProductsService {
    getList(): Promise<IProduct[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(products)
            }, 200)
        })
    }

    getItemById(productId: string): Promise<IProduct> {
        const product: IProduct = products.find(({ id }) => productId === id);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(product)
            }, 200)
        })
    }
}

const productsService = new ProductsService();

export default productsService;