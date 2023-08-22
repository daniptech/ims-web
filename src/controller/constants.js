export const item = {
  name: '',
  sku: '',
  unit: '',
  brand: '',
  manufacturer: '',
  type: '',
  isReturnable: false,
  isComposite: false,
  associatedItems: [],
  dimensions: {
    length: null,
    width: null,
    height: null
  },
  dimensionUnit: '',
  weight: null,
  weightUnit: '',
  inventoryInfo: {
    inventoryAccount: '',
    openingStock: null,
    openingStockRatePerUnit: null,
    reorderPoint: ''
  },
  upc: '',
  mpn: '',
  ean: '',
  isbn: '',
  imageurls: [],
  purchaseInfo: {
    costPrice: '',
    account: '',
    description: '',
    preferredVendorId: null
  },
  sellingInfo: {
    sellingPrice: null,
    account: '',
    description: ''
  },
  organizationId: null
};
