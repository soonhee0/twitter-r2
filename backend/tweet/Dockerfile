# ベースイメージには以下を利用する。
# https://hub.docker.com/r/amazon/aws-lambda-python
# AWS が提供する Lambda のベースイメージには、AWS Lambda 上でコンテナイメージとしてパッケージ化された関数を実行するために必要なすべてのコンポーネントが含まれている
FROM public.ecr.aws/lambda/python:3.9

# tweet配下のrequirements.txtをLAMBDA_TASK_ROOT（Lambda 関数コードへのパス）へコピー（次の準備でrequirements.txtを生成します。）
# こうすることでLambda 関数や他のモジュールからそれらのファイルをインポートして使用できるようになる
COPY tweet/requirements.txt ${LAMBDA_TASK_ROOT}/requirements.txt
# requirements.txtから必要なライブラリをインストールします。
RUN python3.9 -m pip install --no-cache-dir -r "${LAMBDA_TASK_ROOT}/requirements.txt" -t .

# 先ほど作成したファイルをLambda 関数コードへのパスへコピーする
COPY tweet/main.py ${LAMBDA_TASK_ROOT}/main.py
COPY tweet/fetch_tweet_handler.py ${LAMBDA_TASK_ROOT}/fetch_tweet_handler.py

# 以下のdb/配下のファイルも後程作成します。
COPY ./db/table.py ${LAMBDA_TASK_ROOT}/db/table.py
COPY ./db/utils.py ${LAMBDA_TASK_ROOT}/db/utils.py
COPY tweet/create_tweet_handler.py ${LAMBDA_TASK_ROOT}/create_tweet_handler.py
# main.pyのhandler関数を実行するという意味です。後程handler関数も実装します。
CMD ["main.handler"]
