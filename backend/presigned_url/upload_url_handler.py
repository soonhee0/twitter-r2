import os

from utils.s3_client import get_s3_client

URL_EXPIRE_TIME = 1800


def handler(payload: dict):
    """
    署名付きURLの発行ラムダ.
    /api/upload_url
    """
    print("Received userId-u:", payload.get("userId")) 
    # "userId":test@mail.com
    print("Received tweetId-u:", payload.get("tweetId")) 
    #"tweetId": 469e51c5-c979-4c3b-b941-f395844ecd0e
    # S3へ保存するパスを指定してpresigned_urlを取得する
    generated_presigned_url = get_s3_client().generate_presigned_url(
        ClientMethod="put_object", # put_object用のURL取得
        Params={
            "Bucket": os.getenv("S3_BUCKET_NAME"),
            # アップロード先のパス
            "Key": "images/" + payload["userId"] + "/" + payload["tweetId"] + ".png",
        },
        ExpiresIn=URL_EXPIRE_TIME,
    )

    result = {
        "presignedUrl": generated_presigned_url,
    }

    return result