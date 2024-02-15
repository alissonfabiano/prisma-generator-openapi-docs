import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { writeFileSafely } from './utils/writeFileSafely'
import { buildEnumValuesRecord, buildTspModels } from './utils/builders'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    const enums = options.dmmf.datamodel.enums
    const models = options.dmmf.datamodel.models

    const enumValuesRecord = await buildEnumValuesRecord(enums)
    const tspModels = await buildTspModels(models, enumValuesRecord)

    const writeLocation = path.join(
      options.generator.output?.value!,
      `main.tsp`,
    )

    await writeFileSafely(writeLocation, tspModels.join('\n\n'), 'typespec')
  },
})
