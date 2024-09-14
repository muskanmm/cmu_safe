import os
from dotenv import load_dotenv
import googlemaps
import math

load_dotenv()

API_KEY = os.getenv('API_KEY')
gmaps = googlemaps.Client(key=API_KEY)

# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
# print(geocode_result)

# # Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))
# print(reverse_geocode_result)

curr_location = 'Stever House, 1030 Morewood Avenue, Pittsburgh, PA 15213'

blue_poles=[(40.44532487117178, -79.94896289872858
),  (40.44424285573, -79.94151987367867),
(40.44377576035021, -79.94243418184031),
(40.44325415025914, -79.94452990178975),
(40.44269057820116, -79.9458826185967),
(40.44421335640257, -79.94442364075167),
(40.44120735699097, -79.943327007896),
(40.44094651217302, -79.94380093312968),
(40.44358842139843, -79.94557200251208),
(40.44380998198888, -79.94613632514435),
(40.44289259942445, -79.94670149578045),
(40.444690384334464, -79.94478117239179),
(40.44542112922806, -79.9443120728167),
(40.4462115520614, -79.94431612895792),
(40.44607209907213, -79.9436558076857),
(40.44501070370934, -79.94378456656818),
(40.445545274072, -79.94265885840805),
(40.44623823846592, -79.94254724820854),
(40.44298490828685, -79.93920384518604),
(40.442544847366854, -79.93769745746029),
(40.44177161803253, -79.93881004566654)]


mode='walking'

units='imperial'


matrix = gmaps.distance_matrix(curr_location, blue_poles, mode,language='English', avoid=None, units=units,
                    departure_time=None, arrival_time=None, transit_mode=None,
                    transit_routing_preference=None, traffic_model=None, region=None)

print(matrix)



get_row = matrix['rows']

time_list=get_row[0]['elements']

minimal_time=None

minimal_time_string=None

minimal_time_destination=None

for location in time_list:
    time_string=location['duration']['value']
    if minimal_time==None or time_string<minimal_time:
        minimal_time=time_string
        index=time_list.index(location)
        minimal_time_destination=matrix['destination_addresses'][index]

time=math.ceil(minimal_time//60)
minimal_time_string=str(time)+' minutes'

print(minimal_time_string)
print(minimal_time_destination)

route_list = gmaps.directions(curr_location, minimal_time_destination,
               mode)
print(route_list)              