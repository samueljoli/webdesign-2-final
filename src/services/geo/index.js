import {ZIP_CODE_API_APP_KEY, ZIP_CODE_CLIENT_KEY} from "gatsby-env-variables"

class Geo {
    static displayName = "Point";
    static zipCodeApiHost = 'https://www.zipcodeapi.com';
    static zipCodeApiKey = ZIP_CODE_API_APP_KEY;
    static zipCodeClientKey = ZIP_CODE_CLIENT_KEY;

    static async findLocations(zipCode, radius) {
        const hash = {};

        try {
            const {zipCodeApiHost, zipCodeClientKey} = this;

            const zipRaw = await fetch(`${zipCodeApiHost}/rest/${zipCodeClientKey}/radius.json/${zipCode}/${radius}/mile`);

            const zipJson = await zipRaw.json();

            console.log(zipJson, '<<< zipJson');

            const [first] = zipJson.zip_codes;

            console.log(first, '<<< first');

            const state = first.state;
            const zipCodes = zipJson.zip_codes.map(z => z.zip_code);

            const raw = await fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`);

            const res = await raw.json();

            const {features} = res;

            features.forEach((feat) => {
                const featZipCode = feat.properties.postal_code;
                const featProviderBrandId = feat.properties.provider_brand_id;
                const {
                    properties: {
                        url,
                        address,
                        provider_brand_name,
                        appointments_available,
                    }
                } = feat;

                if (zipCodes.includes(featZipCode) && appointments_available) {
                    const hit = hash[featProviderBrandId];

                    if (hit) {
                        hit.locations.push(feat);
                    }
                    else {
                        hash[featProviderBrandId] = {
                            providerUrl: url,
                            providerAddress: address,
                            providerName: provider_brand_name,
                            locations: [feat],
                        }
                    }
                }
            });

            return hash;
        } catch (e) {
            console.log(e, '<<<<< Error');
        }
    }
}

export default Geo;
