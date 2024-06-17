// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const path = require('path');
// const { Sequelize } = require('sequelize');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());


// // Routes
// let serviceNowCredentials = {};
// let sepioCredentials = {};
// let sepioCredentialsAvailable = false;

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// app.get('/get-source', async (req, res) => {

//   console.log("we are here > /get-source + " + serviceNowCredentials.toString());

//   res.json(serviceNowCredentials);
//   //return serviceNowCredentials;
// });

// app.get('/get-sepio-source', async (req, res) => {

//   console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

//   res.json(sepioCredentials);
//   //return serviceNowCredentials;
// });

// //************************************
// //*********** Sepio creds ************
// //************************************ 
// // var sepioLogin = "icloud";
// // var sepioPassword = "Changecloud19";
// // var sepioEndpoint = "sepio-hac-1-ng.sepiocyber.com";

// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = { serviceNowInstance, username, password };

//   try {
//     const response = await axios.get(`https://${serviceNowInstance}`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       res.json({ success: true, message: 'Connection successful!' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// app.post('/check-sepio-connection', async (req, res) => {
//   let { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
//   sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };

//   if (sepioEndpoint && sepioUsername && sepioPassword) {

//     sepioCredentialsAvailable = true;

//     console.log("sepioEndpoint > " + sepioEndpoint);

//     console.log("username > " + sepioUsername);
//     console.log("password > " + sepioPassword);
//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       if (response.status === 200) {
//         res.json({ success: true, message: 'Connection successful!' });
//       } else {
//         res.status(500).json({ success: false, message: 'Connection failed!' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     }
//   } else {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// const getMacAddresses = async (macAddress) => {

//   console.log(macAddress);
//   let { username, password, serviceNowInstance } = serviceNowCredentials;


//   if (!username && !password && !serviceNowInstance) {
//     return "Please, provide valid ServiceNow credentials";
//   }


//   const auth = Buffer.from(`${username}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   try {
//     let snQueryParms = [];
//     let searchQuery = "";

//     macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

//     searchQuery = snQueryParms.join("%5EOR");

//     let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

//     console.log(`endpoint > ${endpoint}`);

//     const response = await axios.get(endpoint, config);

//     if (response.status === 200) {

//       const queryResults = response.data.result;

//       console.log('Filtered MAC addresses:', queryResults);

//       return queryResults;

//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     return [];
//   }
// };

// const getSepioToken = async () => {

//   if (sepioCredentialsAvailable == true) {

//     console.log("Started sepio token retrieving process");

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       throw error;
//     }
//   }
// };

// const addTagsToSepioElements = async (elementSpecifier, tagsList, token) => {

//   if (sepioCredentialsAvailable == true) {
//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     console.log("SEPIO TAG: we are here!");

//     var tagsNames = [];

//     var tagsNames = tagsList.map(item => item);

//     const generalToken = tagsNames.length == 0 ? "not_incmdb" : "in_cmdb";

//     tagsNames.push(generalToken);

//     var requestBody = {
//       "tagNames": tagsNames,
//       "elementKeys": [elementSpecifier],
//       "function": 0,
//       "processChildren": false
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//       if (response.status === 200) {

//         console.log("Adding tags process to element: " + elementSpecifier + " is success!");

//         return response;
//       } else {
//         console.error("Adding tags process to element: " + elementSpecifier + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//       }
//     } catch (error) {

//       console.error('Error adding tags to Sepio elements:', error);
//       throw error;
//     }
//   }
// };

// app.post('/api/check-mac', async (req, res) => {

//   const { macAddress } = req.body;

//   try {

//     const result = await getMacAddresses(macAddress);

//     if (Array.isArray(result)) {

//       if (result.length > 0) {

//         let responce = [];

//         const token = await getSepioToken();

//         for (const singleMac of macAddress) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           for (const assetWithCmdbInfo of result) {

//             if (assetWithCmdbInfo.mac_address == singleMac && assetWithCmdbInfo.sys_class_name.indexOf("cmdb_ci") >= 0) {

