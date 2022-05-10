const { INFOMANIAK_USERNAME } = process.env;
const { INFOMANIAK_PASSWORD } = process.env;

export default async (req, res) => {
  let listId = "";
  

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
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(data);
    })
  } catch {}
};
