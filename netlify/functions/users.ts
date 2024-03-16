import { Handler, HandlerEvent } from '@netlify/functions'
import { ApplicationError, BadRequestError, getDb, validateAuth } from '../libs/utils'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    if ('GET' === event.httpMethod) {
      return await getUser(event)
    } else if ('POST' === event.httpMethod) {
      return await createUser(event)
    } else if ('PUT' === event.httpMethod) {
      return await updateUser(event)
    } else if ('DELETE' === event.httpMethod) {
      return await deleteUser(event)
    } else {
      throw new ApplicationError(405)
    }
  } catch (e) {
    console.log('error', e)
    if (e instanceof ApplicationError) {
      return { statusCode: e.code }
    } else {
      return { statusCode: 500 }
    }
  }
}

const getUser = async function (event: HandlerEvent) {
  const uid = validateAuth(event)

  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters

  const db = await getDb()
  const result = await db.collection('user').findOne({ userId, uid })
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}

const createUser = async function (event: HandlerEvent) {
  // const uid = validateAuth(event)

  const db = await getDb()
  const requestBody = JSON.parse(event.body || '{}')
  // const { userId } = requestBody
  // if (!userId) throw new BadRequestError()

  const { firstname, lastname, email } = requestBody
  const user = { userId: 'test', uid: 'test', firstname, lastname, email }
  await db.collection('user').insertOne(user)

  return {
    statusCode: 200,
    body: JSON.stringify({ data: user }),
  }
}

const updateUser = async function (event: HandlerEvent) {
  const uid = validateAuth(event)

  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters
  if (!userId) throw new BadRequestError()

  const db = await getDb()
  const requestBody = JSON.parse(event.body || '{}')

  const { title, items, bgColor, tags, seq, pinned } = requestBody
  const user = { userId, uid, title, items, bgColor, tags, seq, pinned, synced: true }
  await db.collection('user').findOneAndUpdate({ userId, uid }, { '$set': user }, { upsert: true })
  return {
    statusCode: 200,
    body: JSON.stringify({ data: user }),
  }
}

const deleteUser = async function (event: HandlerEvent) {
  const uid = validateAuth(event)

  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters
  if (!userId) throw new BadRequestError()

  const db = await getDb()
  await db.collection('user').findOneAndDelete({ userId, uid })
  return {
    statusCode: 200
  }
}

export { handler };