//               macAndTables.tables.push(assetWithCmdbInfo.sys_class_name);
//             }
//           }

//           if (macAndTables.tables.length == 0) {

//             macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//           } else {

//             macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//           }

//           console.log("singleMac > " + singleMac);
//           console.log("macAndTables.tables > " + macAndTables.tables);

//           const responceFromTagAPI = await addTagsToSepioElements(singleMac, macAndTables.tables, token);

//           responce.push(macAndTables);

//           console.log("macAndTables > " + macAndTables);
//         };

//         console.log("responce >" + responce);

//         res.json(responce);

//       } else {

//         let responce = [];

//         macAddress.forEach(function (singleMac) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;

//           responce.push(macAndTables);
//         });

//         res.json(responce);
//       }
//     } else if (typeof (result) == "string") {
//       res.status(400).json({ success: false, message: 'Please, provide valid ServiceNow credentials' });

//     } else {

//       let responce = [];

//       let macAndTables = {
//         "error": "Unexpected error"
//       }
//       responce.push(macAndTables);

//       res.json(responce);
//     }

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });



// // Serve static files from the React build directory 
// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const getSepioTokenPost = async (sepioEndpoint, sepioPassword, sepioLogin) => {

//   if (sepioEndpoint && sepioPassword && sepioLogin) {
//     console.log("Started sepio token retrieving process");

//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioLogin,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       //console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         //throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       //throw error;
//     }
//   }
// }

// const addTagsToSepioElementsPost = async (macAddressesAndTags, token, sepioEndpoint, macAddress) => {

//   if (sepioEndpoint && macAddressesAndTags && token) {
//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     //console.log("SEPIO TAG: we are here!")

//     var tagsNames = [];
//     if (macAddressesAndTags.length > 0) {
//     for (var i = 0; i < macAddressesAndTags.length; i++) {

//       tagsNames.push(macAddressesAndTags[i].sys_class_name);

//     }
//     tagsNames.push("in_cmdb");

//   } else {
//     tagsNames.push("not_incmdb");
//   }
//   }

//   console.log("tagsNames > " + tagsNames);

//   var requestBody = {
//     "tagNames": tagsNames,
//     "elementKeys": [macAddress],
//     "function": 0,
//     "processChildren": false
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     }
//   };

//   //try {
//   const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//   if (response.status === 200) {

//     console.log("Adding tags process to element: " + macAddress + " is success!");

//     //return response;
//   } else {
//     console.error("Adding tags process to element: " + macAddress + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//   }

// }



// const getMacAddressesPost = async (macAddresses, targetEndpoint, userlogin, password) => {
//   //const { username, password, serviceNowInstance } = serviceNowCredentials;
//   const auth = Buffer.from(`${userlogin}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   const queries = macAddresses.map(mac => `mac_addressLIKE${mac}`).join('^OR');
//   const endpoint = `https://${targetEndpoint}/api/now/table/cmdb_ci?sysparm_query=${queries}&sysparm_fields=mac_address,sys_class_name,sys_id`;

//   try {
//     const response = await axios.get(endpoint, config);
//     return response.data.result;
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     return [];
//   }
// };

// app.post('/receive-data', async (req, res) => {

//   const { loginTest } = req.body;
//   const { passwordTest } = req.body;

//   if (loginTest == "admin" && passwordTest == "admin") {
//     const { macAddresses } = req.body;
//     const { snEndpoint } = req.body;
//     const { snUserlogin } = req.body;
//     const { snPassword } = req.body;
//     const { endpointSepio } = req.body;
//     const { loginSepio } = req.body;
//     const { passwordSepio } = req.body;

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     let { username, password, serviceNowInstance } = serviceNowCredentials;

//     let snCredentialsIsAvailable = (username && password && serviceNowInstance) || (snEndpoint, snUserlogin, snPassword);
//     let sepioCredentialsIsAvailable = (sepioUsername && sepioPassword && sepioEndpoint) || (endpointSepio, loginSepio, passwordSepio);

