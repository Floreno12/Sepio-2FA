// import * as React from 'react';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';
// import { useNavigate } from 'react-router-dom';

// export default function TwoFactorAuth({ setUsername }) {
//   const navigate = useNavigate();
//   const [data, setData] = React.useState({
//     text: '',
//     status: 'initial',
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (data.text === '123456') {  // Replace '123456' with actual 2FA validation logic
//       setData((current) => ({ ...current, status: 'loading' }));
//       try {
//         // Replace timeout with real backend operation
//         setTimeout(() => {
//           setData({ text: '', status: 'sent' });
//           setUsername(data.text);
//           navigate('/querytool');
//         }, 1500);
//       } catch (error) {
//         setData((current) => ({ ...current, status: 'failure' }));
//       }
//     } else {
//       setData((current) => ({ ...current, status: 'failure' }));
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
//       <div className='form-token'>
//         <form onSubmit={handleSubmit} id="demo">
//           <FormControl>
//             <FormLabel
//               sx={(theme) => ({
//                 '--FormLabel-color': theme.vars.palette.primary.plainColor,
//               })}
//             >
//               2FA Code
//             </FormLabel>
//             <Input
//               sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
//               placeholder="Enter 2FA Code"
//               type="text"
//               required
//               value={data.text} onChange={(event) => setData({ text: event.target.value, status: 'initial' })}
//               error={data.status === 'failure'}
//             />
//             <Button
//               variant="solid"
//               color="primary"
//               loading={data.status === 'loading'}
//               type="submit"
//               sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
//             >
//               Verify
//             </Button>
//             {data.status === 'failure' && (
//               <FormHelperText
//                 sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
//               >
//                 Incorrect 2FA code.
//               </FormHelperText>
//             )}
//           </FormControl>
//         </form>
//       </div>
//     </div>
//   );
// }







// import * as React from 'react';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// export default function TwoFactorAuth() {
//   const navigate = useNavigate();
//   const [data, setData] = React.useState({
//     text: '',
//     status: 'initial',
//   });
//   const [qrCode, setQrCode] = React.useState('');
//   const [secret, setSecret] = React.useState('');

//   React.useEffect(() => {
//     axios.post('http://localhost:3000/generate')
//       .then(response => {
//         setQrCode(response.data.qrCode);
//         setSecret(response.data.secret);
//       })
//       .catch(error => {
//         console.error('Error generating QR code:', error);
//       });
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:3000/verify', { token: data.text })
//       .then(response => {
//         if (response.data.verified) {
//           setData((current) => ({ ...current, status: 'loading' }));
//           // Simulate backend request
//           setTimeout(() => {
//             setData({ text: '', status: 'sent' });
//             navigate('/querytool');
//           }, 1500);
//         } else {
//           setData((current) => ({ ...current, status: 'failure' }));
//         }
//       })
//       .catch(error => {
//         console.error('Error verifying token:', error);
//         setData((current) => ({ ...current, status: 'failure' }));
//       });
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
//       <div>
//         <img src={qrCode} alt="QR Code" />
//         <p>Secret: {secret}</p>
//       </div>
//       <div className='form-token'>
//         <form onSubmit={handleSubmit} id="demo">
//           <FormControl>
//             <FormLabel
//               sx={(theme) => ({
//                 '--FormLabel-color': theme.vars.palette.primary.plainColor,
//               })}
//             >
//               2FA Code
//             </FormLabel>
//             <Input
//               sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
//               placeholder="Enter 2FA Code"
//               type="text"
//               required
//               value={data.text} onChange={(event) => setData({ text: event.target.value, status: 'initial' })}
//               error={data.status === 'failure'}
//             />
//             <Button
//               variant="solid"
//               color="primary"
//               loading={data.status === 'loading'}
//               type="submit"
//               sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
//             >
//               Verify
//             </Button>
//             {data.status === 'failure' && (
//               <FormHelperText
//                 sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
//               >
//                 Incorrect 2FA code.
//               </FormHelperText>
//             )}
//           </FormControl>
//         </form>
//       </div>
//     </div>
//   );
// }






//current
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    text: '',
    status: 'initial',
  });
  const [qrCode, setQrCode] = React.useState('');
  const [secret, setSecret] = React.useState('');

  React.useEffect(() => {
    axios.post('/generate')
      .then(response => {
        setQrCode(response.data.qrCode);
        setSecret(response.data.secret);
      })
      .catch(error => {
        console.error('Error generating QR code:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/verify', { token: data.text })
      .then(response => {
        if (response.data.verified) {
          setData((current) => ({ ...current, status: 'loading' }));
          setTimeout(() => {
            setData({ text: '', status: 'sent' });
            navigate('/querytool');
          }, 1500);
        } else {
          setData((current) => ({ ...current, status: 'failure' }));
        }
      })
      .catch(error => {
        console.error('Error verifying token:', error);
        setData((current) => ({ ...current, status: 'failure' }));
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <div>
        <img src={qrCode} alt="QR Code" />
        <p>Secret: {secret}</p>
      </div>
      <div className='form-token'>
        <form onSubmit={handleSubmit} id="demo">
          <FormControl>
            <FormLabel
              sx={(theme) => ({
                '--FormLabel-color': theme.vars.palette.primary.plainColor,
              })}
            >
              2FA Code
            </FormLabel>
            <Input
              sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
              placeholder="Enter 2FA Code"
              type="text"
              required
              value={data.text} onChange={(event) => setData({ text: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
            >
              Verify
            </Button>
            {data.status === 'failure' && (
              <FormHelperText
                sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
              >
                Incorrect 2FA code.
              </FormHelperText>
            )}
          </FormControl>
        </form>
      </div>
    </div>
  );
}





// import * as React from 'react';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function TwoFactorAuth() {
//   const navigate = useNavigate();
//   const [data, setData] = React.useState({
//     text: '',
//     status: 'initial',
//   });
//   const [qrCode, setQrCode] = React.useState('');
//   const [secret, setSecret] = React.useState('');
//   const [connected, setConnected] = React.useState(false);

//   React.useEffect(() => {
//     const username = "admin"; // Replace with actual username logic
//     axios.post('/generate', { username })
//       .then(response => {
//         if (response.data.connected) {
//           setConnected(true);
//         } else {
//           setQrCode(response.data.qrCode);
//           setSecret(response.data.secret);
//         }
//       })
//       .catch(error => {
//         console.error('Error generating QR code:', error);
//       });
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const username = "admin"; // Replace with actual username logic
//     axios.post('/verify', { username, token: data.text })
//       .then(response => {
//         if (response.data.verified) {
//           setData((current) => ({ ...current, status: 'loading' }));
//           setTimeout(() => {
//             setData({ text: '', status: 'sent' });
//             navigate('/querytool');
//           }, 1500);
//         } else {
//           setData((current) => ({ ...current, status: 'failure' }));
//         }
//       })
//       .catch(error => {
//         console.error('Error verifying token:', error);
//         setData((current) => ({ ...current, status: 'failure' }));
//       });
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
//       {!connected && (
//         <div>
//           <img src={qrCode} alt="QR Code" />
//           <p>Secret: {secret}</p>
//         </div>
//       )}
//       <div className='form-token'>
//         <form onSubmit={handleSubmit} id="demo">
//           <FormControl>
//             <FormLabel
//               sx={(theme) => ({
//                 '--FormLabel-color': theme.vars.palette.primary.plainColor,
//               })}
//             >
//               2FA Code
//             </FormLabel>
//             <Input
//               sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
//               placeholder="Enter 2FA Code"
//               type="text"
//               required
//               value={data.text} onChange={(event) => setData({ text: event.target.value, status: 'initial' })}
//               error={data.status === 'failure'}
//             />
//             <Button
//               variant="solid"
//               color="primary"
//               loading={data.status === 'loading'}
//               type="submit"
//               sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
//             >
//               Verify
//             </Button>
//             {data.status === 'failure' && (
//               <FormHelperText
//                 sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
//               >
//                 Incorrect 2FA code.
//               </FormHelperText>
//             )}
//           </FormControl>
//         </form>
//       </div>
//     </div>
//   );
// }
