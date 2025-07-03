import adafruit_dht
import board
import time
import json
from websocket import create_connection

def setup_sensor():
    return adafruit_dht.DHT22(board.D4)

def connect_websocket():
   ws = create_connection("ws://192.168.0.12:4000/ws")
   print("Connected to websocket server")
   return ws

def read_and_send_data(dht, ws):
    while True:
        try:
            temperature = dht.temperature * 9 / 5 + 32
            humidity = dht.humidity
        except RuntimeError as e:
            print("Sensor read failed:", e)
            continue

        data = {
            "temperature": temperature,
            "humidity": humidity,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S")
        }
        json_data = json.dumps(data)
        ws.send(json_data)
        print("Sent: ", json_data)
        time.sleep(5.0)

dht = setup_sensor()
ws = connect_websocket()
read_and_send_data(dht, ws)