//     if (snCredentialsIsAvailable) {

//       console.log('Received MAC addresses:', macAddresses);

//       const foundMacAddresses = [];
//       const notFoundMacAddresses = [];

//       let user = username ? username : snUserlogin;
//       let pass = password ? password : snPassword;
//       let endpoint = serviceNowInstance ? serviceNowInstance : snEndpoint;

//       const results = await getMacAddressesPost(macAddresses, endpoint, user, pass);

//       //macAddresses.forEach(mac => {
//       for (const mac of macAddresses) {

//         const matchingResults = results.filter(result => result.mac_address === mac && result.sys_class_name.indexOf("cmdb_ci") >= 0);

//         console.log("matchingResults > " + JSON.stringify(matchingResults));

//         if (sepioCredentialsIsAvailable) {

//           let sepioUser = sepioUsername ? sepioUsername : loginSepio;
//           let sepioPass = sepioPassword ? sepioPassword : passwordSepio;
//           let endpointForSepio = sepioEndpoint ? sepioEndpoint : endpointSepio;

//           const token = await getSepioTokenPost(endpointForSepio, sepioPass, sepioUser);
//           const responceSepio = await addTagsToSepioElementsPost(matchingResults, token, endpointForSepio, mac);
//         }

//         if (matchingResults.length > 0) {
//           foundMacAddresses.push({
//             macAddress: mac,
//             tables: matchingResults.map(result => ({
//               table: result.sys_class_name,
//               sys_id: result.sys_id
//             }))
//           });
//         } else {
//           notFoundMacAddresses.push(mac);
//         }

//       }
//       res.json({
//         success: true,
//         foundMacAddresses,
//         notFoundMacAddresses
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         error: "You should provide you ServiceNow credential in settings or in request body"
//       });
//     }
//   } else {
//     res.status(401).json({
//       success: false,
//       error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
//     });
//   }
// });










// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const path = require('path');
// const { Sequelize } = require('sequelize');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());


// // Routes
// let serviceNowCredentials = {};
// let sepioCredentials = {};
// let sepioCredentialsAvailable = false;

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// app.get('/get-source', async (req, res) => {

//   console.log("we are here > /get-source + " + serviceNowCredentials.toString());

//   res.json(serviceNowCredentials);
//   //return serviceNowCredentials;
// });

// app.get('/get-sepio-source', async (req, res) => {

//   console.log("we are here > /get-sepio-source + " + sepioCredentials.toString());

//   res.json(sepioCredentials);
//   //return serviceNowCredentials;
// });

// //************************************
// //*********** Sepio creds ************
// //************************************ 
// // var sepioLogin = "icloud";
// // var sepioPassword = "Changecloud19";
// // var sepioEndpoint = "sepio-hac-1-ng.sepiocyber.com";

// app.post('/check-connection', async (req, res) => {
//   const { serviceNowInstance, username, password } = req.body;
//   serviceNowCredentials = { serviceNowInstance, username, password };

//   try {
//     const response = await axios.get(`https://${serviceNowInstance}`, {
//       auth: {
//         username,
//         password
//       }
//     });

//     if (response.status === 200) {
//       res.json({ success: true, message: 'Connection successful!' });
//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// app.post('/check-sepio-connection', async (req, res) => {
//   let { sepioEndpoint, sepioUsername, sepioPassword } = req.body;
//   sepioCredentials = { sepioEndpoint, sepioUsername, sepioPassword };

//   if (sepioEndpoint && sepioUsername && sepioPassword) {

//     sepioCredentialsAvailable = true;

//     console.log("sepioEndpoint > " + sepioEndpoint);

//     console.log("username > " + sepioUsername);
//     console.log("password > " + sepioPassword);
//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       if (response.status === 200) {
//         res.json({ success: true, message: 'Connection successful!' });
//       } else {
//         res.status(500).json({ success: false, message: 'Connection failed!' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     }
//   } else {
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//   }
// });

