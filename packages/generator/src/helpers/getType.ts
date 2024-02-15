// prisma available types

//BigInt
//Boolean
//Bytes
//DateTime
//Decimal
//Float
//Int
//JSON
//String
//$ModelName

// typespec available types

// boolean
// bytes
// decimal
// decimal128
// duration
// float
// float32
// float64
// int16
// int32
// int64
// int8
// integer
// numeric
// offsetDateTime
// plainDate
// plainTime
// safeint
// string
// uint16
// uint32
// uint64
// uint8
// unixTimestamp32
// url
// utcDateTime
// Array
// DefaultKeyVisibility
// object
// OmitDefaults
// OmitProperties
// OptionalProperties
// Record
// ServiceOptions
// UpdateableProperties
// BytesKnownEncoding
// DateTimeKnownEncoding
// DurationKnownEncoding

export const isTypeSpecType = (type: string): type is TypeSpecType => {
  return [
    'int64',
    'boolean',
    'bytes',
    'utcDateTime',
    'decimal',
    'float',
    'int32',
    'string',
  ].includes(type)
}

export type TypeSpecType =
  | 'int64'
  | 'boolean'
  | 'bytes'
  | 'utcDateTime'
  | 'decimal'
  | 'float'
  | 'int32'
  | 'string'

export function mapPrismaNativeTypeToTypeSpec(
  prismaType: string,
): TypeSpecType | string {
  switch (prismaType.toLowerCase()) {
    case 'bigint':
      return 'int64'
    case 'boolean':
      return 'boolean'
    case 'bytes':
      return 'bytes'
    case 'datetime':
      return 'utcDateTime'
    case 'decimal':
      return 'decimal'
    case 'float':
      return 'float'
    case 'int':
      return 'int32'
    case 'json':
    case 'string':
      return 'string'
    default:
      return prismaType
  }
}
