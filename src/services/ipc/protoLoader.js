const { parseProto } = require('../grpc/protoLoader')

function handleParseProtoFile() {
  return async (_, { path }) => {
    const proto = await parseProto(path)
    
    return proto
  }
}

module.exports = {
  handleParseProtoFile
}
