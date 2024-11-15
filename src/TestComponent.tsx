import React, { useEffect, useState } from "react";
import axios from "axios";

const TestComponent: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => {
        setData(response.data.title);
        setLoading(false);
      })
      .catch(() => {
        setData("Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Data: {data}</p>}
    </div>
  );
};

export default TestComponent;
