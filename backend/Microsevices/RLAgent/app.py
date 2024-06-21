from flask import Flask, request, jsonify
import pickle
from load_model import load_model
app = Flask(__name__)

model = load_model(filename='')

app.route('/predict', method=['POST'])
def predict():
    data = request.data
    prediction = model.predict(data['input'])
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
