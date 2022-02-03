type Package = {
  devicePackageIdList: string[],
  offeredWithDeviceSubscription: boolean,
  package?: {
    id: string,
    content: string,
    pricingText1: string,
    pricingText2: string,
    deleted: boolean,
    purchasable: boolean,
    moreInfoUrl: string,
    commercialName: string,
    isContract: boolean,
    durationInMonths: number,
    durationLabel: string,
    termsAndConditionsSummary: string
  }
}

export type ProductServiceAddon = {
  serviceUid: string,
  packages: Package[]
}
