import socket
import threading

targetAddr = "127.0.0.1"
targetPort = 9999
# INET means IPv4, DGRAM means UDP
soc = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#soc.bind(('0.0.0.0', 9999))
soc.sendto(b'Hello!', (targetAddr,targetPort))

while True:
	print("finding server...")
	data = soc.recv(1024).decode()

	if data.strip() == 'OK':
		print('connected to server, waiting for other devices')
		break

data = soc.recv(1024).decode()
#print(data)
msg, ip, psrc, pdest = data.split(' ')
srcinfo = (ip, int(psrc))
#pdest = int(pdest)

print("message: {}".format(msg))
print("source info: {}".format(srcinfo))
#print("ip: {}".format(ip))
#print("source port: {}".format(psrc))
print("destination port: {}".format(pdest))
print()

def listen():
	while True:
		#print('listening...')
		msg = soc.recv(1024)
		print()
		print('-------------------Message---------------------')
		print('{}: {}'.format(srcinfo,msg.decode()))
		print('-----------------------------------------------')

listenThr = threading.Thread(target=listen, daemon=True)
listenThr.start()

while True:
	msg = input('Type your message: ')
	msg = bytes(msg, 'utf-8')
	soc.sendto(msg, srcinfo)






