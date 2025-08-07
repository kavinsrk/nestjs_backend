import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(data: Partial<Product>, image?: Express.Multer.File): Promise<Product> {
    try {
      const product = new this.productModel({ ...data, image: image?.filename });
      return await product.save();
    } catch (err) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Product not found');
  }

  async filterProducts(name?: string, createdAt?: string, stock?: number) {
  const query: any = {};

  if (name) {
    query.name = { $regex: new RegExp(name, 'i') }; // case-insensitive
  }

  if (createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      query.createdAt = { $gte: date, $lt: nextDay };
    }
  }

  if (stock !== undefined) {
    query.stock = stock;
  }

  return this.productModel.find(query).exec();
}
