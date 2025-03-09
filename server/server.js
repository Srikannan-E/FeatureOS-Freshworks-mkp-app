const jwt = require("jsonwebtoken");

exports = {
  searchPost: async function (args) {
    console.log(args);
   
    var myHeaders = {
      api_key: args.iparams.api_key,
    };

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.featureos.app/api/v3/feature_requests?page=${args.pageNumber}&per_page=100`,
        requestOptions
      );
      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        renderData(null, data);
      } else {
        renderData(error, null);
      }
    } catch (error) {
      renderData(error, null);
    }
  },

  category: async function (args) {
    //args.iparams.api_key
    var myHeaders = {
      api_key: args.iparams.api_key,
    };

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.featureos.app/api/v3/buckets",
        requestOptions
      );
      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        renderData(null, data);
      } else {
        renderData(error, null);
      }
    } catch (error) {
      renderData(error, null);
    }
  },

  jwt_token_generation: async function (args) {
    console.log(args);

    const SSO_KEY = args.iparams.store_key;

    var userData = {
      email: args.email,
      name: args.name,
      add_as_customer: true,
    };
    console.log(userData);
    try {
      const result = jwt.sign(userData, SSO_KEY, { algorithm: "HS256" });
      if (result) {
        renderData(null, result);
      } else {
        renderData("error in getting jwt token", null);
      }
    } catch (error) {
      renderData(error, null);
    }
  },

  createPost: async function (args) {
 
    console.log(args.jwtToken);

    var myHeaders = {
      api_key: args.iparams.api_key,
      Authorization: args.jwtToken,
      "Content-Type": "application/json",
    };
    var raw = JSON.stringify({
      title: args.title,
      description: args.feedback,
      bucket_id: args.category,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://api.featureos.app/api/v3/feature_requests",
        requestOptions
      );
      console.log(response);
      // Handle the response
      if (response.ok) {
        const data = await response.json(); 
        console.log(data);
        renderData(null, data);
      } else {
        renderData(error, null);
      }
    } catch (error) {
      renderData(error, null);
    }
  },
};
