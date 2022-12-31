from machine import Pin
from time import sleep
import urequests as requests
import dht

sensor = dht.DHT22(Pin(23))

while True:
    try:   
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()
        data = {'temp': temp, 'hum': hum}
        r = requests.post("http://192.168.1.1:5000/data/1", json = data)
        print('Temperature : %3.1f C' %temp)
        print('Humidity : %3.1f %%' %hum)
        sleep(300)
    except OSError as e:
        print(e)
    