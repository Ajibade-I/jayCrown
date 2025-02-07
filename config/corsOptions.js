const whiteList = [
  "http://localhost:5400/",
  "http://localhost:3000/",
  "https://jcrown.vercel.app/"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Access denied by cors"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
