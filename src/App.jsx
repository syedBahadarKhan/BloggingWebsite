import { createClient } from "contentful";
import { useEffect } from "react";

const client = createClient({
  space:"19rgtyi9hm2c",
  accessToken:"jUfeW5zWVS-wwyeF37Ve7O8c-9s3qDG-a4RBgx_rT-o",
});

function App() {
  useEffect(() => {
    client.getEntries({ content_type: "bahadarBlogs" }).then((res) => {
      console.log(res.items);
    });
  }, []);

  return(
    <h3> check the console</h3>
  ) 
}


export default App