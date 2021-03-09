import socket
import select
import time
import os
import shutil
import glob

server_addr = '192.168.0.7', 9000

# Create a socket with port and host bindings
def setupServer():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Socket created")
    try:
        s.bind(server_addr)
    except socket.error as msg:
        print(msg)
    return s


# Establish connection with a client
def setupConnection(s):
    s.listen(5)     # Allows five connections at a time
    print("Waiting for client")
    conn, addr = s.accept()
    return conn


# Get input from user
def GET_TXT():
    reply = input("Reply: ")
    return reply

def receiveFile(filename, conn):

    print("Beginning File Receive")
    f = open(filename, 'wb')
    try:
        line = conn.recv(4)
        while True:
            conn.settimeout(3)
            line = conn.recv(1024)
            f.write(line)
            if bytes("DONE", 'utf-8') in line:
                break
    except:
        f.close()
        print("Time out")

    f.close()
    # conn.send(bytes("Receive Complete", 'utf-8'))
    print("Receive Complete")


# Loop that sends & receives data
def dataTransfer(conn, s, mode, index):
    while True:
        # Send a File over the network
        if mode == "SEND":
            filename = "Serverfile.bmp"
            # filename = conn.recv(32)
            # filename = filename.decode('utf-8')
            # filename.strip()
            print("Requested File: ", filename)
            sendFile(filename, conn)
            # conn.send(bytes("1", 'utf-8'))
            # time.sleep(0.1)
            conn.send(bytes("DONE", 'utf-8'))
            break

        # Chat between client and server
        elif mode == "GET":
            # Receive Data
            filename = "projector\\Clientfile_" + str(i) + ".png"
            # filename = conn.recv(8192)
            # filename = filename.decode('utf-8')
            # filename.strip()
            print("Receive File: ", filename)
            receiveFile(filename, conn)
            break
            # Endmark needed?
            #conn.send(bytes("Receive Complete", 'utf-8'))


BUF_SIZE = 4
FUNCTION_CONTROL = 0
client_control = "F-0"
RUN_RCNN = False
flag = False

sock = setupServer()
c_sock = setupConnection(sock)
print("Connecting Established")
c_sock.send(bytes("Conn", 'utf-8'))
i = 0
# now just 1 moment but in complete version, it receive continue.
while True:
    read_buf = c_sock.recv(BUF_SIZE)
    timer = time.gmtime(time.time()).tm_sec
    if timer % 2 is 0:  # If Seconds are even
        try:
            with open("./sync_text.txt", 'r') as sync_file:
                sync = sync_file.readlines()
                TF_value, cut_len = sync[0].split('-')
                print(TF_value)
                print(cut_len)
                if "F" in TF_value:
                    RUN_RCNN = False
                    client_control = str(TF_value + "-10")
                    files = glob.glob("projector\\*")
                    for f in files:
                        os.remove(f)
                    print("False")
                    flag = False
                    print(client_control)
                    try:
                       c_sock.send(bytes(client_control, 'utf-8'))
                    except:
                       print("False signal error")
                    continue
                elif "T" in TF_value:
                    RUN_RCNN = True
                    # not_value, cut_len = sync[0].split('-')
                    client_control = "T-" + cut_len
                    print("client_control: ", client_control)
                    cut_len = int(cut_len)
                    flag = True
        except: print("text file crash")
    if flag is True: c_sock.send(bytes(client_control, 'utf-8'))
    print(RUN_RCNN)
    if RUN_RCNN is True:
        dataTransfer(c_sock, sock, "GET", i)
        i += 1
    else :
        i = 0
    c_sock.send(bytes("Conn", 'utf-8'))