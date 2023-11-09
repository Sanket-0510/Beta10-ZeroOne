import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from flask import Flask, request, jsonify

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class NBeatsBlock(tf.keras.layers.Layer):
  def __init__(self, input_size: int, theta_size: int, horizon: int, n_neurons: int, n_layers: int, **kwargs):
    super().__init__(**kwargs)
    self.input_size = input_size
    self.theta_size = theta_size
    self.horizon = horizon
    self.n_neurons = n_neurons
    self.n_layers = n_layers

    self.hidden = [tf.keras.layers.Dense(n_neurons, activation="relu") for _ in range(n_layers)]

    self.theta_layer = tf.keras.layers.Dense(theta_size, activation="linear", name="theta")

  def call(self, inputs):
    x = inputs
    for layer in self.hidden:
      x = layer(x)
    theta = self.theta_layer(x)
    backcast, forecast = theta[:, :self.input_size], theta[:, -self.horizon:]
    return backcast, forecast


with tf.keras.utils.custom_object_scope({'NBeatsBlock': NBeatsBlock}):
    model = tf.keras.models.load_model('./prices.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(data)
    # Ensure the JSON contains the expected data
    if 'data' in data:
        input_data = data['data']

        # Make predictions using the model
        input_array = np.array([input_data])  # Convert the input data to a NumPy array

        print(input_array)
        predictions = model.predict(input_array)


        print(predictions)
        # Prepare the response JSON
        response_data =  predictions[0][0]
        
        print(response_data)
        
        return jsonify({'result':str(response_data)})

    return jsonify({'error': 'Invalid JSON format or missing data'})

if __name__ == '__main__':
    app.run(debug=True)
