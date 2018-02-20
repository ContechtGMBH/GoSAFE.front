/*
 * Each time a new node is created, there are some constraints.
 * If the parent node has a railml label, it can have only valid railml relationships (or any other not railml rel.)
 * If the railml relationship between nodes is selected, child node can have only railml label.
 *
 * Examples:
 * railml labels - Track, Buffer Stop, Level Crossing, Balise etc.
 * railml relationships - BEGINS, HAS_SWITCH, HAS_CONNECTION etc.
 */

module.exports = {
  "relationships": {
    "Track": ["BEGINS", "ENDS", "HAS_SWITCH", "HAS_CROSSING", "HAS_TRACK_ELEMENT", "HAS_OCS_ELEMENT"],
    "Switch": ["HAS_CONNECTION"],
    "Crossing": ["HAS_CONNECTION"],

  },
  "labels": {
    // RAILML
    "BEGINS": ["Buffer Stop", "Connection", "Open End", "Macroscopic Node"],
    "ENDS": ["Buffer Stop", "Connection", "Open End", "Macroscopic Node"],
    "HAS_SWITCH": ["Switch"],
    "HAS_CROSSING": ["Crossing"],
    "HAS_TRACK_ELEMENT": ['Axle Weight Change','Bridge','Clearance Gauge Change','Electrification Change','Gauge Change','Gradient Change','Level Crossing','Operation Mode Change','Owner Change','Platform Edge','Power Transmission Change','Radius Change','Service Section','Speed Change','Track Condition','Train Protection Change','Tunnel'],
    "HAS_OCS_ELEMENT": ['Signal','Train Detection Element','Balise','Train Protection Element','Stop Post','Derailer','Train Radio Change'],
    "CONNECTS": ["Connection"],
    "HAS_CONNECTION": ["Connection"],
    // OTHERS
    "ADDITIONAL_INFO": ["KPI"]
  }
}