// const getMacAddresses = async (macAddress) => {

//   console.log(macAddress);
//   let { username, password, serviceNowInstance } = serviceNowCredentials;


//   if (!username && !password && !serviceNowInstance) {
//     return "Please, provide valid ServiceNow credentials";
//   }


//   const auth = Buffer.from(`${username}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   try {
//     let snQueryParms = [];
//     let searchQuery = "";

//     macAddress.map(singleMAC => snQueryParms.push("mac_addressLIKE" + singleMAC));

//     searchQuery = snQueryParms.join("%5EOR");

//     let endpoint = `https://${serviceNowInstance}/api/now/table/cmdb_ci?sysparm_query=GOTO${searchQuery}&sysparm_fields=mac_address%2Csys_class_name%2Csys_id`;

//     console.log(`endpoint > ${endpoint}`);

//     const response = await axios.get(endpoint, config);

//     if (response.status === 200) {

//       const queryResults = response.data.result;

//       console.log('Filtered MAC addresses:', queryResults);

//       return queryResults;

//     } else {
//       res.status(500).json({ success: false, message: 'Connection failed!' });
//     }
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     res.status(500).json({ success: false, message: 'Connection failed!', error: error.message });
//     return [];
//   }
// };

// const getSepioToken = async () => {

//   if (sepioCredentialsAvailable == true) {

//     console.log("Started sepio token retrieving process");

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioUsername,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       throw error;
//     }
//   }
// };

// const addTagsToSepioElements = async (elementSpecifier, tagsList, token) => {

//   if (sepioCredentialsAvailable == true) {
//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     console.log("SEPIO TAG: we are here!");

//     var tagsNames = [];

//     var tagsNames = tagsList.map(item => item);

//     const generalToken = tagsNames.length == 0 ? "not_incmdb" : "in_cmdb";

//     tagsNames.push(generalToken);

//     var requestBody = {
//       "tagNames": tagsNames,
//       "elementKeys": [elementSpecifier],
//       "function": 0,
//       "processChildren": false
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//       if (response.status === 200) {

//         console.log("Adding tags process to element: " + elementSpecifier + " is success!");

//         return response;
//       } else {
//         console.error("Adding tags process to element: " + elementSpecifier + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//       }
//     } catch (error) {

//       console.error('Error adding tags to Sepio elements:', error);
//       throw error;
//     }
//   }
// };

// app.post('/api/check-mac', async (req, res) => {

//   const { macAddress } = req.body;

//   try {

//     const result = await getMacAddresses(macAddress);

//     if (Array.isArray(result)) {

//       if (result.length > 0) {

//         let responce = [];

//         const token = await getSepioToken();

//         for (const singleMac of macAddress) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           for (const assetWithCmdbInfo of result) {

//             if (assetWithCmdbInfo.mac_address == singleMac && assetWithCmdbInfo.sys_class_name.indexOf("cmdb_ci") >= 0) {

//               macAndTables.tables.push(assetWithCmdbInfo.sys_class_name);
//             }
//           }

//           if (macAndTables.tables.length == 0) {

//             macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;
//           } else {

//             macAndTables.macAddress = `Record with MAC address: ${singleMac} was found.`;
//           }

//           console.log("singleMac > " + singleMac);
//           console.log("macAndTables.tables > " + macAndTables.tables);

//           const responceFromTagAPI = await addTagsToSepioElements(singleMac, macAndTables.tables, token);

//           responce.push(macAndTables);

//           console.log("macAndTables > " + macAndTables);
//         };

//         console.log("responce >" + responce);

//         res.json(responce);

//       } else {

//         let responce = [];

//         macAddress.forEach(function (singleMac) {

//           let macAndTables = {
//             "macAddress": "",
//             "tables": []
//           }

//           macAndTables.macAddress = `No record with MAC address: ${singleMac} was found.`;

//           responce.push(macAndTables);
//         });

