type ConfigurationValues = {
  male: Array<string>
  female: Array<string>
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
