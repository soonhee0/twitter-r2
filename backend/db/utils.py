from boto3.dynamodb.conditions import Key

from .table import get_table
# DynamoDBテーブルからデータを取得するための簡易的なクエリメソッドを定義している
def query(table_name: str, key_dict: dict, attr: str = ""):
    """簡易的なDynamodbのquery共通メソッド.

    取得条件については現状equalしか必要ないためequalのみ

    table_name: テーブル名
    key_dict: データ取得に使用するテーブルのキーの条件
    attr: 指定した属性を取得する。指定無なら全ての属性を取得
    """
# テーブルオブジェクトの取得
    table = get_table(table_name)
    
    param = None
    for key, val in key_dict.items():
        if not param:
            # paramの値が定まっていないときキーが特定の値と等しいという条件
            param = Key(key).eq(val)
        else:
            param &= Key(key).eq(val)
    # param:DynamoDBに対するクエリ条件を構築するための変数
    query_params = {"KeyConditionExpression": param}

    if attr:
        query_params["ProjectionExpression"] = attr
# 指定したクエリパラメータに基づいてDynamoDBテーブルからデータを取得
    response = table.query(**query_params)
    # レスポンスから"Items"キーを取得し、結果をitemsリストに格納する
    items = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        # レスポンスに"LastEvaluatedKey"が含まれている場合、まだ取得できてないデータがあることを意味する
        query_params["ExclusiveStartKey"] = response["LastEvaluatedKey"]
        # 次のデータを取得するためのクエリを再実行する
        response = table.query(**query_params)
# 取得したリストをitemsリストに追加する
        items += response.get("Items", [])

    return items
