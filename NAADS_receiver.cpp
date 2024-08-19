//
// Created by Siwei He on 2024-08-18.
//

#include "NAADS_receiver.h"
#include <iostream>
#include <unistd.h>       // For close()

#include "NAAD_alert_message.h"

NAADS_RECEIVER::NAADS_RECEIVER(const char* hostname, int port) {
    this->hostname = hostname;
    this->port = port;
    this->sock = socket(AF_INET, SOCK_STREAM, 0);
    if (this->sock < 0) {
        std::cerr << "Error creating socket!" << std::endl;
        return;
    }

    this->host = gethostbyname(hostname);
    if (this->host == nullptr) {
        std::cerr << "Error resolving hostname!" << std::endl;
        close();
        return;
    }

    memset(&this->server_addr, 0, sizeof(this->server_addr));
    this->server_addr.sin_family = AF_INET;
    this->server_addr.sin_port = htons(port);
    memcpy(&this->server_addr.sin_addr.s_addr, this->host->h_addr, this->host->h_length);
}

NAADS_RECEIVER::~NAADS_RECEIVER() {
    close();
}

void NAADS_RECEIVER::connect() {
    if (::connect(this->sock, reinterpret_cast<struct sockaddr *>(&this->server_addr), sizeof(this->server_addr)) < 0) {
        std::cerr << "Error connecting to server!" << std::endl;
        close();
        return;
    }
    std::cout << "Connected to " << this->hostname << " on port " << this->port << std::endl;
}

void NAADS_RECEIVER::receive() const {
    NAAD_ALERT_MESSAGE alert_message;
    char buffer[4096];
    while (true) {
        if (const ssize_t bytes_received = ::recv(this->sock, buffer, sizeof(buffer) - 1, 0); bytes_received > 0) {
            buffer[bytes_received] = '\0';  // Null-terminate the response
            alert_message.append(buffer);
            if (alert_message.try_parse_alert()) {
                alert_message.print();
                alert_message.clear();
            }
        } else if (bytes_received == 0) {
            std::cout << "Connection closed by peer." << std::endl;
            break;
        } else {
            std::cerr << "Error receiving response!" << std::endl;
            break;
        }
    }
}

void NAADS_RECEIVER::close() const {
    ::close(this->sock);
}