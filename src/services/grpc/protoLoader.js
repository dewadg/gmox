const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_LOAD_OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

async function loadProtoFile(paths) {
  const definition = await protoLoader.load(paths, PROTO_LOAD_OPTIONS)

  return grpc.loadPackageDefinition(definition)
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

function buildTemplate(proto, pkg, definition) {
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
          ? buildTemplate(proto, '', field.typeName)
          : buildTemplate(proto, pkg, field.typeName)

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
      case 'TYPE_DOUBLE':
        value = !isRepeated ? 0.0 : [0.0]
        break
      case 'TYPE_BYTES':
        value = !isRepeated ? [] : [[]]
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
  const flattenedProto = flattenProto(proto)
  const normalizedProto = normalizePackage(flattenedProto)

  return Object.keys(normalizedProto)
    .filter(keys => !keys.startsWith('google'))
    .map((pkg) => {
      const services = []
      const templates = {}

      for (const item of Object.keys(normalizedProto[pkg])) {
        if (typeof normalizedProto[pkg][item] === 'function') {
          const methods = Object.keys(normalizedProto[pkg][item].service).map(method => ({
            method,
            path: normalizedProto[pkg][item].service[method].path,
            originalName: normalizedProto[pkg][item].service[method].originalName,
            returnType: normalizedProto[pkg][item].service[method].responseType.type.name
          }))

          services.push({
            service: item,
            methods
          })
        }

        if (typeof normalizedProto[pkg][item] === 'object') {
          templates[item] = JSON.stringify(buildTemplate(flattenedProto, pkg, item), null, 2)
        }
      }

      return {
        proto: pkg,
        filePath: path,
        services,
        templates
      }
    })
}

function normalizePackage(proto) {
  return Object.keys(proto)
    .reduce((carry, pkg) => {
      const splitPkg = pkg.split('.')
      const namespaceName = splitPkg.slice(0, splitPkg.length - 1).join('.')
      const pkgName = splitPkg.pop()

      return {
        ...carry,
        [namespaceName]: carry[namespaceName]
          ? { ...carry[namespaceName], [pkgName]: proto[pkg] }
          : { [pkgName]: proto[pkg] }
      }
    }, {})
}

module.exports = {
  loadProtoFile,
  flattenProto,
  buildTemplate,
  parseProto,
  normalizePackage
}
