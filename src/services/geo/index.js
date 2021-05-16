import {ZIP_CODE_API_APP_KEY, ZIP_CODE_CLIENT_KEY} from "gatsby-env-variables"

const fakeZipRes = {
    zip_codes: [
        {
            zip_code: "33324",
            distance: 4.636,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33322",
            distance: 1.997,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33313",
            distance: 3.53,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33323",
            distance: 3.421,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33351",
            distance: 0,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33319",
            distance: 3.058,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33321",
            distance: 2.365,
            city: "Fort Lauderdale",
            state: "FL"
        },
        {
            zip_code: "33068",
            distance: 4.323,
            city: "Pompano Beach",
            state: "FL"
        },
        {
            zip_code: "33071",
            distance: 4.53,
            city: "Pompano Beach",
            state: "FL"
        }
    ],
};

const zipCodes = fakeZipRes.zip_codes.map(z => z.zip_code);

class Geo {
    static displayName = "Point";
    static zipCodeApiHost = 'https://www.zipcodeapi.com';
    static zipCodeApiKey = ZIP_CODE_API_APP_KEY;
    static zipCodeClientKey = ZIP_CODE_CLIENT_KEY;

    static async findLocations(zipCode, radius) {
        const hash = {};

        try {
            const {zipCodeApiHost, zipCodeClientKey, zipCodeApiKey} = this;

            const zipRaw = await fetch(`${zipCodeApiHost}/rest/${zipCodeClientKey}/radius.json/${zipCode}/${radius}/mile`);

            const zipJson = await zipRaw.json();
        } catch (e) {
            console.log(e, '<<<<<<< ERROR');
        }

        const test = await fetch('https://www.vaccinespotter.org/api/v0/states/FL.json');

        const res = await test.json();

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
    }
}

export default Geo;
