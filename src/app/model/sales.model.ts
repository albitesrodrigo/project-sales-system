interface SaleDetail {
  id: number;
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

interface Sale {
  id: number;
  codigo: string;
  nombreCliente: string;
  fecha: string;
  montoTotal: number;
  detalles: SaleDetail[];
}

export type {
    Sale
}