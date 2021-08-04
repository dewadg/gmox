const { loadProtoFile } = require('../grpc/protoLoader')

function handleParseProtoFile() {
  return async (_, { path }) => {
    const proto = await loadProtoFile(path)

    return Object.keys(proto)
      .map((key) => {
        const services = []

        for (const item of Object.keys(proto[key])) {
          if (typeof proto[key][item] !== 'function') continue

          const methods = Object.keys(proto[key][item].service).map(method => ({
            method,
            path: proto[key][item].service[method].path,
            originalName: proto[key][item].service[method].originalName
          }))

          services.push({
            service: item,
            methods
          })
        }

        return {
          proto: key,
          filePath: path,
          services
        }
      })
  }
}

module.exports = {
  handleParseProtoFile
}
