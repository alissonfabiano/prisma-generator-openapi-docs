import fs from 'fs'
import path from 'path'
import { BuiltInParserName, formatFile } from './formatFile'
import prettier from 'prettier'

export const writeFileSafely = async (
  writeLocation: string,
  content: any,
  parser: prettier.LiteralUnion<BuiltInParserName, string>,
) => {
  fs.mkdirSync(path.dirname(writeLocation), {
    recursive: true,
  })

  fs.writeFileSync(writeLocation, await formatFile(content, parser))
}
