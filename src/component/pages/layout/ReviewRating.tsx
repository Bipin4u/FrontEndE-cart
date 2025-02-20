import { useState, useRef, useContext, useEffect } from "react";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import "../../../App.css";
import { InputText } from "primereact/inputtext";
import { useLocation } from "react-router-dom";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import data from '../../../../data.json'

const ReviewRating = () => {
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("Customer");
  const [reviewTitle, setTitle] = useState<string>("");
  const location = useLocation();
  const { title, image, id } = location.state || {};
  const toast = useRef<Toast>(null);
  const { authToken } = useContext(AuthContext);
  const [type, setType] = useState("Submit");
  const [ID, setID] = useState<number>();

  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value < 1) {
      toast.current?.show({
        severity: "info",
        summary: "Rating Required",
        detail: "Please provide a star rating before submitting your review.",
      });
      return;
    }
    if (type == "Submit") {
      axios
        .post(
          `${data.url}/api/review/`,
          {
            item: id,
            username: name,
            comment: description,
            rating: value,
            title: reviewTitle,
          },
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        )
        .then((response) => {
          console.log("Review submitted successfully:", response.data);
          toast.current?.show({
            severity: "success",
            summary: "Review Submitted",
            detail: "Your review has been posted successfully!",
            life: 3000,
          });
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
      return;
    }
    if (type == "Edit") {
        console.log('edit Called')
      axios
        .put(
          `${data.url}/api/update-review/${ID}`,
          {
            id : ID,
            item: id,
            username: name,
            comment: description,
            rating: value,
            title: reviewTitle,
          },
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        )
        .then((response) => {
          console.log("Review submitted successfully:", response.data);
          toast.current?.show({
            severity: "success",
            summary: "Review Submitted",
            detail: "Your review has been updated successfully!",
            life: 3000,
          });

        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
      return;
    }
  };

  useEffect(() => {
    if (authToken) {
      axios
        .get(`${data.url}/api/my-review/${id}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => {
          console.log("My Review received:", res.data);
          setTitle(res.data[0].title);
          setName(res.data[0].username);
          setValue(res.data[0].rating);
          setDescription(res.data[0].comment);
          setID(res.data[0].id)
          setType("Edit");
        })
        .catch((error) => {
          console.error("Error getting My review:", error);
        });
    }
  }, [authToken]);

  return (
    <div style={{height:"80vh"}} className="mx-5 my-4 card p-3 ">
      <Toast ref={toast} />
      <div className="card">
        <div className="p-2 d-flex">
          <div
            className=" d-flex justify-content-center align-items-center"
            style={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              src={image}
              alt="Product Image"
              height="100"
              width="100"
              className="img-fluid"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="m-2 p-2 w-50">
            <p className="h5" style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              {title}
            </p>
          </div>
        </div>
      </div>
      <div className="card flex justify-content-center p-2">
        <h3>Rate this product</h3>
        <Rating
          required
          value={value}
          onChange={(e: RatingChangeEvent) => setValue(Number(e.target.value))}
          cancel={false}
        />
      </div>
      <form onSubmit={(e) => handleReview(e)}>
        <div className=" card  justify-content-center p-2">
          <h3>Review this product</h3>

          <div className="d-flex ">
            <div className="m-3 flex justify-content-center">
              <div className=" ">
                <label className="mx-3" htmlFor="username">
                  Name{" "}
                </label>
                <InputText
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="username"
                  aria-describedby="username-help"
                />
              </div>
            </div>
            <div className="m-3 flex justify-content-center">
              <div className="flex flex-column gap-2">
                <label className="mx-3" htmlFor="username">
                  Title{" "}
                </label>
                <InputText
                  required
                  value={reviewTitle}
                  onChange={(e) => setTitle(e.target.value)}
                  id="username"
                  aria-describedby="username-help"
                />
              </div>
            </div>
          </div>
          <div className=" flex justify-content-center p-4  w-100">
            <FloatLabel>
              <InputTextarea
                required
                className="w-100"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <label htmlFor="description">Description</label>
            </FloatLabel>
          </div>
        </div>
        <div className="d-grid  m-3">
          <Button disabled={false} label={type} className=" primaryBackground p-2 rounded" />
        </div>
      </form>
    </div>
  );
};

export default ReviewRating;
