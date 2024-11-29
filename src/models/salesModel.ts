
export interface SalesCreate{
    codeProduct: string,
    quantity: string,
}
export type SaletDto = Omit<SalesCreate,"id_">;
export type UpdateSale= Partial<SalesCreate>;

export type Sales ={
    saleId: string;
    saleDate: string;
    totalAmount: number;
    details: {
      productName: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[];
}