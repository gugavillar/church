type ConfigurationValues = {
  endDateForMaleSubscription: Array<string>
  endDateForFemaleSubscription: Array<string>
}

export interface Configurations {
  ref: {
    value: {
      id: string
    }
  }
  data: {
    cursillo: ConfigurationValues
  }
}
