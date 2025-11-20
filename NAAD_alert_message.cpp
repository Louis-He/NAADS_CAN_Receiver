//
// Created by Siwei He on 2024-08-18.
//

#include <iostream>

#include "NAAD_alert_message.h"
#include "external/pugixml/src/pugixml.hpp"

void NAAD_ALERT_MESSAGE::append(const char *message) {
  this->raw_message += message;
}

bool NAAD_ALERT_MESSAGE::try_parse_alert() {
  pugi::xml_document doc;
  if (!doc.load_string(this->raw_message.c_str())) {
    return false;
  }

  const pugi::xml_node alert = doc.child("alert");
  if (alert) {
    sender = alert.child("sender").child_value();
    sent = alert.child("sent").child_value();
    status = alert.child("status").child_value();
    type = NAAD_ALERT_TYPE::ALERT;
  } else {
    type = NAAD_ALERT_TYPE::INVALID;
    return false;
  }

  const pugi::xml_node alert_info = alert.child("info");

  headline = alert_info.child("headline").child_value();
  description = alert_info.child("description").child_value();
  urgency = alert_info.child("urgency").child_value();
  severity = alert_info.child("severity").child_value();
  certainty = alert_info.child("certainty").child_value();

  for (pugi::xml_node parameter : alert_info.children("parameter")) {
    std::string valueName = parameter.child("valueName").child_value();
    std::string value = parameter.child("value").child_value();

    if (valueName == "layer:SOREM:1.0:Broadcast_Immediately") {
      broadcastImmediate = (value == "Yes");
    } else if (valueName == "layer:SOREM:2.0:WirelessImmediate") {
      wirelessImmediate = (value == "Yes");
    }
  }

  for (const pugi::xml_node alertArea : alert_info.children("area")) {
    const pugi::xml_node alertAreaDesc = alertArea.child("areaDesc");
    areaDesc.push_back(alertAreaDesc.child_value());
  }

  return true;
}

void NAAD_ALERT_MESSAGE::print() const {
  if (type == NAAD_ALERT_TYPE::INVALID) {
    return;
  }

  // Simple manual JSON construction to avoid adding a JSON dependency
  std::cout << "{"
            << "\"sender\": \"" << sender << "\", "
            << "\"sent\": \"" << sent << "\", "
            << "\"status\": \"" << status << "\", "
            << "\"headline\": \"" << headline << "\", "
            << "\"description\": \"" << description << "\", "
            << "\"urgency\": \"" << urgency << "\", "
            << "\"severity\": \"" << severity << "\", "
            << "\"certainty\": \"" << certainty << "\", "
            << "\"broadcastImmediate\": "
            << (broadcastImmediate ? "true" : "false") << ", "
            << "\"wirelessImmediate\": "
            << (wirelessImmediate ? "true" : "false") << ", "
            << "\"areaDesc\": [";

  for (size_t i = 0; i < areaDesc.size(); ++i) {
    std::cout << "\"" << areaDesc[i] << "\"";
    if (i < areaDesc.size() - 1) {
      std::cout << ", ";
    }
  }

  std::cout << "]"
            << "}" << std::endl;
}

void NAAD_ALERT_MESSAGE::clear() {
  raw_message.clear();

  type = NAAD_ALERT_TYPE::INVALID;
  headline.clear();
  description.clear();
  sender.clear();
  sent.clear();
  status.clear();
  urgency.clear();
  severity.clear();
  certainty.clear();
  areaDesc.clear();

  broadcastImmediate = false;
  wirelessImmediate = false;
}

NAAD_ALERT_MESSAGE::~NAAD_ALERT_MESSAGE() {
  // Nothing to do here
}
