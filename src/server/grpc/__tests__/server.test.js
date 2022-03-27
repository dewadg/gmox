const net = require('net')
const { isPortOccupied } = require('../server')

test('isPortOccupied: positive', async () => {
  const dummyServer = net.createServer()
  
  dummyServer.listen(5000)

  const got = await isPortOccupied(5000)

  dummyServer.close()

  expect(got).toBeTruthy()
})

test('isPortOccupied: negative', async () => {
  const got = await isPortOccupied(5001)

  expect(got).toBeFalsy()
})
