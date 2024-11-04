// const { INFOMANIAK_USERNAME } = process.env;
// const { INFOMANIAK_PASSWORD } = process.env;

let INFOMANIAK_USERNAME="taooZ6yaeOKKQEcx5UwN2uwY_GrLq30oXgMYvSFmEmxtWBdHFS7PydRz_AanM2dLH4Abs6FZGy2xXNdK"
let INFOMANIAK_PASSWORD="$2y$10$SbyXyKxi6QELUkDJ8kyrfesO/DW5u5VITNzfMt/2NHNX8MUACeJhG"

// OLD API KEY
// 2vGEYrdBW5JFmdF/TZKHbLnXWPFlqpUUMH4CM/GUFDaQ4PWJX/kkCKs6IIa1f0k4YodgqBfZ5ZxwH2E7

export default async (req, res) => {
  let listId = "127003";

  // console.log(INFOMANIAK_USERNAME, INFOMANIAK_PASSWORD)
  
  const hash = Buffer.from(`${INFOMANIAK_USERNAME}:${INFOMANIAK_PASSWORD}`).toString("base64")

  try {
    const response = await fetch(
      `https://newsletter.infomaniak.com/api/v1/public/mailinglist/${listId}/importcontact`,
      {
        method: "post",
        headers: {
          "Authorization": `Basic ${hash}`,
          "Content-Type": "application/json",
        //   Authorization: secret, // REFER TO THE VARIABLE HERE
        },
        body: JSON.stringify({
          contacts: [
              {
                  "email": req.body.email,
              }
          ]
        }),
      }
    )
    .then((response) => response.json())
    .then(data => {
        // console.log(data)
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(data);
    })
  } catch {}
};
