const Counter = artifacts.require('../contracts/Counter.sol')
contract('Counter', function () {
  let counter

  beforeEach('setup contract for each test', async function () {
    counter = await Counter.new()
    await counter.initialize(100)
  })

  it('check initial value', async function () {
    assert.equal(await counter.get(), 100)
  })

  it('check decrement', async function () {
    await counter.decrement(5)
    assert.equal(await counter.get(), 95)
  })

  it('check increment', async function () {
    await counter.increment(5)
    assert.equal(await counter.get(), 105)
  })

  it('check if counter does not become negative', async function () {
    try {
      await counter.decrement(105)
    } catch (error) {
      assert(error.toString().includes('Counter can not become negative.'), error.toString())
      assert.equal(await counter.get(), 100)
    }
  })

  it('check if increment accepts negative number', async function () {
    try {
      await counter.increment(-2)
    } catch (error) {
      assert(error.toString().includes('Value must be greater than zero.'), error.toString())
      assert.equal(await counter.get(), 100)
    }
  })

  it('check if decrement aceepts negative number', async function () {
    try {
      await counter.decrement(-2)
    } catch (error) {
      assert(error.toString().includes('Value must be greater than zero.'), error.toString())
      assert.equal(await counter.get(), 100)
    }
  })
})
