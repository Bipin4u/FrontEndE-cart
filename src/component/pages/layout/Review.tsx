import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface ReviewProps {
    id: string; 
  }
  
  const Review: React.FC<ReviewProps> = ({ id }) => {
  const [review, setReview] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/review/${id}`)
      .then((res) => {
        setReview(res.data);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [id]);

  if (!review) return <p>Loading...</p>;
  if (review.length<1) return <p>No reviews yet</p>;


  return (
    <div>
      <h2 className="my-3">Review</h2>
      {review ? (
        review.map((r: any) => (
          <div className="card m-2 ">
            <Card className="p-0 m-0 2 ">
              <div className="d-flex justify-content-between ">
                <p className="m-0 ">
                  <Button
                    className="pi pi-star primaryBackground rounded p-1"
                    label={r.rating}
                  />
                  <strong>{' '}{r.username}</strong>
                </p>
                <p className="m-0">{r.date}</p>
              </div>
              <p><strong>{r.title}</strong></p>
              <p className="m-0">{r.comment}</p>
            </Card>
          </div>
        ))
      ) : (
        <p>Loading review...</p>
      )}
    </div>
  );
};

export default Review;
