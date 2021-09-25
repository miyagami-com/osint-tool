import Cors from 'cors'
// import fetch from 'node-fetch'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)
    const apiKey = 'f83f277c7931cac40d51207e7a3c428df0d38f5c4078bca8d38af6e6';
    const url = `https://api.ipdata.co?api-key=${apiKey}`;
    let response = await fetch(url, {
        method: 'GET',
    });

    // Rest of the API logic
    res.json(await response.json())
}

export default handler
