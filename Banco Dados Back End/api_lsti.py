from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from conf_txt import buscar
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/teste/<string:pesquisa>', methods = ['GET'])
def get_conta(pesquisa):
    result = buscar(pesquisa)
    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)