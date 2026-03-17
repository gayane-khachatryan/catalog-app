export async function axios(url, options = {}) {
    try {

        let response = await fetch(url, options);

        if (!response.ok) {
            const errData = await response.json()

            throw errData.message
        }

        return await response.json();

    } catch (e) {
        throw "API Error"
    }
}


