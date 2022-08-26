// @ts-check
const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(cors());

const BACKEND_GATEWAY_URL =
  process.env.BACKEND_GATEWAY_URL || "http://poc-app-availability-mgmt-backend";

if (!BACKEND_GATEWAY_URL) {
  throw new Error(
    'Environment variable "BACKEND_GATEWAY_URL" must be set up. Please refer to Deployment Manual for more information. (http://wiki.envisioncn.com/display/SmartBuilding/FE+Application+Deployment+Guide+-+2021.0930)'
  );
}
``;

const apiProxy = proxy({
  target: BACKEND_GATEWAY_URL,
  pathRewrite: { "^/api": "" },
  changeOrigin: true,
});

const STATIC_FOLDER = path.resolve("build");

function compressionSupport(contentType) {
  /**
   * @type import('express').RequestHandler
   */
  const handler = (req, res, next) => {
    if (
      req.header("Accept-Encoding").includes("br") &&
      fs.existsSync(
        path.resolve(STATIC_FOLDER, req.path.replace(/^\//, "") + ".br")
      )
    ) {
      req.url = req.url + ".br";
      res.set("Content-Encoding", "br");
      res.set("Content-Type", contentType);
    } else if (
      req.header("Accept-Encoding").includes("gzip") &&
      fs.existsSync(
        path.resolve(STATIC_FOLDER, req.path.replace(/^\//, "") + ".gz")
      )
    ) {
      // If brotli is not supported, serve gzip
      // https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a
      req.url = req.url + ".gz";
      res.set("Content-Encoding", "gzip");
      res.set("Content-Type", contentType);
    }
    next();
  };
  return handler;
}

// make sure all of the assets are compressed using brotli every time they're requested https://web.dev/codelab-text-compression-brotli/
app.get("*.js", compressionSupport("application/javascript; charset=utf-8"));
app.get("*.css", compressionSupport("text/css; charset=utf-8"));

app.use(express.static(STATIC_FOLDER));
app.use(express.static(__dirname + "/public"));

app.use("/api", apiProxy);

app.get("*", function (_, response) {
  response.sendFile(path.resolve(STATIC_FOLDER, "index.html"));
});

app.listen(port);

console.log("server started on port " + port);
