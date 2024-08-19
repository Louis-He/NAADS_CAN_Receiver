//
// Created by Siwei He on 2024-08-18.
//

#ifndef NAAD_ALERT_MESSAGE_H
#define NAAD_ALERT_MESSAGE_H

#include <string>

enum NAAD_ALERT_TYPE {
    HEART_BEAT,
    ALERT,
    INVALID
};

class NAAD_ALERT_MESSAGE {
public:
    NAAD_ALERT_MESSAGE() = default;
    ~NAAD_ALERT_MESSAGE();

    void append(const char* message);
    bool try_parse_alert();
    void print() const;

    void clear();

private:
    std::string raw_message;

    NAAD_ALERT_TYPE type;
    std::string headline;
    std::string description;
    std::string sender;
    std::string sent;
    std::string status;
    std::string urgency;
    std::string severity;
    std::string certainty;
    std::string areaDesc;

    bool broadcastImmediate;
    bool wirelessImmediate;
};

#endif //NAAD_ALERT_MESSAGE_H
