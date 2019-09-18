const fs = require(`fs`)
const util = require(`util`)
const { omit } = require('lodash')
const jsondiffpatch = require(`jsondiffpatch`)

const readFile = util.promisify(fs.readFile)

const FIELDS = [
  `installedGatsbyVersion`,
  `gatsbyCliVersion`,
  //   `eventType`,
  `sessionId`,
  `time`,
  //   `machineId`,
  //   `componentId`,
  //   `osInformation`,
  //   `nodeVersion`,
  //   `platform`,
  //   `release`,
  //   `cpus`,
  //   `arch`,
  //   `ci`,
  //   `ciName`,
  //   `docker`,
  //   `componentVersion`,
  //   `repositoryId`,
  //   `repositoryData`,
  //   `provider`,
  //   `owner`,
  //   `name`,
  `duration`
  //   `plugins`,
  //   `pluginName`,
  //   `errorV2`,
  //   `siteMeasurements`
]

const stripSomeFields = (object, index, array, fields = FIELDS) => {
  return omit(object, fields)
}

const main = async () => {
  const beforeJson = await readFile(process.argv[2])
    .then(JSON.parse)
    .then(collection => collection.map(stripSomeFields))
  const afterJson = await readFile(process.argv[3])
    .then(JSON.parse)
    .then(collection => collection.map(stripSomeFields))

  const delta = jsondiffpatch.diff(beforeJson, afterJson)
  jsondiffpatch.console.log(delta)
}

main()
