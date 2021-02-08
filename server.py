#!/usr/bin/env python

''' zeromq server example.

    One front facing server and three workers are instantiated.
    Front facing server accepts connections from multiple clients and distributes computation requests among workers. 
    Also it collects computed results from workers and send the result back to the original client.

    Demonstrables:
        Multiple client connections.
        Work distribution among a pool of workers. '''

# Author - Kasun Herath <kasunh01 at gmail.com>
# Source - https://github.com/kasun/zeromq-client-server.git

import threading

import zmq

from face_pb2 import  ProcessStatus
import face_pb2 as pb2

import subprocess


import os


class Server(object):
    ''' Front facing server. '''

    def __init__(self):
        self.zmq_context = zmq.Context()

    def start(self):
        ''' Main execution. 
            Instantiate workers, Accept client connections, 
            distribute computation requests among workers and route computed results back to clients. '''

        # Front facing socket to accept client connections.
        socket_front = self.zmq_context.socket(zmq.ROUTER)
        socket_front.bind('tcp://*:5000')

        # Backend socket to distribute work.
        socket_back = self.zmq_context.socket(zmq.DEALER)
        socket_back.bind('inproc://backend')


        # Start three workers.
        for i in range(1,2):
            worker = Worker(self.zmq_context, i)
            worker.start()

        # Use built in queue device to distribute requests among workers.
        # What queue device does internally is,
        #   1. Read a client's socket ID and request.
        #   2. Send socket ID and request to a worker.
        #   3. Read a client's socket ID and result from a worker.
        #   4. Route result back to the client using socket ID. 
        zmq.device(zmq.QUEUE, socket_front, socket_back)

class Worker(threading.Thread):
    ''' Workers accept computation requests from front facing server.
        Does computations and return results back to server. '''

    def __init__(self, zmq_context, _id):
        threading.Thread.__init__(self)
        self.zmq_context = zmq_context
        self.worker_id = _id

    def run(self):
        ''' Main execution. '''
        # Socket to communicate with front facing server.
        print("\n")
        print("Start ZMQ listening server...")
        print("worker id : "+ str(self.worker_id))
        print("\n")

        socket = self.zmq_context.socket(zmq.DEALER)
        socket.connect('inproc://backend')

        processStatus =  ProcessStatus()

        while True:
            # main process 
            print("Receive Frame from backend")
            msg = socket.recv()
            # emptyString = socket.recv()
            topic = socket.recv()
            messsage = socket.recv()


            print(msg)
            # print(emptyString)
            print(topic)
            print(messsage)


            process = pb2.ProcessStatus()
            process.ParseFromString(messsage)
            print(process)
            




if __name__ == '__main__':
    # server = Server().start()
    # list_files = subprocess.run(["ps", "aux"],[ "grep", "nginx"])
    # print("The exit code was: %d" % list_files.returncode)



    # Kill process via ssh 

    # execute_command = []
    # str_command1 = 'ssh'
    # str_command2 = 'root@192.168.0.221 -p 2235'
    # # str_command3 = 'kill ' + str(7536)
    # str_command3 = 'ls'


    # execute_command.append(str_command1)
    # execute_command.append(str_command2)
    # execute_command.append(str_command3)

    # proc1 = subprocess.Popen(execute_command, stdout=subprocess.PIPE)
    # proc1 = subprocess.Popen(['ssh','root@192.168.0.221','-p 2235'], stdout=subprocess.PIPE)

    # proc2 = subprocess.Popen(['ls'], stdin=proc1.ssstdout,
    # stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # proc1.stdout.close() # Allow proc1 to receive a SIGPIPE if proc2 exits.
    # out, err = proc1.communicate()
    # print('out: {0}'.format(out))
    # print('err: {0}'.format(err))
    command = 'ssh root@192.168.0.221 -p 2235 kill ' + str(1132)
    os.system(command)



