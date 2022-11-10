export interface LocationIQ {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city: string;
    country: string;
    country_code: string;
    house_number: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    state: string;
    town: string;
  };
  boundingbox: [string, string, string, string];
}
