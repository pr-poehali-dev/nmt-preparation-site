import json
import os
import urllib.request
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта (имя, телефон), сохраняет в БД и рассылает уведомление всем подписчикам Telegram-бота"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    source = body.get('source', 'Сайт')

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': "Вкажіть ім'я та телефон"})}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, source) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, source)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()

    cur.execute("SELECT chat_id FROM bot_subscribers")
    subscribers = [row[0] for row in cur.fetchall()]
    cur.close()
    conn.close()

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    message = (
        f"🔥 Нова заявка з сайту!\n\n"
        f"👤 Ім'я: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"📍 Джерело: {source}"
    )

    sent_count = 0
    if bot_token:
        for chat_id in subscribers:
            try:
                url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                data = json.dumps({'chat_id': chat_id, 'text': message}).encode('utf-8')
                req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
                urllib.request.urlopen(req, timeout=5)
                sent_count += 1
            except Exception:
                pass

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'lead_id': lead_id, 'notified': sent_count})
    }
