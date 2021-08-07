const {
  loadProtoFile,
  flattenProto,
  buildTemplate
} = require('../protoLoader')

describe('flattenProto', () => {
  const testTables = [
    {
      name: 'example 1',
      args: {
        proto: {
          test: {
            tust: {
              tast: {
                format: 'test'
              }
            }
          }
        }
      },
      want: {
        'test.tust.tast': {
          format: 'test'
        }
      }
    },
    {
      name: 'example 2',
      args: {
        proto: {
          pallet: {
            GetPalletMovementRequest: {
              format: 'Test'
            }
          },
          google: {
            protobuf: {
              Timestamp: {
                format: 'Test'
              }
            }
          }
        }
      },
      want: {
        'pallet.GetPalletMovementRequest': {
          format: 'Test'
        },
        'google.protobuf.Timestamp': {
          format: 'Test'
        }
      }
    }
  ]

  testTables.forEach((tt) => {
    test(tt.name, () => {
      const got = flattenProto(tt.args.proto)

      expect(got).toEqual(tt.want)
    })
  })
})

describe('buildTemplate', () => {
  let proto = {}

  const testTables = [
    {
      name: 'GetByPONumberRequest',
      args: {
        pkg: 'pallet',
        definition: 'GetByPONumberRequest'
      },
      want: {
        poNumber: ''
      }
    },
    {
      name: 'MoveProductToPalletRequest',
      args: {
        pkg: 'pallet',
        definition: 'MoveProductToPalletRequest'
      },
      want: {
        pallet_id: '',
        po_id: 0,
        po_number: '',
        product_id: 0,
        product_sku: '',
        product_name: '',
        qty: 0.0,
        uom_id: 0,
        uom_name: '',
        uom_factor: 0.0,
        po_item_id: 0,
        barcode: '',
        is_backorder: false,
        is_bonus: false
      }
    },
    {
      name: 'pallet.GetByCourierResponse',
      args: {
        pkg: 'pallet',
        definition: 'GetByCourierResponse'
      },
      want: {
        total_items: 0,
        pallet_movements: [
          {
            pallet_id: '',
            status: '',
            occupied_by: '',
            created_at: {
              nanos: 0,
              seconds: 0
            },
            updated_at: {
              nanos: 0,
              seconds: 0
            },
            id: 0,
            items: [
              {
                po_id: 0,
                po_number: '',
                product_id: 0,
                product_sku: '',
                product_name: '',
                qty: 0.0,
                uom_id: 0,
                uom_name: '',
                uom_factor: 0.0,
                po_item_id: 0,
                barcode: '',
                is_backorder: false,
                is_editable: false,
                is_bonus: false
              }
            ],
            so_items: [
              {
                so_id: 0,
                so_number: '',
                product_id: 0,
                product_sku: '',
                product_name: '',
                qty: 0.0,
                uom_id: 0,
                uom_name: '',
                uom_factor: 0.0,
                so_item_id: 0,
                barcode: '',
                is_from_return_doc: false,
                is_found_on_doc: false,
                switched_with_product_id: 0,
                switched_with_product_sku: ''
              }
            ]
          }
        ]
      }
    }
  ]

  beforeAll(async () => {
    proto = flattenProto(await loadProtoFile(__dirname + '/golden/example.proto'))
  })

  testTables.forEach((tt) => {
    test(tt.name, () => {
      const got = buildTemplate(proto, tt.args.pkg, tt.args.definition)

      expect(got).toEqual(tt.want)
    })
  })
})
