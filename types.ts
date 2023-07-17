export interface Role {
    id: string;
    name: string;
    users: User[];
    createdAt: string;
    updatedAt: string;
};

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    roleId: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
};

export interface NewUserForm {
    name: string;
    email: string;
    password: string;
    roleId: string;
};

export interface EditUserForm {
    name: string;
    email: string;
    roleId: string;
};

export interface Category {
    id: string;
    name: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
};

export interface Product {
    id: string;
    categoryId: string;
    category: Category;
    isFeatured: boolean;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    createdAt: string;
    updatedAt: string;
};

export interface ProductForm {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    isFeatured: boolean;
    image: string;
};

export interface IButton {
    id?: string;
    text?: string;
    type?: string;
};

