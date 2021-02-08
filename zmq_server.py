
import time
import zmq
import sys

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://127.0.0.1:5001")
print("Listening for incoming messages.")

while True:
    msg = socket.recv()
    print("Processing %s" % msg, end='')
    for i in range(5):
        time.sleep(1)
        print(".", end='')
        sys.stdout.flush()
    print('')
    sys.stdout.flush()
    socket.send(b"toi nghe ban ei")