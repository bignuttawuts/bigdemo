import { Handler, HandlerEvent } from '@netlify/functions'
import { ApplicationError, BadRequestError, getDb } from '../libs/utils'
import { v4 as uuid } from 'uuid'

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
  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters

  const db = await getDb()
  const result = await db.collection('user').findOne({ userId })
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
}

const createUser = async function (event: HandlerEvent) {
  const db = await getDb()
  const requestBody = JSON.parse(event.body || '{}')

  const { firstname, lastname, email, role } = requestBody
  const user = { userId: uuid(), firstname, lastname, email, role, joinedDate: Date.now() }
  await db.collection('user').insertOne(user)

  return {
    statusCode: 200,
    body: JSON.stringify({ data: user }),
  }
}

const updateUser = async function (event: HandlerEvent) {
  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters
  if (!userId) throw new BadRequestError()

  const db = await getDb()
  const requestBody = JSON.parse(event.body || '{}')

  const { firstname, lastname, email, role } = requestBody
  const user = { userId: uuid(), firstname, lastname, email, role, updatedDate: Date.now() }
  await db.collection('user').findOneAndUpdate({ userId }, { '$set': user })
  return {
    statusCode: 200,
    body: JSON.stringify({ data: user }),
  }
}

const deleteUser = async function (event: HandlerEvent) {
  if (!event.queryStringParameters) throw new BadRequestError()
  const { userId } = event.queryStringParameters
  if (!userId) throw new BadRequestError()

  const db = await getDb()
  await db.collection('user').findOneAndDelete({ userId })
  return {
    statusCode: 200
  }
}

export { handler };
