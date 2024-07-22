import { Schema, model } from 'mongoose';

interface IPrice {
  symbol: string;
  price: number;
  timestamp: Date;
}

const priceSchema = new Schema<IPrice>({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
});

const Price = model<IPrice>('Price', priceSchema);

export default Price;
