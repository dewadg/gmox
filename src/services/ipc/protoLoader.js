const { loadProtoFile } = require('../grpc/protoLoader')

function handleParseProtoFile() {
  return (_, { path }) => {
    const proto = loadProtoFile(path)

    return Object.keys(proto)
      .map((key) => {
        const services = []

        for (const item of Object.keys(proto[key])) {
          if (typeof proto[key][item] !== 'function') continue

          const methods = Object.keys(proto[key][item].service).map(method => ({
            method,
            path: proto[key][item].service[method].path
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
