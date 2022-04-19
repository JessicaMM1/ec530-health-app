import socket

defaultPort = 9999
defaultAddr = '127.0.0.1'
soc = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
soc.bind((defaultAddr, defaultPort))

print("connect to {}".format(defaultAddr))

while True:
	clientsList = []

	while True:
		data, client_address =  soc.recvfrom(2048)
		print('client address: ',client_address)
		clientsList.append(client_address)
		print('message: ',data)
		print()
		soc.sendto(b'OK', client_address)

		if len(clientsList) >= 2:
			print('2 clients connected...')
			break

	c1 = clientsList.pop()
	c2 = clientsList.pop()

	c1Addr = c1[0]
	c1Port = c1[1]
	c2Addr = c2[0]
	c2Port = c2[1]

	print("client1: {}, client2: {}".format(c1,c2))
	print()

	soc.sendto('{} {} {} {}'.format(data, c2Addr, c2Port, defaultPort).encode(), c1)
	soc.sendto('{} {} {} {}'.format(data, c1Addr, c1Port, defaultPort).encode(), c2)
	
	print('send to client1: {} {} {} {}'.format(data, c2Addr, c2Port, defaultPort).encode())
	print('send to client2: {} {} {} {}'.format(data, c1Addr, c1Port, defaultPort).encode())
	print()
	