//         res.json(responce);
//       }
//     } else if (typeof (result) == "string") {
//       res.status(400).json({ success: false, message: 'Please, provide valid ServiceNow credentials' });

//     } else {

//       let responce = [];

//       let macAndTables = {
//         "error": "Unexpected error"
//       }
//       responce.push(macAndTables);

//       res.json(responce);
//     }

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error occurred while checking MAC address.' });
//   }
// });



// // Serve static files from the React build directory 
// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const getSepioTokenPost = async (sepioEndpoint, sepioPassword, sepioLogin) => {

//   if (sepioEndpoint && sepioPassword && sepioLogin) {
//     console.log("Started sepio token retrieving process");

//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     var requestBody = {
//       "username": sepioLogin,
//       "password": sepioPassword
//     };

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     try {
//       const response = await axios.post(`https://${sepioEndpoint}/prime/webui/Auth/LocalLogin`, requestBody, config);

//       //console.log(response.data.token);

//       if (response.status === 200) {
//         console.log('Successfully got token from Sepio: ' + response.data.token);
//         return response.data.token;
//       } else {
//         console.error('Error getting token from Sepio: \nStatus code: ' + response.status + "\nError message: " + response.data);
//         //throw error;
//       }

//     } catch (error) {
//       console.error('Error getting token from Sepio: ', error);
//       //throw error;
//     }
//   }
// }

// const addTagsToSepioElementsPost = async (macAddressesAndTags, token, sepioEndpoint, macAddress) => {

//   if (sepioEndpoint && macAddressesAndTags && token) {
//     //let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     //console.log("SEPIO TAG: we are here!")

//     var tagsNames = [];
//     if (macAddressesAndTags.length > 0) {
//     for (var i = 0; i < macAddressesAndTags.length; i++) {

//       tagsNames.push(macAddressesAndTags[i].sys_class_name);

//     }
//     tagsNames.push("in_cmdb");

//   } else {
//     tagsNames.push("not_incmdb");
//   }
//   }

//   console.log("tagsNames > " + tagsNames);

//   var requestBody = {
//     "tagNames": tagsNames,
//     "elementKeys": [macAddress],
//     "function": 0,
//     "processChildren": false
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     }
//   };

//   //try {
//   const response = await axios.post(`https://${sepioEndpoint}/prime/webui/tagsApi/tags/add-or-remove-tags-to-elements`, requestBody, config);

//   if (response.status === 200) {

//     console.log("Adding tags process to element: " + macAddress + " is success!");

//     //return response;
//   } else {
//     console.error("Adding tags process to element: " + macAddress + " is failed! \nStatus code: " + response.status + "\nError message: " + response.data);
//   }

// }



// const getMacAddressesPost = async (macAddresses, targetEndpoint, userlogin, password) => {
//   //const { username, password, serviceNowInstance } = serviceNowCredentials;
//   const auth = Buffer.from(`${userlogin}:${password}`).toString('base64');

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + auth
//     }
//   };

//   const queries = macAddresses.map(mac => `mac_addressLIKE${mac}`).join('^OR');
//   const endpoint = `https://${targetEndpoint}/api/now/table/cmdb_ci?sysparm_query=${queries}&sysparm_fields=mac_address,sys_class_name,sys_id`;

//   try {
//     const response = await axios.get(endpoint, config);
//     return response.data.result;
//   } catch (error) {
//     console.error('Error fetching MAC addresses:', error);
//     return [];
//   }
// };

// app.post('/receive-data', async (req, res) => {

//   const { loginTest } = req.body;
//   const { passwordTest } = req.body;

//   if (loginTest == "admin" && passwordTest == "admin") {
//     const { macAddresses } = req.body;
//     const { snEndpoint } = req.body;
//     const { snUserlogin } = req.body;
//     const { snPassword } = req.body;
//     const { endpointSepio } = req.body;
//     const { loginSepio } = req.body;
//     const { passwordSepio } = req.body;

