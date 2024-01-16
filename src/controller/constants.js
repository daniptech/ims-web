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
  associatedServices: [],
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

export const customerItem = {
  salutation: '',
  type: '',
  firstName: '',
  lastName: '',
  companyName: '',
  customerDisplayName: '',
  customerEmail: '',
  remarks: '',
  pan: '',
  currency: '',
  paymentTerms: '',
  priceList: '',
  enablePortal: true,
  portalLanguage: '',
  website: '',
  department: '',
  designation: '',
  twitter: '',
  skypeNameNumber: '',
  facebook: '',
  workPhone: '',
  mobile: '',
  addresses: [],
  contactPersons: [
    // {
    //   salutation: '',
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   workPhone: '',
    //   mobile: ''
    // }
  ]
};

export const vendorItem = {
  salutation: '',
  firstName: '',
  lastName: '',
  vendorDisplayName: '',
  vendorEmail: '',
  companyName: '',
  workPhone: '',
  mobile: '',
  remarks: '',
  pan: '',
  currency: '',
  paymentTerms: '',
  tds: '',
  priceList: '',
  website: '',
  department: '',
  designation: '',
  twitter: '',
  skypeNameNumber: '',
  facebook: '',
  createdBy: '',
  addresses: [],
  contactPersons: [],
  bankDetails: []
};
