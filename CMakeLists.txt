cmake_minimum_required(VERSION 3.29)
project(NAADS_alert_receiver)

set(CMAKE_CXX_STANDARD 20)

add_subdirectory(external/pugixml)

include_directories(external/pugixml/src)


add_executable(NAADS_alert_receiver main.cpp
        NAADS_receiver.cpp
        NAADS_receiver.h
        NAAD_alert_message.cpp
        NAAD_alert_message.h
)

target_link_libraries(NAADS_alert_receiver pugixml)

