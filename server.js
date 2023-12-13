const express = require("express");
const requestIp = require("request-ip");
const app = express();
const port = 3001;

app.use(requestIp.mw());

const maxmind = require("maxmind");

// Đường dẫn đến tệp GeoIP2-Country.mmdb (tệp dữ liệu địa lý của MaxMind)
const databasePath = "path/to/GeoIP2-Country.mmdb";

// Hàm kiểm tra quốc gia của địa chỉ IP
async function checkCountry(ip) {
  try {
    const lookup = await maxmind.open(databasePath);
    const response = await lookup.get(ip);

    if (response && response.country && response.country.iso_code) {
      return response.country.iso_code; // Mã quốc gia (VD: VN, JP)
    }
  } catch (error) {
    console.error("Error checking country:", error);
  }

  return null;
}

// Sử dụng hàm kiểm tra quốc gia
const ipAddress = "your_target_ip_address";

app.get("/api/ip", (req, res) => {
  checkCountry(req.ip).then((countryCode) => {
    if (countryCode === "VN") {
      console.log("IP belongs to Vietnam");
    } else if (countryCode === "JP") {
      console.log("IP belongs to Japan");
    } else {
      console.log("Country not identified or not VN/JP");
    }
  });
  res.json({ ip: req.ip });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
