import { isPromise } from '../isPromise'

describe('isPromise test suite', () => {
  afterAll(() => {
    console.log('run after all')
  })

  afterEach(() => {
    console.log('fun after each')
  })

  test('thenable object is a promise', () => {
    const promise = new Promise(() => {})
    expect(isPromise(promise)).toBeTruthy()
  })

  test('nullable value is not a promise', () => {
    expect(isPromise(null)).toBeFalsy()
  })
})

describe('another test suite', () => {
  beforeAll(() => {
    console.log('another test suite before all')
    return new Promise((resolve) => {
      console.log('waiting ......')
      setTimeout(() => {
        resolve()
        console.log('continue ......')
      }, 2000)
    })
  })
  test('expect 1 eq 1', () => {
    expect(1).toBe(1)
  })
  test('expect 2 not eq 1', () => {
    expect(2).not.toBe(1)
  })

  afterAll(() => {
    console.log('another test suite after all')
  })

  afterEach(() => {
    console.log('another test suite after each')
  })
})

describe.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 2, 4]
])('add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
    // expect('1').toBeOneOf([ '2', '3' ])
  })
})

test.todo('todo list test')

const mockFn = jest.fn((a, b) => a + b)

function invokeMockFn (a: number, b: number) {
  return mockFn(a, b)
}

test('test jest mock function', () => {
  invokeMockFn(1, 2)
  expect(mockFn.mock.calls[0][0]).toBe(1)
})
