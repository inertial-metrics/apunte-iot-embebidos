import socket
import threading

HOST = '0.0.0.0' 
PORT = 1234      

class Server:

    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind((self.host, self.port))
        self.socket.listen()
        self.connected_devices = set()



    def start(self) :
        print("El servidor está esperando conexiones en el puerto", self.port)
        while True:
            conn, addr = self.socket.accept()

            self.handle(conn, addr)


    def _handle(self,conn, addr):
        with conn:
            print('Conectado por', addr)
            data = conn.recv(1024)  # Recibe hasta 1024 bytes del cliente

            device_name = data.decode('utf-8')
            self.connected_devices.add(device_name)

            print("Recibido: ", device_name)
            conn.sendall("OK".encode('utf-8'))  # Envía la respuesta al cliente
            
            while(True):
                data = conn.recv(1024)  # Recibe hasta 1024 bytes del cliente
                if data:
                    print("Recibido: ", data.decode('utf-8'))
                    respuesta = "tu mensaje es: " + data.decode('utf-8')
                    conn.sendall(respuesta.encode('utf-8'))  # Envía la respuesta al cliente

    def handle(self,conn, addr):
        threading.Thread(target=self._handle, args=(conn, addr)).start()


if __name__ == "__main__":
    server = Server(HOST, PORT)
    server.start()
