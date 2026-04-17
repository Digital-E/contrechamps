const { INFOMANIAK_TOKEN, INFOMANIAK_NEWSLETTER_DOMAIN, INFOMANIAK_NEWSLETTER_LIST_ID } = process.env;

export default async (req, res) => {
  try {
    const response = await fetch(
      `https://api.infomaniak.com/1/newsletters/${INFOMANIAK_NEWSLETTER_DOMAIN}/subscribers`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${INFOMANIAK_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: req.body.email,
          // list_id: Number(INFOMANIAK_NEWSLETTER_LIST_ID),
          groups: ["Inscription Site Internet"]
        }),
      }
    )
    if (!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({ result: "error", error: text })
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json({ result: "error", error: err.message })
  }
};
