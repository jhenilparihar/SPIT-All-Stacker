
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import Create1 from './components/create/create.jsx';

// const projectId = "2LEiWo06lqrPLBn4x5fxBHwMDgg"
// const projectSecret = "c567bca7714ae367126c8b266fe86cab"
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const src="https://infura-ipfs.io/ipfs/QmaxfZNigeYpkQXkGdErsHkmNDSG4YeHyTojvsCpYgVwgH";

// const client = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//       authorization: auth,
//   },
// })

function App() {
  // const [fileUrl, updateFileUrl] = useState(``)
  // async function onChange(e) {
  //   const file = e.target.files[0]
  //   try {
  //     const added = await client.add(file)
  //     const url = `https://infura-ipfs.io/ipfs/${added.path}`
  //     updateFileUrl(url)
  //     console.log("IPFS URI: ", url)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }  
  // }
  return (
    // <div className="App">
    //   <h1>IPFS Example</h1>
    //   <input
    //     type="file"
    //     onChange={onChange}
    //   />
    //   {
    //     fileUrl && (
    //       <div>
            
    //         <img src={fileUrl} width="600px" />
    //         <a href={fileUrl} target="_blank">{fileUrl}</a>
    //       </div>
          
    //     )
    //   }
    //   {
    //     fileUrl && (
    //       <div>
    //          <iframe
    //   width="560"
    //   height="315"
    //   src={src}
    //   title="Youtube Player"
    //   frameborder="0"
    //   allowFullScreen
    // />
    //       </div>
          
    //     )
    //   }
     
    // </div>
    <Create1 />
  );
}

export default App