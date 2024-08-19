
#include "NAADS_receiver.h"

int main() {
    const char* hostname = "streaming1.naad-adna.pelmorex.com";
    int port = 8080;

    NAADS_RECEIVER receiver(hostname, port);
    receiver.connect();
    receiver.receive();

    receiver.close();
    return 0;
}
