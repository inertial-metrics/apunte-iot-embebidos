import socket
import threading
import time
import signal
from threading import Event

HOST = '0.0.0.0' 
PORT = 1234      

class Client:
    name: str
    addr: str
    last_message: str 

    def __init__(self, name, addr, last_message):
        self.name = name
        self.addr = addr
        self.last_message = last_message
        self.time = time.time()
        self.time_formated = time.strftime("%H:%M:%S", time.localtime(self.time))



    def __str__(self):
        return f"Client(name={self.name}, addr={self.addr}, last_message={self.last_message})"




class Server:

    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.stop_event = Event()
       
        self.connected_clients = set()

    def handle_sigint(self, sig, frame):
        self.stop_event.set()




    def _start_socket(self):
        self.socket.bind((self.host, self.port))
        self.socket.listen()
        self.socket.settimeout(1)
        print("El servidor está esperando conexiones en el puerto", self.port)
        while not self.stop_event.is_set():
            try:
                conn, addr = self.socket.accept()
                self.handle(conn, addr)

            except TimeoutError:
                pass
        self.socket.close()
        exit(0)


    def start_socket(self):
        threading.Thread(target=self._start_socket).start()

    def start(self):
        self.start_socket()
        while not self.stop_event.is_set():

            print("\n" * 20)
            
            print(f"{'Nombre':<20}{'IP':<30}{'Ultimo Mensaje':<20}")
            print("=" * 70)
            
            for client in self.connected_clients:
                print(f"{client.name:<20}{str(client.addr):<30}{client.last_message:<20}{str(client.time_formated):<20}")

            
            time.sleep(1)            

        print("El servidor se cerró correctamente")

    def _handle(self,conn, addr):
        with conn:
            data = conn.recv(1024)  # Recibe hasta 1024 bytes del cliente

            device_name = data.decode('utf-8')
            current_client = Client(device_name, addr, "")

            self.connected_clients.add(current_client)


            conn.sendall("OK".encode('utf-8'))  # Envía la respuesta al cliente
            
            while not self.stop_event.is_set():
                data = conn.recv(1024)  # Recibe hasta 1024 bytes del cliente
                if data:
                    respuesta = "tu mensaje es: " + data.decode('utf-8')
                    current_client.last_message = data.decode('utf-8')
                    conn.sendall(respuesta.encode('utf-8'))  # Envía la respuesta al cliente
            print("El cliente", addr, "se desconectó")

    def handle(self,conn, addr):
        threading.Thread(target=self._handle, args=(conn, addr)).start()


if __name__ == "__main__":
    server = Server(HOST, PORT)
    signal.signal(signal.SIGINT, server.handle_sigint)
    server.start()
    # register server.handle_sigint as the handler function for SIGINT
