import { DMMF } from '@prisma/generator-helper'

export const getEnumValues = ({ values }: DMMF.DatamodelEnum) => {
  const enumValues = values.map(({ name }) => `"${name}"`).join(' | ')
  return enumValues
}

export const getModels = (dmmf: DMMF.Document) => {
  console.log(dmmf)
  return dmmf.datamodel.models
}
