import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает обновления от Telegram-бота: сохраняет chat_id пользователей, нажавших /start, для последующей рассылки заявок"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

    update = json.loads(event.get('body', '{}'))
    message = update.get('message', {})
    chat = message.get('chat', {})
    text = message.get('text', '')

    chat_id = chat.get('id')
    username = chat.get('username', '')
    first_name = chat.get('first_name', '')

    if chat_id and text.startswith('/start'):
        dsn = os.environ['DATABASE_URL']
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO bot_subscribers (chat_id, username, first_name)
               VALUES (%s, %s, %s)
               ON CONFLICT (chat_id) DO UPDATE SET username = EXCLUDED.username, first_name = EXCLUDED.first_name""",
            (chat_id, username, first_name)
        )
        conn.commit()
        cur.close()
        conn.close()

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}
