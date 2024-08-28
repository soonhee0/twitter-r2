
import json
import logging

# この次に実装するファイル
from fetch_tweet_handler import fetch_tweet_handler
from create_tweet_handler import create_tweet_handler
# handler関数：Lamdaに渡されるイベントデータ（例　HTTPリクエストの内容）を処理する
# 特定のAPIパスに応じてツイート取得処理を行い、結果をJSON形式で返すAWS Lambdaの関数
# main.pyにはhandler関数を実装し、これがイベント検知したときに実行する関数になる。
def handler(event, context):
    """tweet作成ラムダ."""
   
    handler_mapping = {
        "/api/create_tweet": create_tweet_handler,
        "/api/fetch_tweet": fetch_tweet_handler,
    }
    try:
        path = event["path"]
        print((event["body"]))
        payload = json.loads(event["body"])

        # apiのパスによって実行するハンドラーを切り替えれるように
        handler = handler_mapping[path]

        # resultにはハンドラーの実行結果が入ってくる想定。（ツイート取得処理の場合はツイート一覧）
        result = handler(payload)
        status_code = 200

    except Exception as e:
        logging.exception(e)
        status_code = 500
        result = {"message": "InternalServerError"}

    finally:
        return {
            "isBase64Encoded": False,
            "statusCode": status_code,
            "headers": {
                # ここらへんは先ほど設定したCORS関連のもの
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            # ハンドラーからの結果がJSON形式で返ってくる
            "body": json.dumps(result),
        }
