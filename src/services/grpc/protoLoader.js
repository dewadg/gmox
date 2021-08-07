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

function flattenProto(proto) {
  const flatten = {}

  for (const key in proto) {
    if (
      (typeof proto[key] === 'object' && proto[key].format && typeof proto[key].format === 'string') ||
      (typeof proto[key] !== 'object')
    ) {
      flatten[key] = proto[key]
    } else if (typeof proto[key] === 'object') {
      const sub = flattenProto(proto[key])

      for (const subKey in sub) {
        flatten[`${key}.${subKey}`] = sub[subKey]
      }
    }
  }

  return flatten
}

function buildStructure(proto, pkg, definition) {
  const key = pkg.length ? `${pkg}.${definition}` : definition

  if (!proto[key]) return {}

  return proto[key].type.field.reduce((carry, field) => {
    let value

    const isRepeated = field.label === 'LABEL_REPEATED'

    switch (field.type) {
      case 'TYPE_STRING':
        value = !isRepeated ? '' : ['']
        break
      case 'TYPE_MESSAGE':
        // eslint-disable-next-line
        const sub = proto[field.typeName]
          ? buildStructure(proto, '', field.typeName)
          : buildStructure(proto, pkg, field.typeName)

        value = !isRepeated ? sub : [sub]
        break
      case 'TYPE_BOOL':
        value = !isRepeated ? false : [false]
        break
      case 'TYPE_UINT32':
      case 'TYPE_INT32':
      case 'TYPE_INT64':
        value = !isRepeated ? 0 : [0]
        break
      case 'TYPE_FLOAT':
        value = !isRepeated ? 0.0 : [0.0]
        break
      default:
        console.error(`Proto parsing error. Unknown type: ${field.type} ${field.typeName}`)
    }

    carry[field.name] = value

    return carry
  }, {})
}

async function parseProto(path) {
  const proto = await loadProtoFile(path)
  const flattennedProto = flattenProto(proto)

  return Object.keys(proto)
    .filter(keys => keys !== 'google')
    .map((pkg) => {
      const services = []
      const types = new Map()

      for (const item of Object.keys(proto[pkg])) {
        if (typeof proto[pkg][item] === 'function') {
          const methods = Object.keys(proto[pkg][item].service).map(method => ({
            method,
            path: proto[pkg][item].service[method].path,
            originalName: proto[pkg][item].service[method].originalName
          }))

          services.push({
            service: item,
            methods
          })
        }

        if (typeof proto[pkg][item] === 'object') {
          types.set(item, {
            name: item,
            structure: buildStructure(flattennedProto, pkg, item)
          })
        }
      }

      return {
        proto: pkg,
        filePath: path,
        services,
        types
      }
    })
}

module.exports = {
  loadProtoFile,
  flattenProto,
  buildStructure,
  parseProto
}
