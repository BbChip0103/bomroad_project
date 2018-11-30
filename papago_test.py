import requests
from urllib.parse import urlencode
import time
import sys
import json

with open('../metadata/config.json', 'r') as f:
    config = json.loads(f.read())
api_url = "https://openapi.naver.com/v1/papago/n2mt"
headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': config['papago_id'],
    'X-Naver-Client-Secret': config['papago_secret']
}
data= {
    'source':'en',
    'target':'ko',
    'text':'nice to meet you'
}
data = urlencode(data)

try:
    start_time = time.time()
    resp = requests.post(api_url, headers=headers, data=data)
    e = time.time() - start_time
    print(e)
    # print('{:02d}:{:02d}:{:02d}'.format(e // 3600, (e % 3600 // 60), e % 60), file=sys.stderr)
    resp.raise_for_status()
    res = json.loads(resp.text)
    print(res['message']['result']['translatedText'])
except Exception as e:
    print(str(e))
    sys.exit(0)
