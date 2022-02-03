export type SaveServiceAddonDto = {
  serviceUid: string,
  image: any,
  countries: {
    addonCard: {
      buttons: {
        caption: string,
        phoneNumber: string,
        type: string,
        url?: string
      }[],
      headline: string
    },
    conditions: {
      failureMessage: string,
      key: string,
      value: string
    }[],
    country: string,
    description: string,
    name: string,
    termsAndConditionsUrl?: string,
    requiredUserInfo?: {
      sections: {
        informationChunks: {
          key: string,
          optional: boolean,
          type: string,
          localValidation: {
            maxLength: string,
            pattern: string
          }
        }[]
      }[]
    }

  }[]
}
