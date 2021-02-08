
import zmq
context = zmq.Context()
socket = context.socket(zmq.DEALER)
socket.connect("tcp://127.0.0.1:50000")

for i in range(10):
    socket.send(b'Greeting',zmq.SNDMORE)
    # socket.send(b'Alo Alo',zmq.SNDMORE)
    socket.send(b'I Am Huy')
    # print "Sending", msg
    # msg_in = socket.recv()
    # print(msg_in.decode("utf-8"))