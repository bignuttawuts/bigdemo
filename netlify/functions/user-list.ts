import { Handler, HandlerEvent } from '@netlify/functions'
import { ApplicationError, getDb } from '../libs/utils'

const handler: Handler = async (event: HandlerEvent) => {
  try {
    if ('POST' === event.httpMethod) {
      return await fetchUser()
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

const fetchUser = async function () {
  const db = await getDb()
  const data = await db.collection('user').find().toArray()

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  }
}

export { handler };
