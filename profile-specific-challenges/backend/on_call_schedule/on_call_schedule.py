"""
Problem Statement
You are given a dictionary representing an on-call schedule where each key is a person's name and the value is a tuple of two integers representing their shift's start and end times in minutes.

Write a function that processes this schedule and returns all distinct time segments with their corresponding on-call personnel. A new segment starts or ends whenever someone's shift begins or ends.

For each segment in the schedule, determine all people who are on-call during that entire segment. The function should return a list of tuples, where each tuple contains:
- The start time of the segment
- The end time of the segment
- A list of names of all people who are on-call during that segment

Definition
    
Class: OnCallSchedule
Method: createOnCallSchedule
Parameters: dict
Returns: list
Method signature: def createOnCallSchedule(onCallDict)

Constraints
- The dictionary will contain between 1 and 100 entries
- All times will be non-negative integers
- For each person, start time will be strictly less than end time
- All times will be between 0 and 1000000, inclusive

Examples
0)
    
Input: {"Anna": (10, 100), "Juan": (30, 80)}
Returns: [(10, 30, ["Anna"]), (30, 80, ["Anna", "Juan"]), (80, 100, ["Anna"])]

1)

Input: {"Ben": (50, 70), "Carla": (60, 120), "David": (150, 300)}
Returns: [(50, 60, ["Ben"]), (60, 70, ["Ben", "Carla"]), (70, 120, ["Carla"]), (150, 300, ["David"])]

2)

Input: {"Alice": (0, 50), "Bob": (0, 50)}
Returns: [(0, 50, ["Alice", "Bob"])]

Notes:
- A person is considered on-call for their entire interval, including start and end times
- The output should only include segments where at least one person is on-call
- The segments should be in chronological order
- Each segment's personnel list should be sorted alphabetically
"""
class Solution:
    def createOnCallSchedule(self, onCallDict):
        return []
