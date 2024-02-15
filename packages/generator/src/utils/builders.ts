import { DMMF } from '@prisma/generator-helper'
import { getEnumValues } from 'src/helpers/genEnum'
import {
  isTypeSpecType,
  mapPrismaNativeTypeToTypeSpec,
} from 'src/helpers/getType'

export async function buildEnumValuesRecord(
  enums: DMMF.DatamodelEnum[],
): Promise<Record<string, string>> {
  const enumValuesRecord: Record<string, string> = {}
  for (const enumInfo of enums) {
    const enumValue = await getEnumValues(enumInfo)
    enumValuesRecord[enumInfo.name] = enumValue
  }
  return enumValuesRecord
}

export function getTypeSpec(
  type: string,
  enumValuesRecord: Record<string, string>,
): string {
  const typeSpec = mapPrismaNativeTypeToTypeSpec(type)
  if (isTypeSpecType(typeSpec)) {
    return typeSpec
  }
  return enumValuesRecord[typeSpec] ?? typeSpec
}

export function buildTspModels(
  models: DMMF.Model[],
  enumValuesRecord: Record<string, string>,
): string[] {
  return models.map((model) => buildTspModel(model, enumValuesRecord))
}

export function buildTspModel(
  model: DMMF.Model,
  enumValuesRecord: Record<string, string>,
): string {
  const fieldDeclarations = model.fields
    .map((field) => buildFieldDeclaration(field, enumValuesRecord))
    .join('\n')
  return `model ${model.name} {\n${fieldDeclarations}\n}`
}

export function buildFieldDeclaration(
  field: DMMF.Field,
  enumValuesRecord: Record<string, string>,
): string {
  const typeSpec = getTypeSpec(field.type, enumValuesRecord)
  const required = field.isRequired ? '' : '?'
  const isArray = field.isList ? '[]' : ''
  return `  ${field.name}${required}: ${typeSpec}${isArray}`
}
