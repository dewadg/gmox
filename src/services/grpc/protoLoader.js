const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_LOAD_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

async function loadProtoFile(path) {
  const definition = await protoLoader.load(path, PROTO_LOAD_OPTIONS)
  const proto = grpc.loadPackageDefinition(definition)

  return proto
}

module.exports = {
  loadProtoFile
}
