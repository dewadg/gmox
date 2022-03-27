const { parseProto } = require('../grpc/protoLoader')

function handleParseProtoFile() {
  return async (_, { path }) => {
    try {
      const proto = await parseProto(path)

      return proto
    } catch (error) {
      console.error('Error while parsing proto file', error)
    }
  }
}

module.exports = {
  handleParseProtoFile
}
