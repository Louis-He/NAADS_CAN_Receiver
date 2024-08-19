//
// Created by Siwei He on 2024-08-18.
//

#ifndef NAADS_RECEIVER_H
#define NAADS_RECEIVER_H

#include <netdb.h>

class NAADS_RECEIVER {
public:
    NAADS_RECEIVER(const char* hostname, int port);
    ~NAADS_RECEIVER();
    void connect();
    void receive() const;
    void close() const;

private:
    const char* hostname;
    int port;
    int sock;
    struct hostent* host;
    struct sockaddr_in server_addr{};
};

#endif //NAADS_RECEIVER_H
