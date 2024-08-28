import logging

from db.table import get_table

# dynamodb へ直接 put するだけ
def create_tweet_handler(payload: dict):
    """tweet作成ラムダ."""
    # get_table 関数は DynamoDB のテーブルオブジェクト(Tweetsテーブル)を取得するために使われる
    
    
    get_table("Tweets").put_item(
        Item={
            "user_id": payload["userId"],
            "id": payload["id"],
            "tweet_info": payload["tweetInfo"],
            "tweet_content": payload["tweetContent"],
            "tweet_user_action": payload["tweetUserAction"],
        },
    )

    return {"isSuccess": True}
