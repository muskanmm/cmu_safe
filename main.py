import os
from dotenv import load_dotenv
import googlemaps

load_dotenv()

API_KEY = os.getenv('API_KEY')
gmaps = googlemaps.Client(key=API_KEY)

geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
print(geocode_result)

# Look up an address with reverse geocoding
reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))