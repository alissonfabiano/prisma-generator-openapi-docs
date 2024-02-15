import prettier from 'prettier'

export type BuiltInParserName =
  | prettier.BuiltInParserName
  | 'typespec';

export const formatFile = (
  content: string,
  parser: prettier.LiteralUnion<BuiltInParserName, string>,
): Promise<string> => {
  return new Promise((res, rej) =>
    prettier.resolveConfig(process.cwd()).then((options) => {
      if (!options) {
        res(content) // no prettier config was found, no need to format
      }

      try {
        const formatted = prettier.format(content, {
          ...options,
          parser,
        })

        res(formatted)
      } catch (error) {
        rej(error)
      }
    }),
  )
}
