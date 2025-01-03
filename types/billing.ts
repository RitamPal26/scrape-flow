export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export const CreditsPacks: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1,000 Credits",
    credits: 1000,
    price: 1999, 
    priceId: process.env.STRIPE_SMALL_PACK_PRICE_ID!,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5,000 Credits",
    credits: 5000,
    price: 4999, 
    priceId: process.env.STRIPE_MEDIUM_PACK_PRICE_ID!,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10,000 Credits",
    credits: 10000,
    price: 9999, 
    priceId: process.env.STRIPE_LARGE_PACK_PRICE_ID!,
  },
];

export const getCreditsPack = (id: string) =>
  CreditsPacks.find((p) => p.id === id);