//     let { sepioEndpoint, sepioUsername, sepioPassword } = sepioCredentials;

//     let { username, password, serviceNowInstance } = serviceNowCredentials;

//     let snCredentialsIsAvailable = (username && password && serviceNowInstance) || (snEndpoint, snUserlogin, snPassword);
//     let sepioCredentialsIsAvailable = (sepioUsername && sepioPassword && sepioEndpoint) || (endpointSepio, loginSepio, passwordSepio);

//     if (snCredentialsIsAvailable) {

//       console.log('Received MAC addresses:', macAddresses);

//       const foundMacAddresses = [];
//       const notFoundMacAddresses = [];

//       let user = username ? username : snUserlogin;
//       let pass = password ? password : snPassword;
//       let endpoint = serviceNowInstance ? serviceNowInstance : snEndpoint;

//       const results = await getMacAddressesPost(macAddresses, endpoint, user, pass);

//       //macAddresses.forEach(mac => {
//       for (const mac of macAddresses) {

//         const matchingResults = results.filter(result => result.mac_address === mac && result.sys_class_name.indexOf("cmdb_ci") >= 0);

//         console.log("matchingResults > " + JSON.stringify(matchingResults));

//         if (sepioCredentialsIsAvailable) {

//           let sepioUser = sepioUsername ? sepioUsername : loginSepio;
//           let sepioPass = sepioPassword ? sepioPassword : passwordSepio;
//           let endpointForSepio = sepioEndpoint ? sepioEndpoint : endpointSepio;

//           const token = await getSepioTokenPost(endpointForSepio, sepioPass, sepioUser);
//           const responceSepio = await addTagsToSepioElementsPost(matchingResults, token, endpointForSepio, mac);
//         }

//         if (matchingResults.length > 0) {
//           foundMacAddresses.push({
//             macAddress: mac,
//             tables: matchingResults.map(result => ({
//               table: result.sys_class_name,
//               sys_id: result.sys_id
//             }))
//           });
//         } else {
//           notFoundMacAddresses.push(mac);
//         }

//       }
//       res.json({
//         success: true,
//         foundMacAddresses,
//         notFoundMacAddresses
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         error: "You should provide you ServiceNow credential in settings or in request body"
//       });
//     }
//   } else {
//     res.status(401).json({
//       success: false,
//       error: "You aren’t authenticated! Either not authenticated at all or authenticated incorrectly. Please check you login / password / endpoint"
//     });
//   }
// });













//current
// const path = require('path');
// const express = require('express');
// const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// let tempSecret;

// app.post('/generate', (req, res) => {
//   const secret = speakeasy.generateSecret();
//   tempSecret = secret.base32;
//   qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
//     res.json({ secret: secret.base32, qrCode: data_url });
//   });
// });

// app.post('/verify', (req, res) => {
//   const { token } = req.body;
//   const verified = speakeasy.totp.verify({
//     secret: tempSecret,
//     encoding: 'base32',
//     token,
//   });

//   if (verified) {
//     res.json({ verified: true });
//   } else {
//     res.json({ verified: false });
//   }
// });

// app.use(express.static(path.join(__dirname, '../front-end/build')));

// // Serve React app for any other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const path = require('path');
const express = require('express');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userSecrets = {}; // Store user secrets in memory

app.post('/generate', (req, res) => {
  const { username } = req.body;
  if (userSecrets[username]) {
    // User already has a secret
    res.json({ connected: true });
  } else {
    const secret = speakeasy.generateSecret();
    userSecrets[username] = secret.base32;
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      res.json({ connected: false, secret: secret.base32, qrCode: data_url });
    });
  }
});

app.post('/verify', (req, res) => {
  const { username, token } = req.body;
  const secret = userSecrets[username];
  if (!secret) {
    return res.status(400).json({ verified: false, message: 'User not connected to 2FA' });
  }

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token,
  });

  if (verified) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

app.use(express.static(path.join(__dirname, '../front-end/build')));

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


